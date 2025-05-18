
import { Product } from '@/types';

// Product data
const allProducts: Product[] = [
  { 
    id: 'p1', 
    name: 'بيتزا مارغريتا', 
    price: '50 ST', 
    restaurant: 'بيتزا بلس', 
    imageUrl: '/lovable-uploads/photo-1618160702438-9b02ab6515c9.png',
    description: 'بيتزا إيطالية أصلية مع صلصة الطماطم والجبن الموزاريلا',
    category: 'بيتزا'
  },
  { 
    id: 'p2', 
    name: 'طبق شاورما دجاج', 
    price: '75 ST', 
    restaurant: 'مطعم الأصيل', 
    imageUrl: '/lovable-uploads/photo-1506744038136-46273834b3fb.png',
    description: 'شاورما دجاج طازجة مع صلصة الثوم والخضروات',
    category: 'شرقي'
  },
  { 
    id: 'p3', 
    name: 'سوشي سلمون رول', 
    price: '120 ST', 
    restaurant: 'سوشي تايم', 
    imageUrl: '/lovable-uploads/photo-1472396961693-142e6e269027.png',
    description: 'سوشي رول محشو بسمك السلمون الطازج والأفوكادو',
    category: 'آسيوي'
  },
  { 
    id: 'p4', 
    name: 'برجر لحم مشوي', 
    price: '85 ST', 
    restaurant: 'برجر فاكتوري', 
    imageUrl: '/lovable-uploads/photo-1469041797191-50ace28483c3.png',
    description: 'برجر لحم مشوي مع جبن شيدر وصلصة خاصة',
    category: 'برجر'
  },
  { 
    id: 'p5', 
    name: 'سلطة سيزر', 
    price: '45 ST', 
    restaurant: 'مطعم الأصيل', 
    imageUrl: '/lovable-uploads/photo-1582562124811-c09040d0a901.png',
    description: 'سلطة خضراء طازجة مع دجاج مشوي وصلصة سيزر',
    category: 'سلطات'
  },
  { 
    id: 'p6', 
    name: 'بيتزا خضروات', 
    price: '60 ST', 
    restaurant: 'بيتزا بلس', 
    imageUrl: '/lovable-uploads/photo-1618160702438-9b02ab6515c9.png',
    description: 'بيتزا مع تشكيلة من الخضروات الطازجة والجبن',
    category: 'بيتزا'
  },
  { 
    id: 'p7', 
    name: 'برجر دجاج مقرمش', 
    price: '65 ST', 
    restaurant: 'برجر فاكتوري', 
    imageUrl: '/lovable-uploads/photo-1469041797191-50ace28483c3.png',
    description: 'برجر دجاج مقرمش مع جبن وخس وطماطم',
    category: 'برجر'
  },
  { 
    id: 'p8', 
    name: 'مأكولات بحرية مشكلة', 
    price: '140 ST', 
    restaurant: 'مطعم الطازج', 
    imageUrl: '/lovable-uploads/photo-1582562124811-c09040d0a901.png',
    description: 'تشكيلة من المأكولات البحرية المشوية والمقلية',
    category: 'بحري'
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
