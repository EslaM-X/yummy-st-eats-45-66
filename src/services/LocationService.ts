
import { supabase } from '@/integrations/supabase/client';
import { Location } from '@/types';

export class LocationService {
  static async getCountries() {
    try {
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .eq('type', 'country')
        .order('name');
      
      if (error) {
        console.error('Error fetching countries:', error);
        return [];
      }
      
      return data as Location[];
    } catch (error) {
      console.error('Exception fetching countries:', error);
      return [];
    }
  }
  
  static async getCities(countryId: string) {
    try {
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .eq('type', 'city')
        .eq('parent_id', countryId)
        .order('name');
      
      if (error) {
        console.error('Error fetching cities:', error);
        return [];
      }
      
      return data as Location[];
    } catch (error) {
      console.error('Exception fetching cities:', error);
      return [];
    }
  }
  
  static async getAreas(cityId: string) {
    try {
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .eq('type', 'area')
        .eq('parent_id', cityId)
        .order('name');
      
      if (error) {
        console.error('Error fetching areas:', error);
        return [];
      }
      
      return data as Location[];
    } catch (error) {
      console.error('Exception fetching areas:', error);
      return [];
    }
  }
  
  static async getLocationById(locationId: string) {
    try {
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .eq('id', locationId)
        .single();
      
      if (error) {
        console.error('Error fetching location details:', error);
        return null;
      }
      
      return data as Location;
    } catch (error) {
      console.error('Exception fetching location details:', error);
      return null;
    }
  }
  
  static async getLocationHierarchy(areaId: string) {
    try {
      // Get the area
      const area = await this.getLocationById(areaId);
      if (!area || !area.parent_id) return { area, city: null, country: null };
      
      // Get the city
      const city = await this.getLocationById(area.parent_id);
      if (!city || !city.parent_id) return { area, city, country: null };
      
      // Get the country
      const country = await this.getLocationById(city.parent_id);
      
      return { area, city, country };
    } catch (error) {
      console.error('Exception fetching location hierarchy:', error);
      return { area: null, city: null, country: null };
    }
  }
}
