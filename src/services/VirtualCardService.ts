
import { supabase } from '@/integrations/supabase/client';
import { queryClient } from '@/lib/query';

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
}

export interface Card {
  id: string;
  user_id: string;
  card_number: string;
  holder_name: string;
  expiry_date: string;
  cvv: string;
  balance: number;
  is_active: boolean;
  created_at: string;
  card_type: 'virtual' | 'physical';
  is_default: boolean;
  last_used?: string;
}

// خدمة معالجة البطاقات الافتراضية
export class VirtualCardService {
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

      // إنشاء سجل بطاقة جديدة (في سيناريو واقعي سيكون هناك اتصال بخدمة بطاقات حقيقية)
      // هذا مثال للمحاكاة فقط
      const card: Card = {
        id: crypto.randomUUID(),
        user_id: user.id,
        card_number: cardNumber,
        holder_name: holderName,
        expiry_date: expiryDate,
        cvv: cvv,
        balance: 0,
        is_active: true,
        created_at: new Date().toISOString(),
        card_type: 'virtual',
        is_default: true,
      };

      return card;
    } catch (error) {
      console.error('Error creating virtual card:', error);
      return null;
    }
  }

  // الحصول على البطاقات الافتراضية للمستخدم
  static async getUserCards(): Promise<Card[]> {
    try {
      // في نسخة حقيقية، سيتم جلب البطاقات من قاعدة البيانات
      // هذه نسخة للمحاكاة فقط
      return [
        {
          id: '1',
          user_id: '123',
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
      // في نسخة حقيقية، سيتم جلب المعاملات من قاعدة البيانات
      // هذه نسخة للمحاكاة فقط
      return [
        {
          id: '1',
          user_id: '123',
          amount: 100.00,
          type: 'deposit',
          description: 'إيداع الرصيد',
          status: 'completed',
          created_at: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: '2',
          user_id: '123',
          amount: 25.50,
          type: 'payment',
          description: 'دفع طلبية',
          status: 'completed',
          created_at: new Date(Date.now() - 43200000).toISOString(),
          merchant_name: 'مطعم الشرق',
          card_id: '1',
        },
        {
          id: '3',
          user_id: '123',
          amount: 10.00,
          type: 'withdrawal',
          description: 'سحب المبلغ',
          status: 'pending',
          created_at: new Date().toISOString(),
        },
      ];
    } catch (error) {
      console.error('Error getting user transactions:', error);
      return [];
    }
  }

  // إضافة رصيد إلى البطاقة
  static async addBalance(cardId: string, amount: number): Promise<boolean> {
    try {
      console.log(`Adding ${amount} to card ${cardId}`);
      // في نسخة حقيقية، سيتم تحديث رصيد البطاقة في قاعدة البيانات
      return true;
    } catch (error) {
      console.error('Error adding balance:', error);
      return false;
    }
  }

  // إجراء عملية دفع باستخدام البطاقة
  static async makePayment(cardId: string, amount: number, merchantName: string): Promise<boolean> {
    try {
      console.log(`Payment of ${amount} from card ${cardId} to ${merchantName}`);
      // في نسخة حقيقية، سيتم إجراء عملية الدفع وتسجيل المعاملة
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
