
/**
 * خدمة البطاقة الافتراضية - الواجهة الرئيسية
 */
import { toast } from '@/hooks/use-toast';
import { isCardNumberValid, isCvvValid } from './card/cardValidation';
import { mockPaymentTransaction, mockRefundTransaction } from './card/mockService';
import { sendPaymentRequest, sendRefundRequest } from './card/apiService';
import { savePaymentTransaction, saveRefundTransaction, getUserTransactions } from './card/databaseService';
import { PaymentRequest, RefundRequest, PaymentResponse, RefundResponse, Transaction } from './card/apiTypes';

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

  private static isDevelopment = import.meta.env.DEV || !API_KEY || API_KEY === 'demo-api-key';

  /**
   * التحقق من صلاحية بيانات الدفع قبل إرسالها
   */
  private static validatePaymentData(paymentData: PaymentRequest): void {
    if (!this.isCardNumberValid(paymentData.card_number)) {
      throw new Error('رقم البطاقة غير صالح');
    }
    
    if (!this.isCvvValid(paymentData.cvv)) {
      throw new Error('رمز CVV غير صالح');
    }
    
    if (!paymentData.amount || paymentData.amount <= 0) {
      throw new Error('المبلغ يجب أن يكون أكبر من صفر');
    }

    if (!paymentData.order_id || paymentData.order_id <= 0) {
      throw new Error('رقم الطلب غير صالح');
    }
  }

  /**
   * التحقق من صلاحية بيانات الاسترداد قبل إرسالها
   */
  private static validateRefundData(refundData: RefundRequest): void {
    if (!refundData.order_id || refundData.order_id <= 0) {
      throw new Error('رقم الطلب غير صالح');
    }
    
    if (!refundData.amount || refundData.amount <= 0) {
      throw new Error('المبلغ المسترد يجب أن يكون أكبر من صفر');
    }
  }

  /**
   * إنشاء معاملة دفع جديدة وحفظها في قاعدة البيانات
   */
  public static async createPaymentTransaction(
    paymentData: PaymentRequest
  ): Promise<PaymentResponse> {
    try {
      console.log('إنشاء معاملة دفع جديدة:', paymentData);
      
      // التحقق من صحة البيانات
      this.validatePaymentData(paymentData);
      
      // إرسال طلب الدفع إلى API أو استخدام المحاكاة
      const response = this.isDevelopment 
        ? await mockPaymentTransaction(paymentData)
        : await sendPaymentRequest(paymentData);
      
      // حفظ المعاملة في قاعدة البيانات (عملية غير متزامنة في الخلفية)
      savePaymentTransaction(response, paymentData)
        .catch(err => console.error('خطأ في حفظ معاملة الدفع:', err));
      
      return response;
    } catch (error) {
      console.error('خطأ في معالجة معاملة الدفع:', error);
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'حدث خطأ غير متوقع أثناء معالجة طلب الدفع';
      
      toast({
        title: 'خطأ في معاملة الدفع',
        description: errorMessage,
        variant: 'destructive',
      });
      
      throw error;
    }
  }

  /**
   * إنشاء معاملة استرداد وحفظها في قاعدة البيانات
   */
  public static async createRefundTransaction(
    refundData: RefundRequest
  ): Promise<RefundResponse> {
    try {
      console.log('إنشاء معاملة استرداد:', refundData);
      
      // التحقق من صحة بيانات الاسترداد
      this.validateRefundData(refundData);
      
      // إرسال طلب الاسترداد إلى API أو استخدام المحاكاة
      const response = this.isDevelopment
        ? await mockRefundTransaction(refundData)
        : await sendRefundRequest(refundData);
      
      // حفظ معاملة الاسترداد في قاعدة البيانات (عملية غير متزامنة في الخلفية)
      saveRefundTransaction(response, refundData)
        .catch(err => console.error('خطأ في حفظ معاملة الاسترداد:', err));
      
      return response;
    } catch (error) {
      console.error('خطأ في معالجة معاملة الاسترداد:', error);
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'حدث خطأ غير متوقع أثناء معالجة طلب الاسترداد';
      
      toast({
        title: 'خطأ في معاملة الاسترداد',
        description: errorMessage,
        variant: 'destructive',
      });
      
      throw error;
    }
  }

  /**
   * استرجاع معاملات المستخدم مع التخزين المؤقت للبيانات
   */
  private static transactionsCache: Transaction[] | null = null;
  private static lastCacheTime: number = 0;
  private static cacheDuration = 60000; // مدة صلاحية التخزين المؤقت بالمللي ثانية (1 دقيقة)

  /**
   * استرجاع معاملات الدفع والاسترداد للمستخدم الحالي
   * مع دعم التخزين المؤقت لتحسين الأداء
   */
  public static async getUserTransactions(limit: number = 10, forceRefresh: boolean = false): Promise<Transaction[]> {
    const currentTime = Date.now();
    const isCacheValid = !forceRefresh && 
                         this.transactionsCache && 
                         (currentTime - this.lastCacheTime < this.cacheDuration);
    
    // إذا كانت البيانات المخزنة مؤقتًا صالحة، استخدمها
    if (isCacheValid) {
      console.log('استخدام البيانات المخزنة مؤقتًا للمعاملات');
      return this.transactionsCache;
    }
    
    try {
      // استرجاع بيانات جديدة
      const transactions = await getUserTransactions(limit);
      
      // تحديث التخزين المؤقت
      this.transactionsCache = transactions;
      this.lastCacheTime = currentTime;
      
      return transactions;
    } catch (error) {
      console.error('خطأ في استرجاع معاملات المستخدم:', error);
      
      // في حالة الخطأ، إرجاع البيانات المخزنة مؤقتًا إذا كانت متوفرة
      if (this.transactionsCache) {
        toast({
          title: 'تعذر تحديث البيانات',
          description: 'نعرض لك البيانات السابقة. يرجى المحاولة مرة أخرى لاحقًا.',
          variant: 'default',
        });
        return this.transactionsCache;
      }
      
      // إذا لم تكن هناك بيانات مخزنة مؤقتًا، إعادة إلقاء الخطأ
      throw error;
    }
  }

  /**
   * مسح التخزين المؤقت للمعاملات
   */
  public static clearTransactionsCache(): void {
    this.transactionsCache = null;
    this.lastCacheTime = 0;
  }
}

// تصدير الأنواع المطلوبة
export type { PaymentRequest, RefundRequest, PaymentResponse, RefundResponse, Transaction };
