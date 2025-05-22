
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types';

/**
 * خدمة التعامل مع المنتجات في التطبيق
 */
export const ProductService = {
  /**
   * جلب جميع المنتجات
   */
  async getAllProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          restaurants(*),
          categories(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return { data, error: null };
    } catch (error: any) {
      console.error('Error fetching products:', error);
      return { data: [], error };
    }
  },
  
  /**
   * جلب منتج بواسطة المعرف
   */
  async getProductById(id: string) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          restaurants(*),
          categories(*)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error: any) {
      console.error(`Error fetching product with ID ${id}:`, error);
      return { data: null, error };
    }
  },
  
  /**
   * جلب المنتجات حسب فئة معينة
   */
  async getProductsByCategory(categoryId: string) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          restaurants(*),
          categories(*)
        `)
        .eq('category_id', categoryId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return { data, error: null };
    } catch (error: any) {
      console.error(`Error fetching products for category ${categoryId}:`, error);
      return { data: [], error };
    }
  },
  
  /**
   * جلب المنتجات حسب مطعم معين
   */
  async getProductsByRestaurant(restaurantId: string) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories(*)
        `)
        .eq('restaurant_id', restaurantId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return { data, error: null };
    } catch (error: any) {
      console.error(`Error fetching products for restaurant ${restaurantId}:`, error);
      return { data: [], error };
    }
  },
  
  /**
   * إنشاء منتج جديد
   */
  async createProduct(productData: Partial<Product>) {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert(productData)
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
   * تحديث منتج موجود
   */
  async updateProduct(id: string, productData: Partial<Product>) {
    try {
      const { data, error } = await supabase
        .from('products')
        .update(productData)
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
   * جلب المنتجات المميزة
   */
  async getFeaturedProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          restaurants(*),
          categories(*)
        `)
        .eq('featured', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return { data, error: null };
    } catch (error: any) {
      console.error('Error fetching featured products:', error);
      return { data: [], error };
    }
  },
  
  /**
   * البحث عن منتجات
   */
  async searchProducts(query: string) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          restaurants(*),
          categories(*)
        `)
        .or(`name.ilike.%${query}%,description.ilike.%${query}%`);

      if (error) throw error;

      return { data, error: null };
    } catch (error: any) {
      console.error(`Error searching for products with query "${query}":`, error);
      return { data: [], error };
    }
  }
};

/**
 * الحصول على الفئات المتاحة
 */
export const getCategories = async () => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;

    return data || [];
  } catch (error: any) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

/**
 * الحصول على المنتجات المفلترة
 */
export const getFilteredProducts = async (
  searchTerm: string = '',
  categoryId: string = '',
  sortBy: string = '',
  countryCode: string = ''
) => {
  try {
    let query = supabase
      .from('products')
      .select(`
        *,
        restaurants(*),
        categories(*)
      `);

    // تطبيق فلتر البحث
    if (searchTerm) {
      query = query.or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
    }
    
    // تطبيق فلتر الفئة
    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }
    
    // تطبيق فلتر المنتجات المتاحة فقط
    query = query.eq('is_available', true);
    
    // الحصول على النتائج
    const { data, error } = await query;

    if (error) throw error;

    // تطبيق الترتيب
    let sortedData = [...(data || [])];
    
    if (sortBy === 'price_asc') {
      sortedData.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_desc') {
      sortedData.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      sortedData.sort((a, b) => 
        new Date(b.created_at || '').getTime() - 
        new Date(a.created_at || '').getTime()
      );
    }

    return sortedData;
  } catch (error: any) {
    console.error('Error getting filtered products:', error);
    return [];
  }
};
