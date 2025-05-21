
import { supabase } from '@/integrations/supabase/client';
import { queryClient } from '@/lib/query';
import { isCardNumberValid, isCvvValid } from './card/cardValidation';
import { VirtualCard } from '@/types/admin';
import { Json } from '@/integrations/supabase/types';

// أنواع البيانات
export interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'payment' | 'refund';
  description: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  created_at: string;
  merchant_name?: string;
  card_id?: string;
  date?: string; // إضافة حقل التاريخ المطلوب للواجهة
}

export interface TransactionStat {
  total_payments: number;
  total_refunds: number;
  payment_count: number;
  refund_count: number;
  net_revenue: number;
}

export type Card = VirtualCard;

interface PaymentData {
  card_number: string;
  cvv: string;
  amount: number;
  order_id: string | number;
}

interface RefundData {
  orderId: string | number;
  amount: number;
  reason: string;
}

// خدمة معالجة البطاقات الافتراضية
export class VirtualCardService {
  // التحقق من صحة رقم البطاقة
  static isCardNumberValid = isCardNumberValid;
  
  // التحقق من صحة رمز CVV
  static isCvvValid = isCvvValid;

  // إنشاء بطاقة افتراضية جديدة
  static async createVirtualCard(holderName: string): Promise<Card | null> {
    try {
      // التحقق من وجود مستخدم مسجل
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // توليد رقم بطاقة عشوائي
      const cardNumber = this.generateCardNumber();
      const expiryDate = this.generateExpiryDate();
      const cvv = this.generateCVV();

      // إنشاء سجل بطاقة جديدة في Supabase - نستخدم هنا RPC بدلاً من الإدراج المباشر لأن الجدول غير موجود
      // في الواقع، يجب إنشاء الجدول أولاً في Supabase
      
      // نعود بنموذج وهمي للبطاقة
      const mockCard: Card = {
        id: crypto.randomUUID(),
        user_id: user.id,
        card_number: cardNumber,
        holder_name: holderName,
        expiry_date: expiryDate,
        cvv: cvv,
        balance: 0,
        is_active: true,
        card_type: 'virtual',
        is_default: true,
        created_at: new Date().toISOString()
      };
      
      return mockCard;
    } catch (error) {
      console.error('Error creating virtual card:', error);
      return null;
    }
  }

  // الحصول على البطاقات الافتراضية للمستخدم
  static async getUserCards(): Promise<Card[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return [];
      }

