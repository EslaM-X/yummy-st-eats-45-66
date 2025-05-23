
import { supabase } from '@/integrations/supabase/client';

export class OrderService {
  // Get all orders for current user with optional status filter
  static async getUserOrders(status?: string) {
    try {
      let query = supabase
        .from('orders')
        .select(`
          *,
          restaurants (
            id,
            name,
            logo_url,
            phone
          ),
          order_items (
            id,
            product_name,
            product_price,
            quantity,
            notes
          )
        `)
        .order('created_at', { ascending: false });
      
      if (status && status !== 'all') {
        query = query.eq('status', status);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching orders:', error);
        return { data: null, error };
      }
      
      return { data, error: null };
    } catch (error) {
      console.error('Exception fetching orders:', error);
      return { data: null, error };
    }
  }
  
  // Get a specific order by ID
  static async getOrderById(orderId: string) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          restaurants (
            id, 
            name,
            logo_url,
            phone,
            address
          ),
          order_items (
            id,
            product_id,
            product_name,
            product_price,
            quantity,
            notes
          )
        `)
        .eq('id', orderId)
        .single();
      
      if (error) {
        console.error('Error fetching order details:', error);
        return { data: null, error };
      }
      
      return { data, error: null };
    } catch (error) {
      console.error('Exception fetching order details:', error);
      return { data: null, error };
    }
  }
  
  // Cancel an order
  static async cancelOrder(orderId: string) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .update({ status: 'cancelled' })
        .eq('id', orderId);
      
      if (error) {
        console.error('Error cancelling order:', error);
        return { success: false, error };
      }
      
      // Create order tracking entry
      await supabase
        .from('order_tracking')
        .insert({
          order_id: orderId,
          status: 'cancelled',
          notes: 'Order cancelled by customer'
        });
      
      return { success: true, error: null };
    } catch (error) {
      console.error('Exception cancelling order:', error);
      return { success: false, error };
    }
  }
  
  // Create a new order
  static async createOrder(orderData: any) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert(orderData)
        .select();
      
      if (error) {
        console.error('Error creating order:', error);
        return { data: null, error };
      }
      
      return { data, error: null };
    } catch (error) {
      console.error('Exception creating order:', error);
      return { data: null, error };
    }
  }
}
