
export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  discount_price?: number;
  image?: string;
  category_id?: string;
  restaurant_id?: string;
  available?: boolean;
  featured?: boolean;
  ingredients?: string[];
  nutritional_info?: Record<string, any>;
  preparation_time?: number;
  created_at?: string;
  updated_at?: string;
}
