
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RestaurantList from '@/components/RestaurantList';
import { Restaurant } from '@/types';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { Coffee, Star, MapPin } from 'lucide-react';

// Mock featured restaurants data
const featuredRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'مطعم الأصيل',
    cuisine: 'مأكولات شرقية, مشويات',
    rating: 4.8,
    deliveryTime: '20-30 دقيقة',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800',
    isNew: true,
    description: 'تخصص في المأكولات الشرقية التقليدية والمشويات الطازجة'
  },
  {
    id: '5',
    name: 'مطعم الطازج',
    cuisine: 'بحري, مأكولات بحرية',
    rating: 4.6,
    deliveryTime: '30-50 دقيقة',
    imageUrl: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800',
    isNew: true,
    description: 'أطباق بحرية طازجة يومياً مع توابل خاصة'
  },
  {
    id: '2',
    name: 'بيتزا بلس',
    cuisine: 'بيتزا, إيطالي',
    rating: 4.2,
    deliveryTime: '30-40 دقيقة',
    imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800',
    discount: '15%',
    description: 'بيتزا إيطالية أصلية بعجينة طازجة وخبز في الفرن الحجري'
  },
];

const RestaurantsPage: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // تأخير ظهور العناصر لإضافة تأثير حركي
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const handleFeaturedClick = (id: string) => {
    navigate(`/products?restaurant=${id}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="flex-grow">
        {/* قسم العنوان والمقدمة */}
        <section className={`py-12 px-4 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="container mx-auto text-center">
            <div className="inline-block p-2 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-4">
              <Coffee className="h-6 w-6 text-yellow-800 dark:text-yellow-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 animate-fade-in">
              استكشف أفضل <span className="text-yellow-800 dark:text-yellow-500">المطاعم</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 text-lg">
              اكتشف مجموعة متنوعة من المطاعم المتميزة التي تقدم أشهى الأكلات بجودة عالية وأسعار مناسبة
            </p>
          </div>
        </section>

        {/* قسم المطاعم المميزة */}
        <section className={`mb-16 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                المطاعم <span className="text-yellow-800 dark:text-yellow-500">المميزة</span>
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span>اسحب للمزيد</span>
                <div className="w-12 h-0.5 bg-gray-300 dark:bg-gray-700"></div>
              </div>
            </div>

            <Carousel className="w-full mx-auto">
              <CarouselContent className="-ml-2 md:-ml-4">
                {featuredRestaurants.map((restaurant) => (
                  <CarouselItem key={restaurant.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="h-full" onClick={() => handleFeaturedClick(restaurant.id)}>
                      <Card className="border-0 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full cursor-pointer bg-white dark:bg-gray-800">
                        <CardContent className="p-0 h-full flex flex-col">
                          <div className="relative overflow-hidden h-48">
                            <img 
                              src={restaurant.imageUrl} 
                              alt={restaurant.name} 
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                            />
                            {restaurant.isNew && (
                              <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                                جديد
                              </span>
                            )}
                            {restaurant.discount && (
                              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                خصم {restaurant.discount}
                              </span>
                            )}
                          </div>
                          <div className="p-5 flex-grow flex flex-col">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">{restaurant.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{restaurant.cuisine}</p>
                            <div className="mt-auto flex items-center justify-between">
                              <div className="flex items-center text-yellow-500">
                                <Star className="h-4 w-4 fill-current" />
                                <span className="text-sm ml-1">{restaurant.rating}</span>
                              </div>
                              <span className="text-sm text-gray-600 dark:text-gray-300">{restaurant.deliveryTime}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden md:block">
                <CarouselPrevious className="left-0" />
                <CarouselNext className="right-0" />
              </div>
            </Carousel>
          </div>
        </section>

        {/* قسم إحصائيات المطعم */}
        <section className={`mb-16 py-10 bg-yellow-50 dark:bg-gray-800/50 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-3">
                  <Coffee className="h-8 w-8 text-yellow-800 dark:text-yellow-500" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white">50+</h3>
                <p className="text-gray-600 dark:text-gray-400">مطعم متميز</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-3">
                  <Star className="h-8 w-8 text-yellow-800 dark:text-yellow-500" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white">4.8</h3>
                <p className="text-gray-600 dark:text-gray-400">متوسط التقييم</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-3">
                  <MapPin className="h-8 w-8 text-yellow-800 dark:text-yellow-500" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white">15+</h3>
                <p className="text-gray-600 dark:text-gray-400">منطقة توصيل</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-3">
                  <Coffee className="h-8 w-8 text-yellow-800 dark:text-yellow-500" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white">1000+</h3>
                <p className="text-gray-600 dark:text-gray-400">طعام متنوع</p>
              </div>
            </div>
          </div>
        </section>

        {/* قسم جميع المطاعم */}
        <section className={`mb-16 transition-all duration-1000 transform delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                استكشف <span className="text-yellow-800 dark:text-yellow-500">جميع المطاعم</span>
              </h2>
              <div className="w-24 h-1 bg-yellow-800 dark:bg-yellow-500 mx-auto"></div>
            </div>
            <RestaurantList />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default RestaurantsPage;
