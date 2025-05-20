
/**
 * خدمات التواصل مع واجهة برمجة التطبيقات (API)
 */
import { PaymentRequest, RefundRequest, PaymentResponse, RefundResponse, ApiErrorResponse } from './apiTypes';
import { toast } from '@/hooks/use-toast';

// رابط API الافتراضي
const API_BASE_URL = 'https://api.salla-shop.com';
// الحصول على API Key من متغيرات البيئة
const API_KEY = import.meta.env.VITE_ST_VPC_API_KEY || 'demo-api-key';

/**
 * إرسال طلب إلى API مع إضافة مفتاح API في الهيدر
 */
export async function sendApiRequest<T>(
  endpoint: string,
  method: string,
  data: any
): Promise<T> {
  try {
    console.log(`إرسال طلب ${method} إلى ${endpoint}`, data);
    
    // إعداد هيدر المصادقة مع مفتاح API
    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    };
    
    // إرسال طلب حقيقي إلى API
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers,
      body: JSON.stringify(data),
    });
    
    // التحقق من نجاح الطلب
    if (!response.ok) {
      const errorData: ApiErrorResponse = await response.json();
      throw new Error(errorData.message || 'حدث خطأ أثناء معالجة الطلب');
    }
    
    // تحويل البيانات المستلمة إلى كائن JSON
    const responseData = await response.json();
    return responseData as T;
  } catch (error) {
    console.error('خطأ في معالجة طلب API:', error);
    
    // توجيه رسالة خطأ للمستخدم
    const errorMessage = error instanceof Error ? 
      error.message : 
      'حدث خطأ غير متوقع أثناء معالجة طلبك';
    
    toast({
      title: 'خطأ في المعاملة',
      description: errorMessage,
      variant: 'destructive',
    });
    
    throw error;
  }
}

/**
 * إرسال طلب دفع إلى API
 */
export async function sendPaymentRequest(paymentData: PaymentRequest): Promise<PaymentResponse> {
  return await sendApiRequest<PaymentResponse>(
    '/st-vpc/v1/transactions',
    'POST',
    paymentData
  );
}

/**
 * إرسال طلب استرداد إلى API
 */
export async function sendRefundRequest(refundData: RefundRequest): Promise<RefundResponse> {
  return await sendApiRequest<RefundResponse>(
    '/st-vpc/v1/refund',
    'POST',
    refundData
  );
}
