
import { 
  PaymentRequest, 
  RefundRequest, 
  PaymentResponse, 
  RefundResponse, 
  Transaction
} from './apiTypes';

/**
 * محاكاة لعملية دفع ناجحة في بيئة التطوير
 */
export const mockPaymentTransaction = async (
  paymentData: PaymentRequest
): Promise<PaymentResponse> => {
  // إضافة تأخير اصطناعي لمحاكاة اتصال الشبكة
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // معالجة محاكاة الأخطاء للفحص
  if (paymentData.amount <= 0) {
    throw new Error('مبلغ الدفع يجب أن يكون أكبر من صفر');
  }
  
  if (paymentData.card_number === '4111111111111111') {
    throw new Error('بطاقة محظورة');
  }
  
  // إنشاء معرف معاملة عشوائي
  const txnId = Math.floor(Math.random() * 10000000);
  
  // إرجاع استجابة محاكاة
  return {
    transaction_id: txnId,
    status: 'approved',
    amount: paymentData.amount,
    timestamp: new Date().toISOString()
  };
};

/**
 * محاكاة لعملية استرداد ناجحة في بيئة التطوير
 */
export const mockRefundTransaction = async (
  refundData: RefundRequest
): Promise<RefundResponse> => {
  // إضافة تأخير اصطناعي لمحاكاة اتصال الشبكة
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // محاكاة الأخطاء للفحص
  if (refundData.amount <= 0) {
    throw new Error('مبلغ الاسترداد يجب أن يكون أكبر من صفر');
  }
  
  if (refundData.order_id === 0) {
    throw new Error('رقم الطلب غير صالح');
  }
  
  // إنشاء معرف معاملة استرداد عشوائي
  const refundTxnId = Math.floor(Math.random() * 10000000);
  
  // محاكاة أرصدة محفظة وبطاقة جديدة
  const newWalletBal = 2580.5;
  const newCardBal = 500.0;
  
  // إرجاع استجابة محاكاة
  return {
    status: 'approved',
    refund_txn_id: refundTxnId,
    new_wallet_bal: newWalletBal,
    new_card_bal: newCardBal,
    timestamp: new Date().toISOString()
  };
};

/**
 * إنشاء مجموعة من معاملات المحاكاة للاختبار
 */
export const generateMockTransactions = (count: number = 10): Transaction[] => {
  const transactions: Transaction[] = [];
  
  for (let i = 0; i < count; i++) {
    const isPayment = Math.random() > 0.3; // 70% احتمالية أن تكون عملية دفع
    const status = Math.random() > 0.1 ? 'completed' : 'pending'; // 90% احتمالية أن تكون مكتملة
    
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 30)); // تاريخ عشوائي خلال الشهر الماضي
    
    transactions.push({
      id: `txn_${i + 1}`,
      transaction_id: `${isPayment ? 'P' : 'R'}-${100000 + i}`,
      amount: Math.round(Math.random() * 1000 * 100) / 100, // مبلغ عشوائي حتى 1000 بدقة منزلتين عشريتين
      type: isPayment ? 'payment' : 'refund',
      status: status,
      created_at: createdAt.toISOString()
    });
  }
  
  // ترتيب المعاملات حسب التاريخ (الأحدث أولاً)
  return transactions.sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
};
