
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
  // إضافة الخصائص الناقصة
  isFavorite?: boolean;
  country?: string;
  bestseller?: boolean;
  isNew?: boolean;
  rating?: number;
  oldPrice?: string;
}

// واجهة للمطعم
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
  country?: string;
}

// واجهات للمكافآت
export interface RewardTier {
  id: string;
  name: string;
  pointsRequired: number;
  benefits: string[];
  icon: string;
}

export interface UserPoints {
  total: number;
  history: PointTransaction[];
  tier: RewardTier;
}

export interface PointTransaction {
  id: string;
  date: string;
  points: number;
  type: 'earned' | 'redeemed';
  description: string;
}

export interface UserReward {
  id: string;
  name: string;
  points: number;
  description: string;
  imageUrl: string;
  expiryDate: string;
  type: string;
}

