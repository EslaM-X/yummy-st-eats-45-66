
/**
 * خدمة البطاقة الافتراضية - الواجهة الرئيسية
 */
import { toast } from '@/hooks/use-toast';
import { isCardNumberValid, isCvvValid } from './card/cardValidation';
import { mockPaymentTransaction, mockRefundTransaction } from './card/mockService';
import { sendPaymentRequest, sendRefundRequest } from './card/apiService';
import { savePaymentTransaction, saveRefundTransaction, getUserTransactions } from './card/databaseService';
import { PaymentRequest, RefundRequest, PaymentResponse, RefundResponse } from './card/apiTypes';

// رابط API الافتراضي
const API_BASE_URL = 'https://api.salla-shop.com';
// الحصول على API Key من متغيرات البيئة
const API_KEY = import.meta.env.VITE_ST_VPC_API_KEY || process.env.ST_VPC_API_KEY || 'demo-api-key';

/**
 * خدمة للتعامل مع عمليات البطاقة الافتراضية ST
 */
export class VirtualCardService {
  // صادر التوابع المساعدة للتحقق من الصحة
  static isCardNumberValid = isCardNumberValid;
  static isCvvValid = isCvvValid;

  /**
   * إنشاء معاملة دفع جديدة وحفظها في قاعدة البيانات
   */
  public static async createPaymentTransaction(
    paymentData: PaymentRequest
  ): Promise<PaymentResponse> {
    console.log('إنشاء معاملة دفع جديدة:', paymentData);
    
    // التحقق من صحة البطاقة قبل إرسال الطلب
    if (!this.isCardNumberValid(paymentData.card_number)) {
      throw new Error('رقم البطاقة غير صالح');
    }
    
    if (!this.isCvvValid(paymentData.cvv)) {
      throw new Error('رمز CVV غير صالح');
    }
    
    // في وضع التطوير، نستخدم بيانات محاكاة
    const isDevelopment = import.meta.env.DEV || !API_KEY || API_KEY === 'demo-api-key';
    
    // إرسال طلب الدفع إلى API أو استخدام المحاكاة
    const response = isDevelopment 
      ? await mockPaymentTransaction(paymentData)
      : await sendPaymentRequest(paymentData);
    
    // حفظ المعاملة في قاعدة البيانات
    await savePaymentTransaction(response, paymentData);
    
    return response;
  }

  /**
   * إنشاء معاملة استرداد وحفظها في قاعدة البيانات
   */
  public static async createRefundTransaction(
    refundData: RefundRequest
  ): Promise<RefundResponse> {
    console.log('إنشاء معاملة استرداد:', refundData);
    
    // التحقق من صحة بيانات الاسترداد
    if (!refundData.order_id || refundData.order_id <= 0) {
      throw new Error('رقم الطلب غير صالح');
    }
    
    if (!refundData.amount || refundData.amount <= 0) {
      throw new Error('المبلغ المسترد يجب أن يكون أكبر من صفر');
    }
    
    // في وضع التطوير، نستخدم بيانات محاكاة
    const isDevelopment = import.meta.env.DEV || !API_KEY || API_KEY === 'demo-api-key';
    
    // إرسال طلب الاسترداد إلى API أو استخدام المحاكاة
    const response = isDevelopment
      ? await mockRefundTransaction(refundData)
      : await sendRefundRequest(refundData);
    
    // حفظ المعاملة في قاعدة البيانات
    await saveRefundTransaction(response, refundData);
    
    return response;
  }

  /**
   * استرجاع معاملات الدفع والاسترداد للمستخدم الحالي
   */
  public static async getUserTransactions(limit: number = 10) {
    return getUserTransactions(limit);
  }
}

// تصدير الأنواع المطلوبة
export type { PaymentRequest, RefundRequest, PaymentResponse, RefundResponse };
