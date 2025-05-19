
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
      
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers: this.headers,
        body: JSON.stringify(data),
      });

      // التحقق من حالة الاستجابة
      if (!response.ok) {
        const errorData = await response.json() as ApiErrorResponse;
        throw new Error(errorData.message || 'حدث خطأ أثناء معالجة الطلب');
      }

      return await response.json() as T;
    } catch (error) {
      console.error('خطأ في معالجة طلب API:', error);
      toast({
        title: 'خطأ في المعاملة',
        description: error instanceof Error ? error.message : 'حدث خطأ غير متوقع',
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
    // في الوضع التجريبي، نقوم بمحاكاة العملية
    if (process.env.NODE_ENV === 'development') {
      // محاكاة تأخير الشبكة
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // محاكاة نجاح العملية
      if (Math.random() > 0.1) { // 90% نسبة النجاح
        return {
          transaction_id: Math.floor(Math.random() * 1000) + 500,
          status: 'success',
        };
      }
      
      // محاكاة فشل العملية
      throw new Error('البطاقة غير صالحة أو معطّلة.');
    }
    
    // في وضع الإنتاج، نتصل بالواجهة البرمجية الحقيقية
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
    // في الوضع التجريبي، نقوم بمحاكاة العملية
    if (process.env.NODE_ENV === 'development') {
      // محاكاة تأخير الشبكة
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // محاكاة نجاح العملية
      if (Math.random() > 0.1) { // 90% نسبة النجاح
        return {
          status: 'success',
          refund_txn_id: Math.floor(Math.random() * 1000) + 500,
          new_wallet_bal: 1250.75,
          new_card_bal: 75.5,
        };
      }
      
      // محاكاة فشل العملية
      throw new Error('فشل في عملية الاسترداد: المعاملة الأصلية غير موجودة');
    }
    
    // في وضع الإنتاج، نتصل بالواجهة البرمجية الحقيقية
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
    
    // يمكن إضافة المزيد من عمليات التحقق مثل خوارزمية Luhn
    // هذه مجرد عملية تحقق بسيطة للعرض
    return true;
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
