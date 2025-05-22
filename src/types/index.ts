// واجهة للمنتج
export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl: string;
  restaurant: string;
  category: string;
  isAvailable?: boolean;
  isFeatured?: boolean;
  discountPercentage?: number;
  ingredients?: string[];
}
