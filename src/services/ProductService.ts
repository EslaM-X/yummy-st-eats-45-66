
import { Product } from '@/types';

// Product data with enhanced information
const allProducts: Product[] = [
  { 
    id: 'p1', 
    name: 'بيتزا مارغريتا', 
    price: '50 ST', 
    oldPrice: '65 ST',
    restaurant: 'بيتزا بلس', 
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800',
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
    imageUrl: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=800',
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
    imageUrl: 'https://images.unsplash.com/photo-1563612116625-3012372fccce?auto=format&fit=crop&w=800',
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
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800',
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
    imageUrl: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=800',
    description: 'سلطة خضراء طازجة مع دجاج مشوي وصلصة سيزر وقطع من الخبز المحمص',
    category: 'سلطات',
    rating: 4.2
  },
  { 
    id: 'p6', 
    name: 'بيتزا خضروات', 
    price: '60 ST', 
    restaurant: 'بيتزا بلس', 
    imageUrl: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=800',
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
    imageUrl: 'https://images.unsplash.com/photo-1585039261108-7e392c576b06?auto=format&fit=crop&w=800',
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
    imageUrl: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=800',
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
