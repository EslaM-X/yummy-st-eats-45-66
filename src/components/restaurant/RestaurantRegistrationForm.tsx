
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Form, 
  FormControl,
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLanguage } from '@/contexts/LanguageContext';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Store, MapPin, Plus, Utensils } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface RegistrationFormProps {
  selectedType: string;
  onBack: () => void;
}

const RestaurantRegistrationForm: React.FC<RegistrationFormProps> = ({ 
  selectedType, 
  onBack 
}) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

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

  if (selectedType === 'food') {
    return (
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
    );
  }

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
          onClick={onBack}
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
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <Store className="w-4 h-4 mr-2" />
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
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-yellow-600 to-yellow-800 hover:from-yellow-700 hover:to-yellow-900 text-white py-3 rounded-lg transition-all duration-300"
          >
            {t('register')}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
};

export default RestaurantRegistrationForm;
