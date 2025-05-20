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
import { useLanguage } from '@/contexts/LanguageContext';
import { useSelectedCountry } from '@/components/header/HeaderActionButtons';
import { countries } from '@/components/ui/country-data';
import { CountryDisplay } from '@/components/ui/country-display';

// Mock featured restaurants data with country codes
const allFeaturedRestaurants: (Restaurant & { country: string })[] = [
  {
    id: '1',
    name: 'مطعم الأصيل',
    cuisine: 'مأكولات شرقية, مشويات',
    rating: 4.8,
    deliveryTime: '20-30 دقيقة',
    imageUrl: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&w=800',
    isNew: true,
    description: 'تخصص في المأكولات الشرقية التقليدية والمشويات الطازجة',
    country: 'sa'
  },
  {
    id: '5',
    name: 'مطعم الطازج',
    cuisine: 'بحري, مأكولات بحرية',
    rating: 4.6,
    deliveryTime: '30-50 دقيقة',
    imageUrl: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=800',
    isNew: true,
    description: 'أطباق بحرية طازجة يومياً مع توابل خاصة',
    country: 'eg'
  },
  {
    id: '2',
    name: 'بيتزا بلس',
    cuisine: 'بيتزا, إيطالي',
    rating: 4.2,
    deliveryTime: '30-40 دقيقة',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800',
    discount: '15%',
    description: 'بيتزا إيطالية أصلية بعجينة طازجة وخبز في الفرن الحجري',
    country: 'ae'
  },
  {
    id: '3',
    name: 'سوشي توكيو',
    cuisine: 'ياباني, سوشي',
    rating: 4.7,
    deliveryTime: '35-45 دقيقة',
    imageUrl: 'https://images.unsplash.com/photo-1589840700256-699f5e431e2e?auto=format&fit=crop&w=800',
    isNew: true,
    description: 'أطباق سوشي فاخرة محضرة من قبل طهاة يابانيين محترفين',
    country: 'kw'
  },
  {
    id: '4',
    name: 'برجر فاكتوري',
    cuisine: 'أمريكي, برجر',
    rating: 4.5,
    deliveryTime: '20-30 دقيقة',
    imageUrl: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=800',
    discount: '10%',
    description: 'برجر لحم بقري فاخر طازج 100% مع صلصات خاصة وخبز محضر يومياً',
    country: 'qa'
  },
];

const RestaurantsPage: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();
  const { selectedCountry: globalSelectedCountry } = useSelectedCountry();
  const [featuredRestaurants, setFeaturedRestaurants] = useState<(Restaurant & { country: string })[]>([]);

  useEffect(() => {
    // تأخير ظهور العناصر لإضافة تأثير حركي
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Filter featured restaurants based on selected country
  useEffect(() => {
    if (globalSelectedCountry) {
      setFeaturedRestaurants(allFeaturedRestaurants.filter(r => r.country === globalSelectedCountry));
    } else {
      setFeaturedRestaurants(allFeaturedRestaurants);
    }
  }, [globalSelectedCountry]);

  const handleFeaturedClick = (id: string) => {
    navigate(`/products?restaurant=${id}`);
  };

  // Get country name for display
  const selectedCountryData = globalSelectedCountry ? 
    countries.find(c => c.code === globalSelectedCountry) : null;

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
              {selectedCountryData ? (
                <>
                  <span className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-4xl">{selectedCountryData.flagEmoji}</span>
                    <span>{t('restaurantsInCountry') || 'مطاعم في'} {selectedCountryData.nameAr || selectedCountryData.name}</span>
                  </span>
                </>
              ) : (
                <>
                  {t('restaurantsPageTitlePart1')}{' '}
                  <span className="text-yellow-800 dark:text-yellow-500">{t('restaurantsPageTitlePart2')}</span>
                </>
              )}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 text-lg">
              {selectedCountryData ? 
                (t('countryRestaurantsSubtitle') || 'اكتشف أفضل المطاعم والوجبات اللذيذة في') + ' ' + selectedCountryData.nameAr : 
                t('restaurantsPageSubtitle')}
            </p>
          </div>
        </section>

        {/* قسم المطاعم المميزة */}
        {featuredRestaurants.length > 0 && (
          <section className={`mb-16 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {t('featuredRestaurantsTitle')}
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <span>{t('swipeForMore')}</span>
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
                                <span className="absolute top-2 right-2 rtl:right-2 rtl:left-auto ltr:left-auto ltr:right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                                  {t('new')}
                                </span>
                              )}
                              {restaurant.discount && (
                                <span className="absolute top-2 left-2 rtl:left-2 rtl:right-auto ltr:right-auto ltr:left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                  {t('discount')} {restaurant.discount}
                                </span>
                              )}
                              {/* Show country flag */}
                              <span className="absolute bottom-2 right-2 rtl:right-2 rtl:left-auto ltr:left-auto ltr:right-2 bg-white/80 dark:bg-gray-800/80 p-1 rounded-full">
                                {restaurant.country && (
                                  <span className="text-lg" title={countries.find(c => c.code === restaurant.country)?.name}>
                                    {countries.find(c => c.code === restaurant.country)?.flagEmoji}
                                  </span>
                                )}
                              </span>
                            </div>
                            <div className="p-5 flex-grow flex flex-col">
                              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">{restaurant.name}</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{restaurant.cuisine}</p>
                              <div className="mt-auto flex items-center justify-between">
                                <div className="flex items-center text-yellow-500">
                                  <Star className="h-4 w-4 fill-current" />
                                  <span className="text-sm ml-1 rtl:ml-0 rtl:mr-1">{restaurant.rating}</span>
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
                  <CarouselPrevious className="left-0 rtl:right-0 rtl:left-auto" />
                  <CarouselNext className="right-0 rtl:left-0 rtl:right-auto" />
                </div>
              </Carousel>
            </div>
          </section>
        )}

        {/* قسم إحصائيات المطعم */}
        <section className={`mb-16 py-10 bg-yellow-50 dark:bg-gray-800/50 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-3">
                  <Coffee className="h-8 w-8 text-yellow-800 dark:text-yellow-500" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white">{t('statsVal1')}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t('statsSectionTitle1')}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-3">
                  <Star className="h-8 w-8 text-yellow-800 dark:text-yellow-500" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white">{t('statsVal2')}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t('statsSectionTitle2')}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-3">
                  <MapPin className="h-8 w-8 text-yellow-800 dark:text-yellow-500" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white">{t('statsVal3')}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t('statsSectionTitle3')}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-3">
                  <Coffee className="h-8 w-8 text-yellow-800 dark:text-yellow-500" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white">{t('statsVal4')}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t('statsSectionTitle4')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* قسم جميع المطاعم */}
        <section className={`mb-16 transition-all duration-1000 transform delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                {globalSelectedCountry ? (
                  <span className="flex items-center justify-center gap-2">
                    <CountryDisplay 
                      country={countries.find(c => c.code === globalSelectedCountry)} 
                      showName={true} 
                    />
                  </span>
                ) : (
                  <>
                    {t('allRestaurantsSectionTitlePart1')}{' '}
                    <span className="text-yellow-800 dark:text-yellow-500">{t('allRestaurantsSectionTitlePart2')}</span>
                  </>
                )}
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
