
import React from 'react';
import { useFormContext } from "react-hook-form";
import * as z from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from '@/contexts/LanguageContext';
import CountryPicker from '@/components/ui/country-picker';

interface FoodCategory {
  value: string;
  label: string;
}

interface FoodFormFieldsProps {
  foodCategories: FoodCategory[];
}

const FoodFormFields: React.FC<FoodFormFieldsProps> = ({ foodCategories }) => {
  const { control } = useFormContext();
  const { t } = useLanguage();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('dishNameLabel')}</FormLabel>
              <FormControl>
                <Input placeholder={t('dishNamePlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('categoryLabel')}</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
                dir={document.documentElement.dir === 'rtl' ? 'rtl' : 'ltr'}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t('categoryPlaceholder')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {foodCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="country"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('countryLabel') || 'الدولة'}</FormLabel>
            <FormControl>
              <CountryPicker 
                value={field.value} 
                onValueChange={field.onChange} 
                className="w-full"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('descriptionLabel')}</FormLabel>
            <FormControl>
              <Textarea 
                placeholder={t('descriptionPlaceholder')} 
                className="min-h-[100px]"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('priceLabel')}</FormLabel>
              <FormControl>
                <Input type="number" placeholder={t('pricePlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="preparationTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('prepTimeLabel')}</FormLabel>
              <FormControl>
                <Input type="number" placeholder={t('prepTimePlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="ingredients"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('ingredientsLabel')}</FormLabel>
            <FormControl>
              <Textarea 
                placeholder={t('ingredientsPlaceholder')}
                className="min-h-[100px]"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default FoodFormFields;
