
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Utensils, Camera, UploadCloud, ChevronLeft } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// تعريف نموذج التحقق باستخدام Zod
const foodFormSchema = z.object({
  name: z.string().min(3, {
    message: "يجب أن يكون اسم الطبق 3 أحرف على الأقل",
  }),
  description: z.string().min(10, {
    message: "يجب أن يكون الوصف 10 أحرف على الأقل",
  }),
  category: z.string({
    required_error: "يرجى اختيار تصنيف",
  }),
  price: z.string().min(1, {
    message: "يرجى إدخال السعر",
  }),
  preparationTime: z.string().min(1, {
    message: "يرجى إدخال وقت التحضير",
  }),
  ingredients: z.string().min(5, {
    message: "يرجى إدخال المكونات (5 أحرف على الأقل)",
  }),
});

// أنواع الطعام
const foodCategories = [
  { value: "main", label: "أطباق رئيسية" },
  { value: "appetizer", label: "مقبلات" },
  { value: "dessert", label: "حلويات" },
  { value: "drink", label: "مشروبات" },
  { value: "side", label: "أطباق جانبية" },
  { value: "breakfast", label: "إفطار" },
  { value: "healthy", label: "أطعمة صحية" },
  { value: "fast-food", label: "وجبات سريعة" },
];

// صور توضيحية للمطبخ المنزلي
const kitchenGalleryImages = [
  "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=500&auto=format",
  "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=500&auto=format",
  "https://images.unsplash.com/photo-1556911261-6bd341186b2f?w=500&auto=format",
  "https://images.unsplash.com/photo-1590675396922-40db3af5a378?w=500&auto=format",
  "https://images.unsplash.com/photo-1605522469906-3fe226b356bc?w=500&auto=format",
  "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=500&auto=format",
];

const successStories = [
  {
    name: "سارة الأحمد",
    specialty: "الحلويات الشرقية",
    story: "بدأت بمشاركة كنافة منزلية، والآن لدي متجر صغير للحلويات الشرقية بفضل التقييمات الإيجابية!",
    image: "https://images.unsplash.com/photo-1512485694207-bde7c9357293?w=150&auto=format"
  },
  {
    name: "محمد العلي",
    specialty: "المأكولات البحرية",
    story: "طبق السمك المشوي الخاص بي أصبح مشهوراً في المنطقة بعد مشاركته على المنصة.",
    image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=150&auto=format"
  },
  {
    name: "فاطمة الزهراني",
    specialty: "المعجنات",
    story: "من مطبخي المنزلي إلى مورّد معتمد للمقاهي المحلية. شكراً ST Eat!",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format"
  }
];

const AddFoodPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);

  // إعداد نموذج React Hook Form مع التحقق من Zod
  const form = useForm<z.infer<typeof foodFormSchema>>({
    resolver: zodResolver(foodFormSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      price: "",
      preparationTime: "",
      ingredients: "",
    },
  });

  // معالجة إرسال النموذج
  function onSubmit(data: z.infer<typeof foodFormSchema>) {
    // هنا سيتم التعامل مع البيانات المرسلة (في التطبيق الواقعي، سيتم إرسالها إلى الخادم)
    console.log("Form data:", data);
    console.log("Selected image:", selectedImage);
    
    // عرض رسالة نجاح
    toast.success("تم إضافة الطبق بنجاح! سيتم مراجعته قريباً.");
    
    // الانتقال إلى صفحة المكافآت
    setTimeout(() => {
      navigate('/rewards');
    }, 1500);
  }

  // معالجة اختيار الصورة
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      
      // إنشاء معاينة للصورة
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <Header />
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <Button 
              variant="ghost" 
              className="mb-4" 
              onClick={() => navigate(-1)}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              العودة
            </Button>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4 relative inline-block">
              <span className="relative z-10">أضف طعامك الخاص</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-yellow-300/30 dark:bg-yellow-800/30 -z-0 transform -rotate-1"></span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              شارك أطباقك المنزلية المميزة مع مجتمعنا واكسب النقاط. فرصتك لعرض مهاراتك الطهوية!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* نموذج إضافة الطعام */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <Card className="shadow-md">
                <CardContent className="pt-6">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
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
                          control={form.control}
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
                        control={form.control}
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
                          control={form.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>السعر المقترح (ر.س)</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="35" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
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
                        control={form.control}
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

                      <div className="space-y-3">
                        <FormLabel>صورة الطبق</FormLabel>
                        <div className="flex flex-col items-center justify-center w-full">
                          <label 
                            htmlFor="dropzone-file" 
                            className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer
                              ${imagePreview ? 'border-yellow-300 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/10' : 'border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700/30'}`}
                          >
                            {imagePreview ? (
                              <div className="relative w-full h-full">
                                <img 
                                  src={imagePreview} 
                                  alt="معاينة الطبق"
                                  className="w-full h-full object-contain p-4" 
                                />
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  className="absolute top-2 right-2"
                                  onClick={() => {
                                    setSelectedImage(null);
                                    setImagePreview(null);
                                  }}
                                >
                                  حذف
                                </Button>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <UploadCloud className="w-10 h-10 mb-3 text-gray-400" />
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                  <span className="font-semibold">اضغط للاختيار</span> أو اسحب وأفلت
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG أو WEBP (الحد الأقصى 5 MB)</p>
                              </div>
                            )}
                            <input 
                              id="dropzone-file" 
                              type="file" 
                              className="hidden" 
                              accept="image/*"
                              onChange={handleImageChange}
                            />
                          </label>
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 py-6 text-lg"
                      >
                        <Utensils className="mr-2 h-5 w-5" />
                        إضافة الطبق
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            {/* معلومات جانبية */}
            <div className="lg:col-span-1 order-1 lg:order-2">
              <div className="sticky top-24">
                <Tabs defaultValue="tips" className="mb-8">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="tips">نصائح</TabsTrigger>
                    <TabsTrigger value="success">قصص نجاح</TabsTrigger>
                  </TabsList>
                  <TabsContent value="tips" className="mt-4 space-y-4">
                    <Card>
                      <CardContent className="pt-6">
                        <h3 className="font-bold text-lg mb-3 flex items-center text-yellow-800 dark:text-yellow-500">
                          <Camera className="h-5 w-5 mr-2" />
                          التقط صورة احترافية
                        </h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <span className="text-yellow-600 dark:text-yellow-500 mr-2">•</span> 
                            استخدم إضاءة طبيعية واضحة
                          </li>
                          <li className="flex items-start">
                            <span className="text-yellow-600 dark:text-yellow-500 mr-2">•</span> 
                            صور الطبق من زاوية جذابة
                          </li>
                          <li className="flex items-start">
                            <span className="text-yellow-600 dark:text-yellow-500 mr-2">•</span> 
                            أضف بعض العناصر المزخرفة حول الطبق
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="pt-6">
                        <h3 className="font-bold text-lg mb-3 flex items-center text-yellow-800 dark:text-yellow-500">
                          <Utensils className="h-5 w-5 mr-2" />
                          وصف الطبق باحترافية
                        </h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <span className="text-yellow-600 dark:text-yellow-500 mr-2">•</span> 
                            استخدم كلمات وصفية للنكهات والقوام
                          </li>
                          <li className="flex items-start">
                            <span className="text-yellow-600 dark:text-yellow-500 mr-2">•</span> 
                            اذكر ما يميز طبقك عن الآخرين
                          </li>
                          <li className="flex items-start">
                            <span className="text-yellow-600 dark:text-yellow-500 mr-2">•</span> 
                            شارك قصة الوصفة إن كانت لها قصة خاصة
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="pt-6">
                        <h3 className="font-bold text-lg mb-3 text-yellow-800 dark:text-yellow-500">
                          الفوائد التي ستحصل عليها
                        </h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <span className="text-yellow-600 dark:text-yellow-500 mr-2">•</span> 
                            50 نقطة مكافأة فورية
                          </li>
                          <li className="flex items-start">
                            <span className="text-yellow-600 dark:text-yellow-500 mr-2">•</span> 
                            عرض منتجك لآلاف المستخدمين
                          </li>
                          <li className="flex items-start">
                            <span className="text-yellow-600 dark:text-yellow-500 mr-2">•</span> 
                            فرصة لبدء مشروعك الخاص
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="success" className="mt-4 space-y-4">
                    {successStories.map((story, index) => (
                      <Card key={index}>
                        <CardContent className="pt-6">
                          <div className="flex items-center mb-3">
                            <img 
                              src={story.image} 
                              alt={story.name} 
                              className="w-12 h-12 rounded-full object-cover" 
                            />
                            <div className="mr-3">
                              <h3 className="font-bold">{story.name}</h3>
                              <p className="text-sm text-yellow-600 dark:text-yellow-400">{story.specialty}</p>
                            </div>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">"{story.story}"</p>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                </Tabs>

                <div className="grid grid-cols-2 gap-2">
                  {kitchenGalleryImages.slice(0, 4).map((image, index) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden">
                      <img 
                        src={image} 
                        alt={`مثال توضيحي ${index + 1}`} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AddFoodPage;
