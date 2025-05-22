
import { supabase } from '@/integrations/supabase/client';

/**
 * نوع بيانات المعاملة
 */
export interface Transaction {
  id: string;
  user_id: string | null;
  order_id: string | null;
  amount: number;
  transaction_type: 'payment' | 'refund';
  payment_method: string;
  status: string;
  transaction_ref: string | null;
  created_at: string | null;
  updated_at: string | null;
  orders?: {
    id: string;
    created_at: string;
    status: string;
  };
}

/**
 * خدمة البطاقات الافتراضية والمدفوعات
 */
export class VirtualCardService {
  /**
   * إنشاء معاملة دفع جديدة
   * @param orderId معرف الطلب المراد الدفع عنه
   * @param amount المبلغ المراد دفعه
   * @param paymentMethod طريقة الدفع
   * @returns معلومات المعاملة
   */
  static async createPaymentTransaction(orderId: string, amount: number, paymentMethod: string = 'credit_card') {
    try {
      // التحقق من وجود مستخدم مسجل دخول
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('يجب تسجيل الدخول لإتمام عملية الدفع');
      }

      // التحقق من وجود الطلب
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .maybeSingle();

      if (orderError || !orderData) {
        throw new Error('لم يتم العثور على الطلب المحدد');
      }

      // إنشاء معاملة دفع جديدة
      const { data, error } = await supabase
        .from('transactions')
        .insert({
          user_id: session.user.id,
          order_id: orderId,
          amount: amount,
          transaction_type: 'payment',
          payment_method: paymentMethod,
          status: 'completed',
          transaction_ref: `PAY-${Math.random().toString(36).substring(2, 12).toUpperCase()}`
        })
        .select()
        .single();

      if (error) throw error;

      // تحديث حالة الدفع في الطلب
      const { error: updateError } = await supabase
        .from('orders')
        .update({
          payment_status: 'paid',
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId);

      if (updateError) throw updateError;

      return { data, error: null };
    } catch (error: any) {
      console.error('Error creating payment transaction:', error);
      return { data: null, error };
    }
  }

  /**
   * طلب استرداد المدفوعات
   * @param orderId معرف الطلب المراد استرداده
   * @param amount المبلغ المراد استرداده
   * @param reason سبب الاسترداد
   * @returns معلومات المعاملة
   */
  static async requestRefund(orderId: string, amount: number, reason: string) {
    try {
      // التحقق من وجود مستخدم مسجل دخول
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('يجب تسجيل الدخول لإتمام عملية الاسترداد');
      }

      // التحقق من وجود الطلب
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .maybeSingle();

      if (orderError || !orderData) {
        throw new Error('لم يتم العثور على الطلب المحدد');
      }

      // تحديث حالة الطلب إلى استرداد مطلوب
      const { error: updateError } = await supabase
        .from('orders')
        .update({
          status: 'refund_requested',
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId);

      if (updateError) throw updateError;

      // إنشاء طلب استرداد جديد
      const { data, error } = await supabase
        .from('transactions')
        .insert({
          user_id: session.user.id,
          order_id: orderId,
          amount: amount,
          transaction_type: 'refund',
          payment_method: orderData.payment_method || 'credit_card',
          status: 'pending',
          transaction_ref: `REF-${Math.random().toString(36).substring(2, 12).toUpperCase()}`
        })
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error: any) {
      console.error('Error requesting refund:', error);
      return { data: null, error };
    }
  }

  /**
   * تنفيذ عملية استرداد المدفوعات
   * @param params معلومات الاسترداد
   * @returns معلومات المعاملة
   */
  static async processRefund(params: { 
    orderId: string;
    amount: number;
    reason?: string;
  }) {
    try {
      // التحقق من وجود مستخدم مسجل دخول
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('يجب تسجيل الدخول لإتمام عملية الاسترداد');
      }

      // التحقق من وجود الطلب
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('id', params.orderId)
        .maybeSingle();

      if (orderError || !orderData) {
        throw new Error('لم يتم العثور على الطلب المحدد');
      }

      // إنشاء معاملة استرداد جديدة
      const { data, error } = await supabase
        .from('transactions')
        .insert({
          user_id: session.user.id,
          order_id: params.orderId,
          amount: params.amount,
          transaction_type: 'refund',
          payment_method: orderData.payment_method,
          status: 'completed',
          transaction_ref: `REF-${Math.random().toString(36).substring(2, 12).toUpperCase()}`
        })
        .select()
        .single();

      if (error) throw error;

      // تحديث حالة الدفع في الطلب
      const { error: updateError } = await supabase
        .from('orders')
        .update({
          payment_status: 'refunded',
          status: 'cancelled',
          updated_at: new Date().toISOString()
        })
        .eq('id', params.orderId);

      if (updateError) throw updateError;

      return { data, error: null };
    } catch (error: any) {
      console.error('Error processing refund:', error);
      return { data: null, error };
    }
  }

  /**
   * جلب سجل المعاملات للمستخدم الحالي
   */
  static async getUserTransactions() {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select(`
          *,
          orders(id, created_at, status)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return { data, error: null };
    } catch (error: any) {
      console.error('Error fetching user transactions:', error);
      return { data: [], error };
    }
  }

  /**
   * جلب المعاملات للمسؤولين
   */
  static async getAdminTransactions() {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select(`
          *,
          orders(*),
          profiles(id, full_name, email)
        `)
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;

      // تنسيق البيانات للعرض في الجدول
      const formattedTransactions = data.map((tx: any) => {
        const date = new Date(tx.created_at);
        return {
          id: tx.id,
          order_id: tx.order_id,
          transaction_id: tx.transaction_ref || tx.id.substring(0, 8),
          user: tx.profiles?.full_name || 'غير معروف',
          email: tx.profiles?.email || '-',
          type: tx.transaction_type,
          amount: tx.amount,
          card_last_four: '1234', // افتراضي للعرض
          status: tx.status,
          created_at: tx.created_at,
          formatted_date: date.toLocaleDateString('ar-SA', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        };
      });

      return formattedTransactions;
    } catch (error: any) {
      console.error('Error fetching admin transactions:', error);
      throw error;
    }
  }

  /**
   * جلب طلبات الاسترداد المعلقة (للإدارة)
   */
  static async getPendingRefunds() {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select(`
          *,
          orders(*),
          profiles(full_name, email, phone)
        `)
        .eq('transaction_type', 'refund')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data;
    } catch (error: any) {
      console.error('Error fetching pending refunds:', error);
      throw error;
    }
  }
}
