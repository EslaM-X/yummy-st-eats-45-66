
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

/**
 * خدمة التعامل مع المنتجات (الأطعمة) في التطبيق
 */
export const ProductService = {
  /**
   * جلب جميع المنتجات مع إمكانية التصفية
   */
  async getProducts(options: {
    category_id?: string;
    restaurant_id?: string;
    featured?: boolean;
    search?: string;
    sortBy?: 'price_asc' | 'price_desc' | 'rating' | 'newest';
    limit?: number;
  } = {}) {
    try {
      let query = supabase.from('products').select(`
        *,
        categories(*),
        restaurants(id, name, logo_url)
      `);

      // تطبيق المرشحات
      if (options.category_id) {
        query = query.eq('category_id', options.category_id);
      }

      if (options.restaurant_id) {
        query = query.eq('restaurant_id', options.restaurant_id);
      }

      if (options.featured !== undefined) {
        query = query.eq('featured', options.featured);
      }

      if (options.search) {
        query = query.ilike('name', `%${options.search}%`);
      }

      // تطبيق الترتيب
      if (options.sortBy) {
        switch (options.sortBy) {
          case 'price_asc':
            query = query.order('price', { ascending: true });
            break;
          case 'price_desc':
            query = query.order('price', { ascending: false });
            break;
          case 'rating':
            // سنستخدم ترتيب مخصص في المستقبل للتصنيف
            query = query.order('created_at', { ascending: false });
            break;
          case 'newest':
            query = query.order('created_at', { ascending: false });
            break;
        }
      } else {
        // الترتيب الافتراضي حسب تاريخ الإنشاء (الأحدث أولاً)
        query = query.order('created_at', { ascending: false });
      }

      // تقييد عدد النتائج
      if (options.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query;

      if (error) throw error;

      return { data, error: null };
    } catch (error: any) {
      console.error('Error fetching products:', error);
      return { data: [], error };
    }
  },

  /**
   * جلب منتج واحد بواسطة المعرف
   */
  async getProductById(id: string) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories(*),
          restaurants(*)
        `)
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;

      return { data, error: null };
    } catch (error: any) {
      console.error(`Error fetching product with ID ${id}:`, error);
      return { data: null, error };
    }
  },

  /**
   * إنشاء منتج جديد
   */
  async createProduct(product: {
    name: string;
    description?: string;
    price: number;
    restaurant_id: string;
    category_id?: string;
    image_url?: string;
    ingredients?: string[];
    nutritional_info?: Record<string, any>;
    preparation_time?: number;
    discount_percent?: number;
    featured?: boolean;
  }) {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert(product)
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error: any) {
      console.error('Error creating product:', error);
      return { data: null, error };
    }
  },

  /**
   * تحديث منتج
   */
  async updateProduct(id: string, updates: Partial<{
    name: string;
    description: string;
    price: number;
    restaurant_id: string;
    category_id: string;
    image_url: string;
    ingredients: string[];
    nutritional_info: Record<string, any>;
    preparation_time: number;
    discount_percent: number;
    is_available: boolean;
    featured: boolean;
  }>) {
    try {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error: any) {
      console.error(`Error updating product with ID ${id}:`, error);
      return { data: null, error };
    }
  },

  /**
   * حذف منتج
   */
  async deleteProduct(id: string) {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;

      return { success: true, error: null };
    } catch (error: any) {
      console.error(`Error deleting product with ID ${id}:`, error);
      return { success: false, error };
    }
  },

  /**
   * جلب فئات المنتجات
   */
  async getCategories() {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;

      return { data, error: null };
    } catch (error: any) {
      console.error('Error fetching categories:', error);
      return { data: [], error };
    }
  }
};
