
/**
 * خدمات محاكاة معاملات البطاقة الافتراضية للتطوير والاختبار
 */
import { PaymentResponse, PaymentRequest, RefundRequest, RefundResponse } from './apiTypes';

export async function sendMockRequest<T>(
  endpoint: string,
  method: string,
  data: any
): Promise<T> {
  console.log('استخدام بيانات محاكاة للطلب:', {endpoint, method, data});
  
  // محاكاة تأخير الشبكة
  await new Promise(resolve => setTimeout(resolve, 1800));
  
  // إعداد استجابة محاكاة بناءً على نوع الطلب والبيانات
  let mockResponse: any;
  
  if (endpoint.includes('transaction')) {
    // استجابة معاملة دفع
    mockResponse = {
      transaction_id: Math.floor(Math.random() * 100000) + 1000,
      status: 'success',
      amount: data.amount,
      currency: 'ST',
      timestamp: new Date().toISOString(),
    };
  } else if (endpoint.includes('refund')) {
    // استجابة معاملة استرداد
    mockResponse = {
      status: 'success',
      refund_txn_id: Math.floor(Math.random() * 100000) + 1000,
      new_wallet_bal: 1250.75 - data.amount,
      new_card_bal: 75.5,
      refunded_amount: data.amount,
      timestamp: new Date().toISOString(),
    };
  } else {
    throw new Error('نوع طلب غير معروف');
  }
  
  // محاكاة فشل عشوائي في حوالي 10% من الحالات
  if (Math.random() < 0.1) {
    throw new Error('فشل التواصل مع خادم API. يرجى المحاولة مرة أخرى.');
  }
  
  return mockResponse as T;
}

/**
 * محاكاة معاملات الدفع
 */
export async function mockPaymentTransaction(paymentData: PaymentRequest): Promise<PaymentResponse> {
  return await sendMockRequest<PaymentResponse>(
    '/st-vpc/v1/transactions',
    'POST',
    paymentData
  );
}

/**
 * محاكاة معاملات الاسترداد
 */
export async function mockRefundTransaction(refundData: RefundRequest): Promise<RefundResponse> {
  return await sendMockRequest<RefundResponse>(
    '/st-vpc/v1/refund',
    'POST',
    refundData
  );
}
