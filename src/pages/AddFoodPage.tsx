
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form"; // Import FormProvider
import * as z from "zod";
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Utensils, ChevronLeft } from "lucide-react";
import { Form } from "@/components/ui/form"; // Form component from shadcn/ui
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Import new components
import FoodFormFields from '@/components/add-food/FoodFormFields';
import ImageUploadArea from '@/components/add-food/ImageUploadArea';
import SideInfoPanel from '@/components/add-food/SideInfoPanel';

// تعريف نموذج التحقق باستخدام Zod - يبقى كما هو
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

// أنواع الطعام - تبقى كما هي
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

// صور توضيحية للمطبخ المنزلي - تبقى كما هي
const kitchenGalleryImages = [
  "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=500&auto=format",
  "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=500&auto=format",
  "https://images.unsplash.com/photo-1556911261-6bd341186b2f?w=500&auto=format",
  "https://images.unsplash.com/photo-1590675396922-40db3af5a378?w=500&auto=format",
  "https://images.unsplash.com/photo-1605522469906-3fe226b356bc?w=500&auto=format",
  "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=500&auto=format",
];

// قصص نجاح - تبقى كما هي
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

  const methods = useForm<z.infer<typeof foodFormSchema>>({ // Renamed form to methods for FormProvider
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

  function onSubmit(data: z.infer<typeof foodFormSchema>) {
    console.log("Form data:", data);
    console.log("Selected image:", selectedImage);
    toast.success("تم إضافة الطبق بنجاح! سيتم مراجعته قريباً.");
    setTimeout(() => {
      navigate('/rewards');
    }, 1500);
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    // Reset file input if needed, though it's hidden and controlled by label click
    const fileInput = document.getElementById('dropzone-file') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <Header />
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
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
            <div className="lg:col-span-2 order-2 lg:order-1">
              <Card className="shadow-md">
                <CardContent className="pt-6">
                  <FormProvider {...methods}> {/* Use FormProvider */}
                    <Form {...methods}> {/* Pass methods to Form for consistency if it uses context internally or for future use */}
                      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
                        <FoodFormFields foodCategories={foodCategories} />
                        <ImageUploadArea 
                          imagePreview={imagePreview}
                          handleImageChange={handleImageChange}
                          onDeleteImage={handleDeleteImage}
                        />
                        <Button 
                          type="submit" 
                          className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 py-6 text-lg shadow-md hover:shadow-lg transform transition-all hover:-translate-y-0.5 duration-200"
                        >
                          <Utensils className="mr-2 h-5 w-5" />
                          إضافة الطبق
                        </Button>
                      </form>
                    </Form>
                  </FormProvider>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1 order-1 lg:order-2">
              <SideInfoPanel 
                successStories={successStories}
                kitchenGalleryImages={kitchenGalleryImages}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AddFoodPage;
