
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

/**
 * خدمة التعامل مع الطلبات في التطبيق
 */
export const OrderService = {
  /**
   * إنشاء طلب جديد
   */
  async createOrder(order: {
    restaurant_id: string;
    items: Array<{
      product_id: string;
      quantity: number;
      name: string;
      price: number;
    }>;
    delivery_address: string;
    delivery_notes?: string;
    payment_method: 'card' | 'cash';
    customer_name?: string;
    customer_phone?: string;
    total_amount: number;
  }) {
    try {
      // التحقق من وجود مستخدم مسجل دخول
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('يجب تسجيل الدخول لإنشاء طلب');
      }

      // إنشاء الطلب
      const { data: order_data, error: order_error } = await supabase
        .from('orders')
        .insert({
          restaurant_id: order.restaurant_id,
          user_id: session.user.id,
          items: order.items,
          delivery_address: order.delivery_address,
          delivery_notes: order.delivery_notes,
          customer_name: order.customer_name,
          customer_phone: order.customer_phone,
          payment_method: order.payment_method,
          total_amount: order.total_amount,
          status: 'new'
        })
        .select()
        .single();

      if (order_error) throw order_error;

      // إنشاء سجلات العناصر المطلوبة
      const orderItems = order.items.map(item => ({
        order_id: order_data.id,
        product_id: item.product_id,
        product_name: item.name,
        product_price: item.price,
        quantity: item.quantity
      }));

      const { error: items_error } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (items_error) throw items_error;

      // إضافة أول حدث تتبع للطلب
      const { error: tracking_error } = await supabase
        .from('order_tracking')
        .insert({
          order_id: order_data.id,
          status: 'new',
          notes: 'تم استلام الطلب'
        });

      if (tracking_error) throw tracking_error;

      return { data: order_data, error: null };
    } catch (error: any) {
      console.error('Error creating order:', error);
      toast({
        title: 'خطأ في إنشاء الطلب',
        description: error.message || 'حدث خطأ أثناء محاولة إنشاء الطلب',
        variant: 'destructive',
      });
      return { data: null, error };
    }
  },

  /**
   * جلب الطلبات الخاصة بالمستخدم الحالي
   */
  async getUserOrders(status?: string) {
    try {
      let query = supabase
        .from('orders')
        .select(`
          *,
          restaurants(id, name, logo_url),
          order_tracking(status, created_at)
        `)
        .order('created_at', { ascending: false });

      if (status) {
        query = query.eq('status', status);
      }

      const { data, error } = await query;

      if (error) throw error;

      return { data, error: null };
    } catch (error: any) {
      console.error('Error fetching user orders:', error);
      return { data: [], error };
    }
  },

  /**
   * جلب تفاصيل طلب محدد
   */
  async getOrderById(id: string) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          restaurants(id, name, logo_url, phone),
          order_tracking(id, status, notes, created_at, created_by),
          order_items(id, product_id, product_name, product_price, quantity, notes)
        `)
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;

      return { data, error: null };
    } catch (error: any) {
      console.error(`Error fetching order with ID ${id}:`, error);
      return { data: null, error };
    }
  },

  /**
   * تحديث حالة الطلب
   */
  async updateOrderStatus(order_id: string, status: string, notes?: string) {
    try {
      // تحديث حالة الطلب
      const { error: order_error } = await supabase
        .from('orders')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', order_id);

      if (order_error) throw order_error;

      // إضافة حدث تتبع جديد
      const { data: { session } } = await supabase.auth.getSession();
      const user_id = session?.user?.id;

      const { error: tracking_error } = await supabase
        .from('order_tracking')
        .insert({
          order_id,
          status,
          notes,
          created_by: user_id || null
        });

      if (tracking_error) throw tracking_error;

      return { success: true, error: null };
    } catch (error: any) {
      console.error(`Error updating order status for order ID ${order_id}:`, error);
      return { success: false, error };
    }
  },

  /**
   * إلغاء طلب
   */
  async cancelOrder(order_id: string, reason?: string) {
    return this.updateOrderStatus(order_id, 'cancelled', reason || 'تم إلغاء الطلب بواسطة المستخدم');
  }
};
