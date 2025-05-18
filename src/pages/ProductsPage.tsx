
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { ShoppingCart, Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface Product {
  id: string;
  name: string;
  price: string;
  restaurant: string;
  imageUrl: string;
  description: string;
  category: string;
}

const ProductsPage: React.FC = () => {
  // More product data with better images
  const allProducts: Product[] = [
    { 
      id: 'p1', 
      name: 'بيتزا مارغريتا', 
      price: '50 STC', 
      restaurant: 'بيتزا بلس', 
      imageUrl: '/lovable-uploads/photo-1618160702438-9b02ab6515c9.png',
      description: 'بيتزا إيطالية أصلية مع صلصة الطماطم والجبن الموزاريلا',
      category: 'بيتزا'
    },
    { 
      id: 'p2', 
      name: 'طبق شاورما دجاج', 
      price: '75 STC', 
      restaurant: 'مطعم الأصيل', 
      imageUrl: '/lovable-uploads/photo-1506744038136-46273834b3fb.png',
      description: 'شاورما دجاج طازجة مع صلصة الثوم والخضروات',
      category: 'شرقي'
    },
    { 
      id: 'p3', 
      name: 'سوشي سلمون رول', 
      price: '120 STC', 
      restaurant: 'سوشي تايم', 
      imageUrl: '/lovable-uploads/photo-1472396961693-142e6e269027.png',
      description: 'سوشي رول محشو بسمك السلمون الطازج والأفوكادو',
      category: 'آسيوي'
    },
    { 
      id: 'p4', 
      name: 'برجر لحم مشوي', 
      price: '85 STC', 
      restaurant: 'برجر فاكتوري', 
      imageUrl: '/lovable-uploads/photo-1469041797191-50ace28483c3.png',
      description: 'برجر لحم مشوي مع جبن شيدر وصلصة خاصة',
      category: 'برجر'
    },
    { 
      id: 'p5', 
      name: 'سلطة سيزر', 
      price: '45 STC', 
      restaurant: 'مطعم الأصيل', 
      imageUrl: '/lovable-uploads/photo-1582562124811-c09040d0a901.png',
      description: 'سلطة خضراء طازجة مع دجاج مشوي وصلصة سيزر',
      category: 'سلطات'
    },
    { 
      id: 'p6', 
      name: 'بيتزا خضروات', 
      price: '60 STC', 
      restaurant: 'بيتزا بلس', 
      imageUrl: '/lovable-uploads/photo-1618160702438-9b02ab6515c9.png',
      description: 'بيتزا مع تشكيلة من الخضروات الطازجة والجبن',
      category: 'بيتزا'
    },
    { 
      id: 'p7', 
      name: 'برجر دجاج مقرمش', 
      price: '65 STC', 
      restaurant: 'برجر فاكتوري', 
      imageUrl: '/lovable-uploads/photo-1469041797191-50ace28483c3.png',
      description: 'برجر دجاج مقرمش مع جبن وخس وطماطم',
      category: 'برجر'
    },
    { 
      id: 'p8', 
      name: 'مأكولات بحرية مشكلة', 
      price: '140 STC', 
      restaurant: 'مطعم الطازج', 
      imageUrl: '/lovable-uploads/photo-1582562124811-c09040d0a901.png',
      description: 'تشكيلة من المأكولات البحرية المشوية والمقلية',
      category: 'بحري'
    },
  ];

  const [products, setProducts] = useState<Product[]>(allProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Extract unique categories
  const categories = [...new Set(allProducts.map(p => p.category))];

  // Filter and sort products
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate loading delay for better UX
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
      
      setProducts(filtered);
      setIsLoading(false);
    }, 500);
  }, [searchTerm, selectedCategory, sortBy]);

  const handleAddToCart = (product: Product) => {
    toast.success(`تمت إضافة ${product.name} إلى سلة التسوق`);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSortBy('');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4 text-center">
            أشهى الأطباق والمنتجات
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
            اكتشف مجموعة متنوعة من الأطباق الشهية من أفضل المطاعم
          </p>

          {/* Search and filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input 
                  type="text"
                  placeholder="ابحث عن منتج أو مطعم..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
              
              <Button
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                فلترة وترتيب
                {isFiltersOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>

            {isFiltersOpen && (
              <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md mb-6 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      تصنيف المنتجات
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                    >
                      <option value="">جميع التصنيفات</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      الترتيب حسب
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                    >
                      <option value="">الافتراضي</option>
                      <option value="price-asc">السعر: من الأقل إلى الأعلى</option>
                      <option value="price-desc">السعر: من الأعلى إلى الأقل</option>
                      <option value="name-asc">الاسم: أبجدياً</option>
                    </select>
                  </div>
                  
                  <div className="flex items-end">
                    <Button 
                      onClick={handleClearFilters}
                      variant="outline"
                      className="w-full"
                    >
                      إعادة تعيين الفلاتر
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden animate-pulse">
                  <div className="w-full h-48 bg-gray-200 dark:bg-gray-700"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3 w-2/3"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/3"></div>
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Products grid */}
          {!isLoading && (
            <>
              {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-fade-in">
                  {products.map(product => (
                    <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-full h-48 object-cover"
                        loading="lazy"
                      />
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{product.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{product.description}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">من: {product.restaurant}</p>
                        <p className="text-lg font-bold text-yellow-800 dark:text-yellow-500 mb-4">{product.price}</p>
                        <Button 
                          className="w-full bg-yellow-800 hover:bg-yellow-900 text-white font-semibold flex items-center justify-center gap-2"
                          onClick={() => handleAddToCart(product)}
                        >
                          <ShoppingCart className="h-4 w-4" />
                          أضف للسلة
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                    لا توجد منتجات متطابقة مع بحثك
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    يرجى تعديل معايير البحث والمحاولة مرة أخرى
                  </p>
                  <Button onClick={handleClearFilters} className="bg-yellow-800 hover:bg-yellow-900 text-white">
                    عرض كل المنتجات
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;
