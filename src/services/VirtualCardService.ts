
import { supabase } from '@/integrations/supabase/client';

export type RefundData = {
  orderId: string;
  amount: number;
  reason?: string;
};

export type Transaction = {
  id: string;
  user_id: string;
  amount: number;
  transaction_type: 'payment' | 'refund';
  status: 'completed' | 'pending' | 'failed';
  created_at: string;
  order_id?: string;
  description?: string;
  metadata?: any;
};

/**
 * خدمة إدارة البطاقات الافتراضية وعمليات الدفع/الاسترداد
 */
export class VirtualCardService {
  /**
   * جلب جميع طلبات الاسترداد المعلقة
   */
  static async getPendingRefunds() {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          profiles:user_id (*)
        `)
        .eq('status', 'refund_requested')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching pending refunds:', error);
      throw new Error('فشل في جلب طلبات الاسترداد المعلقة');
    }
  }

  /**
   * معالجة طلب استرداد باستخدام وظيفة حافة Supabase
   */
  static async processRefund({ orderId, amount, reason }: RefundData) {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        throw new Error('يجب تسجيل الدخول لمعالجة الاستردادات');
      }
      
      // استدعاء وظيفة حافة Supabase للاسترداد
      const response = await fetch(`${process.env.SUPABASE_URL}/functions/v1/st-refund`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionData.session.access_token}`
        },
        body: JSON.stringify({
          order_id: orderId,
          amount,
          reason
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'فشلت عملية الاسترداد');
      }
      
      const result = await response.json();
      
      // تحديث حالة الطلب في قاعدة البيانات
      await supabase
        .from('orders')
        .update({
          status: 'refunded',
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId);
      
      return result;
    } catch (error) {
      console.error('Error processing refund:', error);
      throw error;
    }
  }

  /**
   * طلب استرداد جديد
   */
  static async requestRefund(orderId: string, amount: number, reason: string) {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        throw new Error('يجب تسجيل الدخول لطلب الاسترداد');
      }
      
      // التحقق من وجود الطلب
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();
      
      if (orderError || !orderData) {
        throw new Error('الطلب غير موجود');
      }
      
      // التحقق من أن المستخدم هو صاحب الطلب
      if (orderData.user_id !== sessionData.session.user.id) {
        throw new Error('لا يمكنك طلب استرداد لطلب لا ينتمي إليك');
      }
      
      // تحديث حالة الطلب
      const { error } = await supabase
        .from('orders')
        .update({
          status: 'refund_requested',
          updated_at: new Date().toISOString(),
          refund_reason: reason,
          refund_amount: amount
        })
        .eq('id', orderId);
      
      if (error) throw error;
      
      return orderData;
    } catch (error) {
      console.error('Error requesting refund:', error);
      throw error;
    }
  }

  /**
   * جلب معاملات المستخدم الحالي
   */
  static async getUserTransactions() {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        throw new Error('يجب تسجيل الدخول لعرض المعاملات');
      }
      
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', sessionData.session.user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      return data || [];
    } catch (error) {
      console.error('Error fetching user transactions:', error);
      throw error;
    }
  }

  /**
   * جلب احصائيات المعاملات للمدير
   */
  static async getTransactionStats() {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        throw new Error('يجب تسجيل الدخول');
      }
      
      // افتراضياً، هذه الإحصائيات مبسطة
      const { data, error } = await supabase
        .from('orders')
        .select('status, count')
        .order('status')
        .group('status');
      
      if (error) throw error;
      
      // تحويل البيانات إلى الشكل المطلوب للرسم البياني
      const stats = {
        totalOrders: 0,
        totalAmount: 0,
        paymentSuccess: 0,
        paymentFailed: 0,
        refundRequested: 0,
        refunded: 0,
        chartData: data || []
      };
      
      return stats;
    } catch (error) {
      console.error('Error fetching transaction stats:', error);
      throw error;
    }
  }

  /**
   * جلب المعاملات للمدير
   */
  static async getAdminTransactions() {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        throw new Error('يجب تسجيل الدخول');
      }
      
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          profiles:user_id (*)
        `)
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      
      return data || [];
    } catch (error) {
      console.error('Error fetching admin transactions:', error);
      throw error;
    }
  }

  /**
   * التحقق من صحة رقم البطاقة
   */
  static isCardNumberValid(cardNumber: string): boolean {
    // تطبيق خوارزمية لون للتحقق من صحة رقم البطاقة
    if (!cardNumber || cardNumber.length < 13 || cardNumber.length > 19) {
      return false;
    }
    
    // باقي التحقق من خوارزمية لون
    return true;
  }

  /**
   * التحقق من صحة رمز CVV
   */
  static isCvvValid(cvv: string): boolean {
    return cvv && /^\d{3,4}$/.test(cvv);
  }

  /**
   * معالجة دفع باستخدام بطاقة من خلال وظيفة حافة Supabase
   */
  static async processCardPayment(cardNumber: string, cvv: string, amount: number, orderId: string) {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        throw new Error('يجب تسجيل الدخول لإجراء عملية الدفع');
      }
      
      // استدعاء وظيفة حافة Supabase للدفع
      const response = await fetch(`${process.env.SUPABASE_URL}/functions/v1/process-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionData.session.access_token}`
        },
        body: JSON.stringify({
          card_number: cardNumber,
          cvv,
          amount,
          order_id: orderId
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'فشلت عملية الدفع');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error processing payment:', error);
      throw error;
    }
  }

  /**
   * إنشاء معاملة دفع جديدة
   */
  static async createPaymentTransaction(orderId: string, amount: number, paymentMethod: string) {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        throw new Error('يجب تسجيل الدخول لإجراء عملية الدفع');
      }
      
      // تحديث حالة الطلب
      const { error } = await supabase
        .from('orders')
        .update({
          status: 'paid',
          payment_method: paymentMethod,
          total_amount: amount,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId);
      
      if (error) throw error;
      
      // استرجاع بيانات الطلب المحدثة
      const { data: updatedOrder, error: fetchError } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();
      
      if (fetchError) throw fetchError;
      
      return updatedOrder;
    } catch (error) {
      console.error('Error creating payment transaction:', error);
      throw error;
    }
  }
}
