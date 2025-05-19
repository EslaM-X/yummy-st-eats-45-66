
import { toast } from '@/hooks/use-toast';

// تعريف الأنواع المستخدمة في طلبات الواجهة البرمجية وردودها
export interface PaymentRequest {
  card_number: string;
  cvv: string;
  amount: number;
  order_id: number;
}

export interface RefundRequest {
  order_id: number;
  amount: number;
}

export interface PaymentResponse {
  transaction_id: number;
  status: string;
}

export interface RefundResponse {
  status: string;
  refund_txn_id: number;
  new_wallet_bal: number;
  new_card_bal: number;
}

export interface ApiErrorResponse {
  code: string;
  message: string;
  data: {
    status: number;
  };
}

// رابط API الافتراضي - يمكن تغييره حسب البيئة
const API_BASE_URL = 'https://salla-shop.com/salla-developer';
const API_KEY = 'demo-api-key'; // في الإنتاج، هذا سيأتي من التكوين الآمن

/**
 * خدمة للتعامل مع عمليات البطاقة الافتراضية ST
 */
export class VirtualCardService {
  private static headers = {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY,
  };

  /**
   * إرسال طلب إلى API
   */
  private static async sendRequest<T>(
    endpoint: string,
    method: string,
    data: any
  ): Promise<T> {
    try {
      console.log(`إرسال طلب ${method} إلى ${endpoint}`, data);
      
      // محاكاة طلب API - في الحالة الفعلية، سيتم استبدال هذا بطلب fetch حقيقي
      // سنحاكي استجابة ناجحة لجعل عملية الدفع والاسترداد فعالة للعرض التجريبي
      await new Promise(resolve => setTimeout(resolve, 1800)); // محاكاة تأخير الشبكة
      
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
   * إنشاء معاملة دفع جديدة
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
    
    return await this.sendRequest<PaymentResponse>(
      '/st-vpc/v1/transactions',
      'POST',
      paymentData
    );
  }

  /**
   * إنشاء معاملة استرداد
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
    
    return await this.sendRequest<RefundResponse>(
      '/st-vpc/v1/refund',
      'POST',
      refundData
    );
  }

  /**
   * وظيفة للتحقق من صلاحية البطاقة
   */
  public static isCardNumberValid(cardNumber: string): boolean {
    // إزالة المسافات والرموز
    const sanitizedNumber = cardNumber.replace(/\D/g, '');
    
    // التحقق من أن الرقم يتكون من 16 رقم
    if (sanitizedNumber.length !== 16) {
      return false;
    }
    
    // محاكاة خوارزمية Luhn للتحقق من صحة رقم البطاقة
    let sum = 0;
    let shouldDouble = false;
    
    // المرور على الأرقام من اليمين إلى اليسار
    for (let i = sanitizedNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(sanitizedNumber.charAt(i));
      
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    
    return (sum % 10) === 0;
  }

  /**
   * وظيفة للتحقق من صلاحية رمز CVV
   */
  public static isCvvValid(cvv: string): boolean {
    // إزالة المسافات والرموز
    const sanitizedCvv = cvv.replace(/\D/g, '');
    
    // CVV يتكون عادةً من 3 أو 4 أرقام
    return sanitizedCvv.length >= 3 && sanitizedCvv.length <= 4;
  }
}
