
/**
 * خدمات التعامل مع قاعدة البيانات لمعاملات البطاقة الافتراضية
 */
import { supabase } from "@/integrations/supabase/client";
import { PaymentResponse, RefundResponse } from './apiTypes';

/**
 * حفظ معاملة دفع في قاعدة البيانات
 */
export async function savePaymentTransaction(
  response: PaymentResponse, 
  paymentData: { 
    order_id: number;
    amount: number;
    card_number: string;
  }
): Promise<void> {
  try {
    // الحصول على جلسة المستخدم الحالية
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
      // حفظ معاملة الدفع في قاعدة البيانات
      const { error } = await supabase.from('payment_transactions').insert({
        transaction_id: response.transaction_id.toString(),
        order_id: paymentData.order_id.toString(),
        user_id: session.user.id,
        amount: paymentData.amount,
        card_last_four: paymentData.card_number.slice(-4),
        status: response.status,
        transaction_type: 'payment'
      });
      
      if (error) {
        console.error('خطأ في حفظ معاملة الدفع:', error);
      }
    }
  } catch (error) {
    console.error('خطأ في حفظ معاملة الدفع:', error);
  }
}

/**
 * حفظ معاملة استرداد في قاعدة البيانات
 */
export async function saveRefundTransaction(
  response: RefundResponse, 
  refundData: {
    order_id: number;
    amount: number;
  }
): Promise<void> {
  try {
    // الحصول على جلسة المستخدم الحالية
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
      // البحث عن معاملة الدفع المرتبطة
      const { data: paymentData, error: paymentError } = await supabase
        .from('payment_transactions')
        .select('id')
        .eq('order_id', refundData.order_id.toString())
        .eq('transaction_type', 'payment')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      if (paymentError || !paymentData) {
        console.error('خطأ في البحث عن معاملة الدفع:', paymentError);
        return;
      }
      
      // حفظ معاملة الاسترداد في قاعدة البيانات
      const { error } = await supabase.from('refund_transactions').insert({
        transaction_id: `REF-${response.refund_txn_id}`,
        payment_transaction_id: paymentData.id,
        order_id: refundData.order_id.toString(),
        user_id: session.user.id,
        amount: refundData.amount,
        status: response.status,
      });
      
      if (error) {
        console.error('خطأ في حفظ معاملة الاسترداد:', error);
      }
    }
  } catch (error) {
    console.error('خطأ في حفظ معاملة الاسترداد:', error);
  }
}

/**
 * استرجاع معاملات الدفع والاسترداد للمستخدم الحالي
 */
export async function getUserTransactions(limit: number = 10) {
  try {
    // استرجاع معاملات الدفع
    const { data: payments, error: paymentsError } = await supabase
      .from('payment_transactions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (paymentsError) {
      throw paymentsError;
    }
    
    // استرجاع معاملات الاسترداد
    const { data: refunds, error: refundsError } = await supabase
      .from('refund_transactions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (refundsError) {
      throw refundsError;
    }
    
    // دمج وترتيب المعاملات حسب التاريخ
    const combinedTransactions = [
      ...payments.map(p => ({
        id: p.id,
        transaction_id: p.transaction_id,
        amount: p.amount,
        type: 'payment',
        status: p.status,
        created_at: p.created_at
      })),
      ...refunds.map(r => ({
        id: r.id,
        transaction_id: r.transaction_id,
        amount: -r.amount, // جعل مبالغ الاسترداد سالبة
        type: 'refund',
        status: r.status,
        created_at: r.created_at
      }))
    ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
     .slice(0, limit);
    
    return combinedTransactions;
  } catch (error) {
    console.error('خطأ في استرجاع معاملات المستخدم:', error);
    throw error;
  }
}
