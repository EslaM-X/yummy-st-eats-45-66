
import { supabase } from '@/integrations/supabase/client';

/**
 * خدمة التعامل مع المواقع والمدن في التطبيق
 */
export const LocationService = {
  /**
   * جلب جميع المدن
   */
  async getCities() {
    try {
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .eq('type', 'city')
        .order('name');

      if (error) throw error;

      return { data, error: null };
    } catch (error: any) {
      console.error('Error fetching cities:', error);
      return { data: [], error };
    }
  },

  /**
   * جلب الأحياء التابعة لمدينة معينة
   */
  async getDistrictsByCity(cityId: string) {
    try {
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .eq('type', 'district')
        .eq('parent_id', cityId)
        .order('name');

      if (error) throw error;

      return { data, error: null };
    } catch (error: any) {
      console.error(`Error fetching districts for city ${cityId}:`, error);
      return { data: [], error };
    }
  },

  /**
   * جلب المناطق التابعة لحي معين
   */
  async getNeighborhoodsByDistrict(districtId: string) {
    try {
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .eq('type', 'neighborhood')
        .eq('parent_id', districtId)
        .order('name');

      if (error) throw error;

      return { data, error: null };
    } catch (error: any) {
      console.error(`Error fetching neighborhoods for district ${districtId}:`, error);
      return { data: [], error };
    }
  },

  /**
   * جلب موقع معين بالمعرف
   */
  async getLocationById(id: string) {
    try {
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;

      return { data, error: null };
    } catch (error: any) {
      console.error(`Error fetching location with ID ${id}:`, error);
      return { data: null, error };
    }
  },

  /**
   * حساب رسوم التوصيل بناءً على الموقع
   */
  async getDeliveryFee(locationId: string) {
    try {
      const { data, error } = await supabase
        .from('locations')
        .select('delivery_fee, delivery_available')
        .eq('id', locationId)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        throw new Error('لم يتم العثور على الموقع المحدد');
      }

      if (!data.delivery_available) {
        throw new Error('التوصيل غير متاح في هذه المنطقة');
      }

      return { deliveryFee: data.delivery_fee, error: null };
    } catch (error: any) {
      console.error(`Error getting delivery fee for location ${locationId}:`, error);
      return { deliveryFee: null, error };
    }
  }
};
