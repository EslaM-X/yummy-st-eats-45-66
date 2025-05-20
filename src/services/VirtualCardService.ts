
import { toast } from '@/hooks/use-toast';
import { supabase } from "@/integrations/supabase/client";

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

// رابط API الافتراضي
const API_BASE_URL = 'https://api.salla-shop.com';
// الحصول على API Key من متغيرات البيئة
const API_KEY = import.meta.env.VITE_ST_VPC_API_KEY || process.env.ST_VPC_API_KEY || 'demo-api-key';

/**
 * خدمة للتعامل مع عمليات البطاقة الافتراضية ST
 */
export class VirtualCardService {
  /**
   * إرسال طلب إلى API مع إضافة مفتاح API في الهيدر
   */
  private static async sendRequest<T>(
    endpoint: string,
    method: string,
    data: any
  ): Promise<T> {
    try {
      console.log(`إرسال طلب ${method} إلى ${endpoint}`, data);
      
      // في وضع التطوير، نستخدم بيانات محاكاة
      if (import.meta.env.DEV || !API_KEY || API_KEY === 'demo-api-key') {
        return await this.sendMockRequest<T>(endpoint, method, data);
      }
      
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
   * إرسال طلب محاكاة للتطوير والاختبار
   */
  private static async sendMockRequest<T>(
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
    
    // إرسال طلب الدفع إلى API
    const response = await this.sendRequest<PaymentResponse>(
      '/st-vpc/v1/transactions',
      'POST',
      paymentData
    );
    
    try {
      // الحصول على جلسة المستخدم الحالية
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // حفظ معاملة الدفع في قاعدة البيانات
        const { error } = await supabase.from('payment_transactions').insert({
          transaction_id: response.transaction_id.toString(),
          order_id: paymentData.order_id.toString(), // سيتم تعديل هذا لاحقاً للتكامل مع نظام الطلبات
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
      // لا نرفض الوعد هنا، فما زالت المعاملة ناجحة حتى لو لم نتمكن من حفظها
    }
    
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
    
    // إرسال طلب الاسترداد إلى API
    const response = await this.sendRequest<RefundResponse>(
      '/st-vpc/v1/refund',
      'POST',
      refundData
    );
    
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
          return response;
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
      // لا نرفض الوعد هنا، فما زالت المعاملة ناجحة حتى لو لم نتمكن من حفظها
    }
    
    return response;
  }

  /**
   * وظيفة للتحقق من صلاحية البطاقة - تستخدم خوارزمية Luhn
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

  /**
   * استرجاع معاملات الدفع والاسترداد للمستخدم الحالي
   */
  public static async getUserTransactions(limit: number = 10) {
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
}
