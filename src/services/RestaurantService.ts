
import { supabase } from '@/integrations/supabase/client';

/**
 * خدمة التعامل مع المطاعم في التطبيق
 */
export const RestaurantService = {
  /**
   * جلب جميع المطاعم مع إمكانية التصفية
   */
  async getRestaurants(options: {
    cuisine_type?: string;
    search?: string;
    sortBy?: 'rating' | 'newest' | 'popularity';
    limit?: number;
  } = {}) {
    try {
      let query = supabase.from('restaurants').select('*');

      // تطبيق المرشحات
      if (options.cuisine_type) {
        query = query.contains('cuisine_type', [options.cuisine_type]);
      }

      if (options.search) {
        query = query.or(`name.ilike.%${options.search}%,description.ilike.%${options.search}%`);
      }

      // فقط المطاعم النشطة
      query = query.eq('is_active', true);

      // تطبيق الترتيب
      if (options.sortBy) {
        switch (options.sortBy) {
          case 'rating':
            query = query.order('avg_rating', { ascending: false });
            break;
          case 'newest':
            query = query.order('created_at', { ascending: false });
            break;
          case 'popularity':
            query = query.order('rating_count', { ascending: false });
            break;
        }
      } else {
        // الترتيب الافتراضي حسب التقييم
        query = query.order('avg_rating', { ascending: false });
      }

      // تقييد عدد النتائج
      if (options.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query;

      if (error) throw error;

      return { data, error: null };
    } catch (error: any) {
      console.error('Error fetching restaurants:', error);
      return { data: [], error };
    }
  },

  /**
   * جلب مطعم واحد بواسطة المعرف
   */
  async getRestaurantById(id: string) {
    try {
      const { data, error } = await supabase
        .from('restaurants')
        .select(`
          *,
          products(*)
        `)
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;

      return { data, error: null };
    } catch (error: any) {
      console.error(`Error fetching restaurant with ID ${id}:`, error);
      return { data: null, error };
    }
  },

  /**
   * إنشاء مطعم جديد
   */
  async createRestaurant(restaurant: {
    name: string;
    description?: string;
    address: string;
    logo_url?: string;
    phone?: string;
    contact_email?: string;
    cuisine_type?: string[];
    opening_hours?: Record<string, any>;
    delivery_fee?: number;
    min_order_amount?: number;
    owner_id: string;
  }) {
    try {
      const { data, error } = await supabase
        .from('restaurants')
        .insert(restaurant)
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error: any) {
      console.error('Error creating restaurant:', error);
      return { data: null, error };
    }
  },

  /**
   * تحديث مطعم
   */
  async updateRestaurant(id: string, updates: Partial<{
    name: string;
    description: string;
    address: string;
    logo_url: string;
    phone: string;
    contact_email: string;
    cuisine_type: string[];
    opening_hours: Record<string, any>;
    delivery_fee: number;
    min_order_amount: number;
    is_active: boolean;
  }>) {
    try {
      const { data, error } = await supabase
        .from('restaurants')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error: any) {
      console.error(`Error updating restaurant with ID ${id}:`, error);
      return { data: null, error };
    }
  },

  /**
   * حذف مطعم
   */
  async deleteRestaurant(id: string) {
    try {
      const { error } = await supabase
        .from('restaurants')
        .delete()
        .eq('id', id);

      if (error) throw error;

      return { success: true, error: null };
    } catch (error: any) {
      console.error(`Error deleting restaurant with ID ${id}:`, error);
      return { success: false, error };
    }
  },

  /**
   * جلب أنواع المطابخ المتاحة
   */
  async getCuisineTypes() {
    try {
      const { data, error } = await supabase
        .from('restaurants')
        .select('cuisine_type');

      if (error) throw error;

      // استخراج جميع أنواع المطابخ الفريدة
      const cuisineTypes = new Set<string>();
      data.forEach(restaurant => {
        if (restaurant.cuisine_type && Array.isArray(restaurant.cuisine_type)) {
          restaurant.cuisine_type.forEach(cuisine => {
            cuisineTypes.add(cuisine);
          });
        }
      });

      return { data: Array.from(cuisineTypes), error: null };
    } catch (error: any) {
      console.error('Error fetching cuisine types:', error);
      return { data: [], error };
    }
  }
};
