
import React from 'react';
import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form";
import { useLanguage } from '@/contexts/LanguageContext';

interface ImageUploadAreaProps {
  imagePreview: string | null;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteImage: () => void;
}

const ImageUploadArea: React.FC<ImageUploadAreaProps> = ({ 
  imagePreview, 
  handleImageChange,
  onDeleteImage
}) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-3">
      <FormLabel>{t('dishImageLabel')}</FormLabel>
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
                alt={t('dishPreviewAlt')}
                className="w-full h-full object-contain p-4" 
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2 rtl:right-auto rtl:left-2"
                onClick={onDeleteImage}
              >
                {t('deleteButton')}
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <UploadCloud className="w-10 h-10 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">{t('imageUploadPromptPrimary')}</span> {t('imageUploadPromptSecondary')}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{t('imageUploadHint')}</p>
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
  );
};

export default ImageUploadArea;
