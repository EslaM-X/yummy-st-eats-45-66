
import { 
  PaymentResponse, 
  RefundResponse, 
  PaymentRequest, 
  RefundRequest, 
  Transaction 
} from './apiTypes';
import { generateMockTransactions } from './mockService';

// مصفوفة تخزين مؤقت للمعاملات المحاكاة - ستستبدل بقاعدة بيانات حقيقية في الإنتاج
let mockTransactionStore: Transaction[] = generateMockTransactions(20);

/**
 * حفظ معاملة دفع في قاعدة البيانات
 * في الإنتاج، سيستخدم هذا قاعدة بيانات حقيقية
 */
export const savePaymentTransaction = async (
  response: PaymentResponse, 
  paymentData: PaymentRequest
): Promise<void> => {
  console.log('حفظ معاملة الدفع في قاعدة البيانات', { response, paymentData });
  
  const transaction: Transaction = {
    id: `txn_${Date.now()}`,
    transaction_id: response.transaction_id.toString(),
    amount: paymentData.amount,
    type: 'payment',
    status: response.status,
    created_at: response.timestamp || new Date().toISOString()
  };
  
  // إضافة المعاملة إلى التخزين المؤقت
  mockTransactionStore.unshift(transaction);
  
  // تنفيذ عملية محاكاة تأخير لتمثيل حفظ قاعدة البيانات
  await new Promise(resolve => setTimeout(resolve, 200));
};

/**
 * حفظ معاملة استرداد في قاعدة البيانات
 * في الإنتاج، سيستخدم هذا قاعدة بيانات حقيقية
 */
export const saveRefundTransaction = async (
  response: RefundResponse, 
  refundData: RefundRequest
): Promise<void> => {
  console.log('حفظ معاملة الاسترداد في قاعدة البيانات', { response, refundData });
  
  const transaction: Transaction = {
    id: `txn_${Date.now()}`,
    transaction_id: response.refund_txn_id.toString(),
    amount: refundData.amount,
    type: 'refund',
    status: response.status,
    created_at: response.timestamp || new Date().toISOString()
  };
  
  // إضافة المعاملة إلى التخزين المؤقت
  mockTransactionStore.unshift(transaction);
  
  // تنفيذ عملية محاكاة تأخير لتمثيل حفظ قاعدة البيانات
  await new Promise(resolve => setTimeout(resolve, 200));
};

/**
 * الحصول على معاملات المستخدم من قاعدة البيانات
 * في الإنتاج، سيقوم هذا بإجراء استعلام إلى قاعدة البيانات باستخدام معرف المستخدم
 */
export const getUserTransactions = async (limit: number = 10): Promise<Transaction[]> => {
  console.log('استرداد معاملات المستخدم، الحد:', limit);
  
  // تنفيذ عملية محاكاة تأخير لتمثيل استعلام قاعدة البيانات
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // إرجاع معاملات محاكاة من التخزين المؤقت
  return mockTransactionStore.slice(0, limit);
};