      // نعود ببيانات وهمية للبطاقات
      return [
        {
          id: '1',
          user_id: user.id,
          card_number: '4111 **** **** 1111',
          holder_name: 'أحمد محمد',
          expiry_date: '12/25',
          cvv: '***',
          balance: 500.00,
          is_active: true,
          created_at: new Date().toISOString(),
          card_type: 'virtual',
          is_default: true,
          last_used: new Date().toISOString(),
        }
      ];
    } catch (error) {
      console.error('Error getting user cards:', error);
      return [];
    }
  }

  // الحصول على معاملات المستخدم
  static async getUserTransactions(): Promise<Transaction[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return [];
      }

      // هنا نعود بالبيانات الوهمية مباشرة لتجنب الأخطاء المتعلقة بالجداول غير الموجودة
      return this.getMockTransactions(user.id);
    } catch (error) {
      console.error('Error getting user transactions:', error);
      return [];
    }
  }

  // الحصول على بيانات وهمية للمعاملات
  private static getMockTransactions(userId: string): Transaction[] {
    return [
      {
        id: '1',
        user_id: userId,
        amount: 100.00,
        type: 'deposit',
        description: 'إيداع الرصيد',
        status: 'completed',
        created_at: new Date(Date.now() - 86400000).toISOString(),
        date: new Date(Date.now() - 86400000).toLocaleDateString()
      },
      {
        id: '2',
        user_id: userId,
        amount: -25.50,
        type: 'payment',
        description: 'دفع طلبية',
        status: 'completed',
        created_at: new Date(Date.now() - 43200000).toISOString(),
        merchant_name: 'مطعم الشرق',
        card_id: '1',
        date: new Date(Date.now() - 43200000).toLocaleDateString()
      },
      {
        id: '3',
        user_id: userId,
        amount: -10.00,
        type: 'withdrawal',
        description: 'سحب المبلغ',
        status: 'pending',
        created_at: new Date().toISOString(),
        date: new Date().toLocaleDateString()
      },
    ];
  }

  // معالجة دفعة جديدة
  static async createPaymentTransaction(paymentData: PaymentData): Promise<any> {
    try {
      // التحقق من وجود مستخدم مسجل
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // محاكاة لمعالجة الدفع
      console.log('Processing payment:', paymentData);
      
      // نعود ببيانات وهمية للمعاملة
      return {
        transaction_id: `TRANS-${Date.now()}`,
        status: 'completed',
        amount: paymentData.amount,
        created_at: new Date().toISOString()
      };
    } catch (error) {
      console.error('Payment processing error:', error);
      throw new Error('فشل في معالجة الدفع');
    }
  }

  // معالجة طلب استرداد
  static async processRefund(refundData: RefundData): Promise<any> {
    try {
      // التحقق من وجود مستخدم مسجل
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // نعود ببيانات وهمية للاسترداد
      return {
        refund_id: `REFUND-${Date.now()}`,
        status: 'completed',
        amount: refundData.amount,
        original_order_id: refundData.orderId,
        created_at: new Date().toISOString()
      };
    } catch (error) {
      console.error('Refund processing error:', error);
      throw new Error('فشل في معالجة الاسترداد');
    }
  }

  // الحصول على إحصائيات المعاملات (للمدير)
  static async getTransactionStats(): Promise<TransactionStat> {
    // إرجاع بيانات وهمية
    return {
      total_payments: 15679.50,
      total_refunds: 1245.75,
      payment_count: 243,
      refund_count: 18,
      net_revenue: 14433.75
    };
  }

  // الحصول على معاملات المستخدمين (للمدير)
  static async getAdminTransactions(): Promise<any[]> {
    // استخدام بيانات وهمية
    return [
      {
        id: '1',
        user: 'أحمد محمد',
        email: 'ahmed@example.com',
        amount: 300.00,
        type: 'payment',
        status: 'completed',
        created_at: new Date(Date.now() - 86400000).toISOString(),
        formatted_date: new Date(Date.now() - 86400000).toLocaleDateString('ar-SA'),
        order_id: 'ORD-123456',
        transaction_id: 'TR-98765',
        card_last_four: '1111'
      },
      {
        id: '2',
        user: 'فاطمة علي',
        email: 'fatima@example.com',
        amount: 150.00,
        type: 'payment',
        status: 'processing',
        created_at: new Date(Date.now() - 172800000).toISOString(),
        formatted_date: new Date(Date.now() - 172800000).toLocaleDateString('ar-SA'),
        order_id: 'ORD-123457',
        transaction_id: 'TR-98766',
        card_last_four: '2222'
      },
      {
        id: '3',
        user: 'محمود خالد',
        email: 'mahmoud@example.com',
        amount: 50.00,
        type: 'refund',
        status: 'completed',
        created_at: new Date(Date.now() - 259200000).toISOString(),
        formatted_date: new Date(Date.now() - 259200000).toLocaleDateString('ar-SA'),
        order_id: 'ORD-123458',
        transaction_id: 'TR-98767',
        card_last_four: '3333'
      }
    ];
  }

  // الحصول على طلبات الاسترداد المعلقة (للمدير)
  static async getPendingRefunds(): Promise<any[]> {
    // استخدام بيانات وهمية
    return [
      {
        id: crypto.randomUUID(),
        user_id: '123',
        order_id: 'ORD-123456',
        amount: 100.00,
        reason: 'المنتج وصل تالف',
        status: 'pending',
        created_at: new Date(Date.now() - 86400000).toISOString(),
        profiles: {
          full_name: 'أحمد محمد',
          email: 'ahmed@example.com'
        },
        orders: {
          total_amount: 250.00,
          created_at: new Date(Date.now() - 172800000).toISOString(),
          delivery_address: 'الرياض، حي النخيل، شارع العليا'
        }
      },
      {
        id: crypto.randomUUID(),
        user_id: '456',
        order_id: 'ORD-123457',
        amount: 75.50,
        reason: 'المنتج غير مطابق للمواصفات',
        status: 'pending',
        created_at: new Date(Date.now() - 43200000).toISOString(),
        profiles: {
          full_name: 'فاطمة علي',
          email: 'fatima@example.com'
        },
        orders: {
          total_amount: 150.00,
          created_at: new Date(Date.now() - 129600000).toISOString(),
          delivery_address: 'جدة، حي الروضة، شارع الأمير محمد'
        }
      }
    ];
  }

  // إضافة رصيد إلى البطاقة
  static async addBalance(cardId: string, amount: number): Promise<boolean> {
    try {
      console.log(`Adding balance ${amount} to card ${cardId}`);
      return true;
    } catch (error) {
      console.error('Error adding balance:', error);
      return false;
    }
  }

  // إجراء عملية دفع باستخدام البطاقة
  static async makePayment(cardId: string, amount: number, merchantName: string): Promise<boolean> {
    try {
      console.log(`Making payment of ${amount} to ${merchantName} using card ${cardId}`);
      return true;
    } catch (error) {
      console.error('Error making payment:', error);
      return false;
    }
  }

  // توليد رقم بطاقة عشوائي بصيغة VISA
  private static generateCardNumber(): string {
    let cardNumber = '4'; // تبدأ بـ 4 لتمثيل VISA
    for (let i = 0; i < 15; i++) {
      cardNumber += Math.floor(Math.random() * 10);
    }
    return this.formatCardNumber(cardNumber);
  }

  // تنسيق رقم البطاقة للعرض
  private static formatCardNumber(number: string): string {
    return `${number.substring(0, 4)} ${number.substring(4, 8)} ${number.substring(8, 12)} ${number.substring(12, 16)}`;
  }

  // توليد تاريخ انتهاء عشوائي (بين سنة وأربع سنوات من الآن)
  private static generateExpiryDate(): string {
    const now = new Date();
    const year = now.getFullYear() + Math.floor(Math.random() * 3) + 1;
    const month = Math.floor(Math.random() * 12) + 1;
    return `${month.toString().padStart(2, '0')}/${(year % 100).toString().padStart(2, '0')}`;
  }

  // توليد رمز CVV عشوائي
  private static generateCVV(): string {
    return Math.floor(Math.random() * 900 + 100).toString();
  }
}
