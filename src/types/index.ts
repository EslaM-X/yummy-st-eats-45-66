
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
}
