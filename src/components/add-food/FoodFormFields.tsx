
import React from 'react';
import { useFormContext, Controller } from "react-hook-form";
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

interface FoodCategory {
  value: string;
  label: string;
}

interface FoodFormFieldsProps {
  foodCategories: FoodCategory[];
  // Zod schema type is complex to pass directly if not inferred,
  // react-hook-form's control object is sufficient.
  // We assume the schema fields (name, category etc.) exist on the form.
}

const FoodFormFields: React.FC<FoodFormFieldsProps> = ({ foodCategories }) => {
  const { control } = useFormContext(); // Use useFormContext to get control

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>اسم الطبق</FormLabel>
              <FormControl>
                <Input placeholder="مثال: كبسة دجاج منزلية" {...field} />
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
              <FormLabel>التصنيف</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر تصنيف الطبق" />
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
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>وصف الطبق</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="اشرح طبقك بشكل مفصل، وما يميزه عن غيره..." 
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
              <FormLabel>السعر المقترح (ST)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="35" {...field} />
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
              <FormLabel>وقت التحضير (بالدقائق)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="45" {...field} />
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
            <FormLabel>المكونات</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="اذكر المكونات مفصولة بفواصل..."
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
