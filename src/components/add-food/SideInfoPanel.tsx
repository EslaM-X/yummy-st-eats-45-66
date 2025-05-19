
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Utensils } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';

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
  const { t } = useLanguage();

  return (
    <div className="sticky top-24">
      <Tabs defaultValue="tips" className="mb-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tips">{t('tipsTab')}</TabsTrigger>
          <TabsTrigger value="success">{t('successStoriesTab')}</TabsTrigger>
        </TabsList>
        <TabsContent value="tips" className="mt-4 space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-bold text-lg mb-3 flex items-center text-yellow-800 dark:text-yellow-500">
                <Camera className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0" />
                {t('proPhotoTipTitle')}
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-yellow-600 dark:text-yellow-500 mx-2">•</span> 
                  {t('proPhotoTip1')}
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 dark:text-yellow-500 mx-2">•</span> 
                  {t('proPhotoTip2')}
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 dark:text-yellow-500 mx-2">•</span> 
                  {t('proPhotoTip3')}
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-bold text-lg mb-3 flex items-center text-yellow-800 dark:text-yellow-500">
                <Utensils className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0" />
                {t('proDescriptionTipTitle')}
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-yellow-600 dark:text-yellow-500 mx-2">•</span> 
                  {t('proDescriptionTip1')}
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 dark:text-yellow-500 mx-2">•</span> 
                  {t('proDescriptionTip2')}
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 dark:text-yellow-500 mx-2">•</span> 
                  {t('proDescriptionTip3')}
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-bold text-lg mb-3 text-yellow-800 dark:text-yellow-500">
                {t('benefitsTitle')}
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-yellow-600 dark:text-yellow-500 mx-2">•</span> 
                  {t('benefit1')}
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 dark:text-yellow-500 mx-2">•</span> 
                  {t('benefit2')}
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 dark:text-yellow-500 mx-2">•</span> 
                  {t('benefit3')}
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
                    className="w-12 h-12 rounded-full object-cover ml-3 rtl:mr-3 rtl:ml-0" 
                  />
                  <div className="rtl:text-right">
                    <h3 className="font-bold">{story.name}</h3>
                    {/* Dynamic content specialty and story will remain as is for now */}
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
        {kitchenGalleryImages.map((image, index) => (
          <div key={index} className="aspect-square rounded-lg overflow-hidden">
            <img 
              src={image} 
              alt={`${t('exampleImageAlt')} ${index + 1}`} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideInfoPanel;
