
/**
 * Format date string to localized date based on selected language
 */
export const formatDate = (dateString: string, language: string = 'ar') => {
  const date = new Date(dateString);
  return date.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
