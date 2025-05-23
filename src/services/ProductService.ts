
import { supabase } from "@/integrations/supabase/client";

// Get all categories
export const getCategories = async () => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Exception fetching categories:', error);
    return [];
  }
};

// Get filtered products
export const getFilteredProducts = async (
  searchTerm?: string,
  categoryName?: string,
  sortBy?: string,
  countryCode?: string
) => {
  try {
    let query = supabase
      .from('products')
      .select(`
        *,
        categories (
          name
        ),
        restaurants (
          name,
          address
        )
      `);
    
    // Add search filter
    if (searchTerm && searchTerm.trim() !== '') {
      query = query.ilike('name', `%${searchTerm.trim()}%`);
    }
    
    // Add category filter
    if (categoryName && categoryName !== '') {
      query = query.eq('categories.name', categoryName);
    }
    
    // Add country filter through restaurants and locations (if applicable)
    // This is a simplified approach - actual implementation depends on your data structure
    if (countryCode && countryCode !== '') {
      // For this example, assuming restaurants have a country field in their address
      query = query.ilike('restaurants.address', `%${countryCode}%`);
    }
    
    // Add sorting
    if (sortBy) {
      switch (sortBy) {
        case 'price_asc':
          query = query.order('price', { ascending: true });
          break;
        case 'price_desc':
          query = query.order('price', { ascending: false });
          break;
        case 'name_asc':
          query = query.order('name', { ascending: true });
          break;
        case 'name_desc':
          query = query.order('name', { ascending: false });
          break;
        default:
          query = query.order('created_at', { ascending: false });
      }
    } else {
      // Default sorting
      query = query.order('created_at', { ascending: false });
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching filtered products:', error);
      return [];
    }
    
    // Process and return the data
    return data || [];
  } catch (error) {
    console.error('Exception fetching filtered products:', error);
    return [];
  }
};

// Get a specific product by ID
export const getProductById = async (productId: string) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories (
          name
        ),
        restaurants (
          id,
          name,
          logo_url,
          address,
          phone
        )
      `)
      .eq('id', productId)
      .single();
    
    if (error) {
      console.error('Error fetching product details:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Exception fetching product details:', error);
    return null;
  }
};

// Get bestsellers (featured products)
export const getBestsellerProducts = async (limit = 4) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories (
          name
        ),
        restaurants (
          name
        )
      `)
      .eq('featured', true)
      .limit(limit);
    
    if (error) {
      console.error('Error fetching bestseller products:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Exception fetching bestseller products:', error);
    return [];
  }
};
