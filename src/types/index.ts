
export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  imageUrl: string;
  isNew?: boolean;
  discount?: string;
  description?: string;
  location?: string;
  minOrderPrice?: number;
  topPicks?: Product[];
}

export interface Product {
  id: string;
  name: string;
  price: string;
  restaurant: string;
  imageUrl: string;
  description: string;
  category: string;
  rating?: number;
  bestseller?: boolean;
  discountPercent?: number;
  oldPrice?: string;
  isNew?: boolean;
  isFavorite?: boolean;
}
