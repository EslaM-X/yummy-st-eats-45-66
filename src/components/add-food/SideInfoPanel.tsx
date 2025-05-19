
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Utensils } from "lucide-react";

interface SuccessStory {
  name: string;
  specialty: string;
  story: string;
  image: string;
}

interface SideInfoPanelProps {
  successStories: SuccessStory[];
  kitchenGalleryImages: string[];
}

const SideInfoPanel: React.FC<SideInfoPanelProps> = ({ successStories, kitchenGalleryImages }) => {
  return (
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
  );
};

export default SideInfoPanel;
