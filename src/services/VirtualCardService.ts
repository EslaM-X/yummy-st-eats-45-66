
import { supabase } from '@/integrations/supabase/client';

export type RefundData = {
  orderId: string;
  amount: number;
  reason?: string;
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
        .from('refund_requests')
        .select(`
          *,
          profiles:user_id (*),
          orders:order_id (*)
        `)
        .eq('status', 'pending')
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
      const response = await fetch(`${supabase.functions.url}/st-refund`, {
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
      
      // تحديث حالة طلب الاسترداد في قاعدة البيانات
      await supabase
        .from('refund_requests')
        .update({
          status: 'completed',
          processed_at: new Date().toISOString(),
          processed_by: sessionData.session.user.id,
          refund_transaction_id: result.refund_txn_id
        })
        .eq('order_id', orderId);
      
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
      
      // إنشاء طلب استرداد جديد
      const { data, error } = await supabase
        .from('refund_requests')
        .insert({
          user_id: sessionData.session.user.id,
          order_id: orderId,
          amount,
          reason,
          status: 'pending',
          created_at: new Date().toISOString()
        })
        .select()
        .single();
      
      if (error) throw error;
      
      return data;
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
        .from('st_virtual_card_transactions')
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
   * معالجة دفع باستخدام بطاقة من خلال وظيفة حافة Supabase
   */
  static async processCardPayment(cardNumber: string, cvv: string, amount: number, orderId: string) {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        throw new Error('يجب تسجيل الدخول لإجراء عملية الدفع');
      }
      
      // استدعاء وظيفة حافة Supabase للدفع
      const response = await fetch(`${supabase.functions.url}/process-payment`, {
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
}
