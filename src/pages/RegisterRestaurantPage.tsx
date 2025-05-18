
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { 
  Form, 
  FormControl,
  FormField, 
  FormItem, 
  FormLabel, 
  FormDescription, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLanguage } from '@/contexts/LanguageContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Utensils, MapPin, Plus, Restaurant } from 'lucide-react';
import { motion } from 'framer-motion';

const RegisterRestaurantPage: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  
  // Define form schema for restaurant registration
  const formSchema = z.object({
    name: z.string().min(2, {
      message: t('restaurantNameRequired'),
    }),
    address: z.string().min(5, {
      message: t('addressRequired'),
    }),
    phone: z.string().min(8, {
      message: t('phoneRequired'),
    }),
    description: z.string().min(10, {
      message: t('descriptionRequired'),
    }),
    cuisine: z.string().min(2, {
      message: t('cuisineRequired'),
    }),
  });

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      phone: "",
      description: "",
      cuisine: "",
    },
  });
  
  // Handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    toast({
      title: t('submissionSuccess'),
      description: t('restaurantRegistered'),
    });
    console.log(values);
    setTimeout(() => {
      navigate('/add-food');
    }, 1500);
  };
  
  // Determine step content
  const getStepContent = () => {
    switch (step) {
      case 1:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-10">{t('chooseBusinessType')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`p-8 rounded-lg flex flex-col items-center cursor-pointer border-2 transition-all ${
                  selectedType === 'restaurant' 
                  ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-yellow-300'
                }`}
                onClick={() => setSelectedType('restaurant')}
              >
                <Restaurant className="h-16 w-16 mb-4 text-yellow-600 dark:text-yellow-500" />
                <h3 className="text-xl font-semibold">{t('restaurant')}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{t('restaurantDesc')}</p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`p-8 rounded-lg flex flex-col items-center cursor-pointer border-2 transition-all ${
                  selectedType === 'food' 
                  ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-teal-300'
                }`}
                onClick={() => setSelectedType('food')}
              >
                <Utensils className="h-16 w-16 mb-4 text-teal-600 dark:text-teal-500" />
                <h3 className="text-xl font-semibold">{t('foodItems')}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{t('foodItemsDesc')}</p>
              </motion.div>
            </div>
            
            <Button
              onClick={() => setStep(2)}
              disabled={!selectedType}
              className="mt-10 bg-gradient-to-r from-yellow-600 to-yellow-800 hover:from-yellow-700 hover:to-yellow-900 text-white py-2 px-8 rounded-lg transition-all duration-300 disabled:opacity-50"
            >
              {t('next')}
            </Button>
          </motion.div>
        );
      case 2:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <Button 
                variant="outline" 
                onClick={() => setStep(1)}
                className="border-yellow-500 text-yellow-600"
              >
                {t('back')}
              </Button>
              <h2 className="text-2xl font-bold">
                {selectedType === 'restaurant' ? t('registerRestaurant') : t('addFoodItem')}
              </h2>
              <div className="w-20"></div> {/* Spacer for alignment */}
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {selectedType === 'restaurant' && (
                  <>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Restaurant className="w-4 h-4 mr-2" />
                            {t('restaurantName')}
                          </FormLabel>
                          <FormControl>
                            <Input placeholder={t('restaurantNamePlaceholder')} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            {t('address')}
                          </FormLabel>
                          <FormControl>
                            <Input placeholder={t('addressPlaceholder')} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('phone')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('phonePlaceholder')} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('description')}</FormLabel>
                          <FormControl>
                            <textarea 
                              className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                              placeholder={t('descriptionPlaceholder')} 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cuisine"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('cuisine')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('cuisinePlaceholder')} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {selectedType === 'food' && (
                  <div className="p-6 text-center">
                    <div className="flex justify-center mb-6">
                      <Utensils className="h-16 w-16 text-yellow-600 dark:text-yellow-500" />
                    </div>
                    <p className="mb-6">{t('redirectToAddFood')}</p>
                    <Button 
                      type="button"
                      onClick={() => navigate('/add-food')}
                      className="bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 text-white"
                    >
                      <Plus className="mr-2 h-4 w-4" /> {t('goToAddFood')}
                    </Button>
                  </div>
                )}

                {selectedType === 'restaurant' && (
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-yellow-600 to-yellow-800 hover:from-yellow-700 hover:to-yellow-900 text-white py-3 rounded-lg transition-all duration-300"
                  >
                    {t('register')}
                  </Button>
                )}
              </form>
            </Form>
          </motion.div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="flex-grow">
        <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-10 relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-300 dark:bg-yellow-800 rounded-full -mr-16 -mt-16 opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-300 dark:bg-teal-800 rounded-full -ml-12 -mb-12 opacity-20"></div>
            
            {/* Progress indicator */}
            <div className="mb-10">
              <div className="flex items-center justify-between max-w-xs mx-auto">
                <div className={`h-3 w-3 rounded-full ${step >= 1 ? 'bg-yellow-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                <div className={`h-1 flex-grow ${step >= 2 ? 'bg-yellow-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                <div className={`h-3 w-3 rounded-full ${step >= 2 ? 'bg-yellow-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
              </div>
            </div>
            
            {getStepContent()}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterRestaurantPage;
