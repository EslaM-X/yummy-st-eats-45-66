
import { Product } from '@/types';
import { countries } from '@/components/ui/country-picker';

// بيانات المنتجات المحسنة مع معلومات البلد
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
    bestseller: true,
    country: 'sa'
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
    isFavorite: true,
    country: 'ae'
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
    bestseller: true,
    country: 'kw'
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
    discountPercent: 15,
    country: 'qa'
  },
  { 
    id: 'p5', 
    name: 'سلطة سيزر', 
    price: '45 ST', 
    restaurant: 'مطعم الأصيل', 
    imageUrl: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=800',
    description: 'سلطة خضراء طازجة مع دجاج مشوي وصلصة سيزر وقطع من الخبز المحمص',
    category: 'سلطات',
    rating: 4.2,
    country: 'ae'
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
    isNew: true,
    country: 'sa'
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
    isFavorite: true,
    country: 'bh'
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
    discountPercent: 12.5,
    country: 'om'
  },
  // منتجات مصرية
  { 
    id: 'p9', 
    name: 'كشري مصري', 
    price: '35 ST', 
    restaurant: 'مطعم النيل', 
    imageUrl: 'https://images.unsplash.com/photo-1624370745825-3c9ea0dfadb7?auto=format&fit=crop&w=800',
    description: 'طبق كشري مصري أصيل مع العدس والأرز والمكرونة وصلصة طماطم حارة',
    category: 'مصري',
    rating: 4.9,
    bestseller: true,
    country: 'eg'
  },
  { 
    id: 'p10', 
    name: 'فلافل مصرية', 
    price: '25 ST', 
    restaurant: 'مطعم النيل', 
    imageUrl: 'https://images.unsplash.com/photo-1593001872095-7d5b3868e468?auto=format&fit=crop&w=800',
    description: 'فلافل مصرية تقليدية مقرمشة مع صلصة طحينة وخبز بلدي',
    category: 'مصري',
    rating: 4.7,
    country: 'eg'
  },
  // منتجات أردنية
  { 
    id: 'p11', 
    name: 'منسف أردني', 
    price: '95 ST', 
    restaurant: 'بيت الأردن', 
    imageUrl: 'https://images.unsplash.com/photo-1541518763669-27fef9b37428?auto=format&fit=crop&w=800',
    description: 'طبق المنسف الأردني التقليدي مع لحم الضأن واللبن واللوز والأرز',
    category: 'أردني',
    rating: 4.8,
    bestseller: true,
    country: 'jo'
  },
  { 
    id: 'p12', 
    name: 'مقلوبة فلسطينية', 
    price: '70 ST', 
    restaurant: 'بيت الأردن', 
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800',
    description: 'طبق المقلوبة التقليدي مع الدجاج والباذنجان والأرز والصنوبر',
    category: 'أردني',
    rating: 4.6,
    country: 'jo'
  },
  // منتجات أوروبية وأمريكية
  { 
    id: 'p13', 
    name: 'باستا كاربونارا', 
    price: '85 ST', 
    restaurant: 'إل إيطاليانو', 
    imageUrl: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=800',
    description: 'باستا إيطالية تقليدية مع صلصة كريمية وقطع من لحم البانشيتا المقدد والبارميزان',
    category: 'إيطالي',
    rating: 4.7,
    country: 'it'
  },
  { 
    id: 'p14', 
    name: 'كروسان فرنسي', 
    price: '15 ST', 
    restaurant: 'باريس كافيه', 
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800',
    description: 'كروسان فرنسي طازج محضر يومياً بالزبدة الفرنسية الأصلية',
    category: 'فرنسي',
    rating: 4.8,
    isNew: true,
    country: 'fr'
  },
  { 
    id: 'p15', 
    name: 'فطيرة تفاح أمريكية', 
    price: '45 ST', 
    restaurant: 'بيكري هاوس', 
    imageUrl: 'https://images.unsplash.com/photo-1535920527002-b35e96722eb9?auto=format&fit=crop&w=800',
    description: 'فطيرة تفاح محلية الصنع بالقرفة والسكر البني والتفاح الطازج',
    category: 'حلويات',
    rating: 4.6,
    country: 'us'
  },
  // منتجات آسيوية
  { 
    id: 'p16', 
    name: 'رامن ياباني', 
    price: '65 ST', 
    restaurant: 'طوكيو راميني', 
    imageUrl: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?auto=format&fit=crop&w=800',
    description: 'حساء رامن ياباني تقليدي بمرق العظام والنودلز والبيض واللحم',
    category: 'ياباني',
    rating: 4.9,
    bestseller: true,
    country: 'jp'
  },
  { 
    id: 'p17', 
    name: 'دجاج كونغ باو', 
    price: '75 ST', 
    restaurant: 'الصين الرائعة', 
    imageUrl: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800',
    description: 'طبق صيني حار من الدجاج مع الفلفل والخضروات والمكسرات',
    category: 'صيني',
    rating: 4.5,
    country: 'cn'
  },
  // منتجات من تركيا
  { 
    id: 'p18', 
    name: 'إسكندر كباب', 
    price: '95 ST', 
    restaurant: 'اسطنبول التركي', 
    imageUrl: 'https://images.unsplash.com/photo-1644364935906-792b2245a2c2?auto=format&fit=crop&w=800',
    description: 'كباب اسكندر التركي الشهير مع صلصة الطماطم والزبادي والخبز التركي',
    category: 'تركي',
    rating: 4.7,
    country: 'tr'
  },
  { 
    id: 'p19', 
    name: 'بقلاوة تركية', 
    price: '35 ST', 
    restaurant: 'حلويات السلطان', 
    imageUrl: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=800',
    description: 'حلوى البقلاوة التركية مع الفستق والعسل المحلي',
    category: 'حلويات',
    rating: 4.8,
    bestseller: true,
    country: 'tr'
  },
  // منتجات إفريقية
  { 
    id: 'p20', 
    name: 'كسكس مغربي', 
    price: '70 ST', 
    restaurant: 'مراكش الأصيل', 
    imageUrl: 'https://images.unsplash.com/photo-1574653853027-5382a3d23a15?auto=format&fit=crop&w=800',
    description: 'كسكس مغربي تقليدي محضر مع الخضروات واللحم والتوابل المغربية',
    category: 'مغربي',
    rating: 4.6,
    country: 'ma'
  },
];

export const getCategories = (): string[] => {
  return [...new Set(allProducts.map(p => p.category))];
};

export const getCountries = (): string[] => {
  return [...new Set(allProducts.map(p => p.country).filter(Boolean) as string[])];
};

export const getFilteredProducts = (
  searchTerm: string,
  selectedCategory: string,
  sortBy: string,
  selectedCountry?: string
): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = allProducts;
      
      // تطبيق فلتر البحث
      if (searchTerm) {
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.restaurant.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      // تطبيق فلتر التصنيف
      if (selectedCategory) {
        filtered = filtered.filter(p => p.category === selectedCategory);
      }

      // تطبيق فلتر الدولة
      if (selectedCountry) {
        filtered = filtered.filter(p => p.country === selectedCountry);
      }
      
      // تطبيق الترتيب
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
    }, 500); // محاكاة تأخير API
  });
};

export default {
  getCategories,
  getCountries,
  getFilteredProducts,
};
