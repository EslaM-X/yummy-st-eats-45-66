
import { supabase } from '@/integrations/supabase/client';

/**
 * خدمة التعامل مع المفضلة في التطبيق
 */
export const FavoriteService = {
  /**
   * جلب المنتجات المفضلة للمستخدم
   */
  async getFavoriteProducts() {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select(`
          id,
          product_id,
          products(*)
        `)
        .not('product_id', 'is', null);

      if (error) throw error;

      return { data, error: null };
    } catch (error: any) {
      console.error('Error fetching favorite products:', error);
      return { data: [], error };
    }
  },

  /**
   * جلب المطاعم المفضلة للمستخدم
   */
  async getFavoriteRestaurants() {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select(`
          id,
          restaurant_id,
          restaurants(*)
        `)
        .not('restaurant_id', 'is', null);

      if (error) throw error;

      return { data, error: null };
    } catch (error: any) {
      console.error('Error fetching favorite restaurants:', error);
      return { data: [], error };
    }
  },

  /**
   * إضافة منتج إلى المفضلة
   */
  async addProductToFavorites(product_id: string) {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .insert({ product_id })
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error: any) {
      console.error('Error adding product to favorites:', error);
      return { data: null, error };
    }
  },

  /**
   * إضافة مطعم إلى المفضلة
   */
  async addRestaurantToFavorites(restaurant_id: string) {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .insert({ restaurant_id })
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error: any) {
      console.error('Error adding restaurant to favorites:', error);
      return { data: null, error };
    }
  },

  /**
   * إزالة عنصر من المفضلة
   */
  async removeFavorite(id: string) {
    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('id', id);

      if (error) throw error;

      return { success: true, error: null };
    } catch (error: any) {
      console.error(`Error removing favorite with ID ${id}:`, error);
      return { success: false, error };
    }
  },

  /**
   * التحقق مما إذا كان المنتج مفضلاً
   */
  async isProductFavorite(product_id: string) {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('id')
        .eq('product_id', product_id)
        .maybeSingle();

      if (error) throw error;

      return { isFavorite: !!data, favoriteId: data?.id, error: null };
    } catch (error: any) {
      console.error(`Error checking if product ${product_id} is favorite:`, error);
      return { isFavorite: false, favoriteId: null, error };
    }
  },

  /**
   * التحقق مما إذا كان المطعم مفضلاً
   */
  async isRestaurantFavorite(restaurant_id: string) {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('id')
        .eq('restaurant_id', restaurant_id)
        .maybeSingle();

      if (error) throw error;

      return { isFavorite: !!data, favoriteId: data?.id, error: null };
    } catch (error: any) {
      console.error(`Error checking if restaurant ${restaurant_id} is favorite:`, error);
      return { isFavorite: false, favoriteId: null, error };
    }
  }
};
