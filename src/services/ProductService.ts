
import { Product } from '@/types';

// Product data with enhanced information
const allProducts: Product[] = [
  { 
    id: 'p1', 
    name: 'بيتزا مارغريتا', 
    price: '50 ST', 
    oldPrice: '65 ST',
    restaurant: 'بيتزا بلس', 
    imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800',
    description: 'بيتزا إيطالية أصلية مع صلصة الطماطم والجبن الموزاريلا وقاعدة من العجين المخمر',
    category: 'بيتزا',
    rating: 4.7,
    discountPercent: 25,
    bestseller: true
  },
  { 
    id: 'p2', 
    name: 'طبق شاورما دجاج', 
    price: '75 ST', 
    restaurant: 'مطعم الأصيل', 
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800',
    description: 'شاورما دجاج طازجة مع صلصة الثوم والخضروات وبطاطس مقلية',
    category: 'شرقي',
    rating: 4.5,
    isFavorite: true
  },
  { 
    id: 'p3', 
    name: 'سوشي سلمون رول', 
    price: '120 ST', 
    restaurant: 'سوشي تايم', 
    imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800',
    description: 'سوشي رول محشو بسمك السلمون الطازج والأفوكادو مع صلصة سوشي خاصة',
    category: 'آسيوي',
    rating: 4.9,
    isNew: true,
    bestseller: true
  },
  { 
    id: 'p4', 
    name: 'برجر لحم مشوي', 
    price: '85 ST', 
    oldPrice: '100 ST',
    restaurant: 'برجر فاكتوري', 
    imageUrl: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&w=800',
    description: 'برجر لحم مشوي مع جبن شيدر وصلصة خاصة وخضروات طازجة',
    category: 'برجر',
    rating: 4.3,
    discountPercent: 15
  },
  { 
    id: 'p5', 
    name: 'سلطة سيزر', 
    price: '45 ST', 
    restaurant: 'مطعم الأصيل', 
    imageUrl: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800',
    description: 'سلطة خضراء طازجة مع دجاج مشوي وصلصة سيزر وقطع من الخبز المحمص',
    category: 'سلطات',
    rating: 4.2
  },
  { 
    id: 'p6', 
    name: 'بيتزا خضروات', 
    price: '60 ST', 
    restaurant: 'بيتزا بلس', 
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800',
    description: 'بيتزا مع تشكيلة من الخضروات الطازجة والجبن والفطر وصلصة طماطم طازجة',
    category: 'بيتزا',
    rating: 4.4,
    isNew: true
  },
  { 
    id: 'p7', 
    name: 'برجر دجاج مقرمش', 
    price: '65 ST', 
    restaurant: 'برجر فاكتوري', 
    imageUrl: 'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?auto=format&fit=crop&w=800',
    description: 'برجر دجاج مقرمش مع جبن وخس وطماطم وصلصة خاصة',
    category: 'برجر',
    rating: 4.6,
    bestseller: true,
    isFavorite: true
  },
  { 
    id: 'p8', 
    name: 'مأكولات بحرية مشكلة', 
    price: '140 ST', 
    oldPrice: '160 ST',
    restaurant: 'مطعم الطازج', 
    imageUrl: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&w=800',
    description: 'تشكيلة من المأكولات البحرية المشوية والمقلية مع صلصة طرطار وليمون',
    category: 'بحري',
    rating: 4.8,
    discountPercent: 12.5
  },
];

export const getCategories = (): string[] => {
  return [...new Set(allProducts.map(p => p.category))];
};

export const getFilteredProducts = (
  searchTerm: string,
  selectedCategory: string,
  sortBy: string
): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = allProducts;
      
      // Apply search filter
      if (searchTerm) {
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.restaurant.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      // Apply category filter
      if (selectedCategory) {
        filtered = filtered.filter(p => p.category === selectedCategory);
      }
      
      // Apply sorting
      if (sortBy) {
        if (sortBy === 'price-asc') {
          filtered = [...filtered].sort((a, b) => 
            parseInt(a.price) - parseInt(b.price)
          );
        } else if (sortBy === 'price-desc') {
          filtered = [...filtered].sort((a, b) => 
            parseInt(b.price) - parseInt(a.price)
          );
        } else if (sortBy === 'name-asc') {
          filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === 'rating-desc') {
          filtered = [...filtered].sort((a, b) => 
            (b.rating || 0) - (a.rating || 0)
          );
        } else if (sortBy === 'newest') {
          filtered = [...filtered].sort((a, b) => 
            (a.isNew ? 1 : 0) - (b.isNew ? 1 : 0)
          );
        }
      }
      
      resolve(filtered);
    }, 500); // Simulate API delay
  });
};

export default {
  getCategories,
  getFilteredProducts,
};
