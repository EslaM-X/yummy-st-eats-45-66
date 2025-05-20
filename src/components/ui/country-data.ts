
// Country data interface
export interface Country {
  code: string;
  name: string;
  nameAr: string;
  flagEmoji?: string;
}

// Countries grouped by region for better organization
const middleEastCountries: Country[] = [
  { code: 'sa', name: 'Saudi Arabia', nameAr: 'المملكة العربية السعودية', flagEmoji: '🇸🇦' },
  { code: 'ae', name: 'United Arab Emirates', nameAr: 'الإمارات العربية المتحدة', flagEmoji: '🇦🇪' },
  { code: 'bh', name: 'Bahrain', nameAr: 'البحرين', flagEmoji: '🇧🇭' },
  { code: 'kw', name: 'Kuwait', nameAr: 'الكويت', flagEmoji: '🇰🇼' },
  { code: 'om', name: 'Oman', nameAr: 'عمان', flagEmoji: '🇴🇲' },
  { code: 'qa', name: 'Qatar', nameAr: 'قطر', flagEmoji: '🇶🇦' },
  { code: 'ye', name: 'Yemen', nameAr: 'اليمن', flagEmoji: '🇾🇪' },
  { code: 'jo', name: 'Jordan', nameAr: 'الأردن', flagEmoji: '🇯🇴' },
  { code: 'lb', name: 'Lebanon', nameAr: 'لبنان', flagEmoji: '🇱🇧' },
  { code: 'sy', name: 'Syria', nameAr: 'سوريا', flagEmoji: '🇸🇾' },
  { code: 'iq', name: 'Iraq', nameAr: 'العراق', flagEmoji: '🇮🇶' },
  { code: 'ir', name: 'Iran', nameAr: 'إيران', flagEmoji: '🇮🇷' },
  { code: 'ps', name: 'Palestine', nameAr: 'فلسطين', flagEmoji: '🇵🇸' },
  { code: 'il', name: 'Israel', nameAr: 'إسرائيل', flagEmoji: '🇮🇱' },
];

const northAfricaCountries: Country[] = [
  { code: 'eg', name: 'Egypt', nameAr: 'مصر', flagEmoji: '🇪🇬' },
  { code: 'ly', name: 'Libya', nameAr: 'ليبيا', flagEmoji: '🇱🇾' },
  { code: 'tn', name: 'Tunisia', nameAr: 'تونس', flagEmoji: '🇹🇳' },
  { code: 'dz', name: 'Algeria', nameAr: 'الجزائر', flagEmoji: '🇩🇿' },
  { code: 'ma', name: 'Morocco', nameAr: 'المغرب', flagEmoji: '🇲🇦' },
  { code: 'sd', name: 'Sudan', nameAr: 'السودان', flagEmoji: '🇸🇩' },
  { code: 'ss', name: 'South Sudan', nameAr: 'جنوب السودان', flagEmoji: '🇸🇸' },
];

const europeanCountries: Country[] = [
  { code: 'gb', name: 'United Kingdom', nameAr: 'المملكة المتحدة', flagEmoji: '🇬🇧' },
  { code: 'de', name: 'Germany', nameAr: 'ألمانيا', flagEmoji: '🇩🇪' },
  { code: 'fr', name: 'France', nameAr: 'فرنسا', flagEmoji: '🇫🇷' },
  { code: 'it', name: 'Italy', nameAr: 'إيطاليا', flagEmoji: '🇮🇹' },
  { code: 'es', name: 'Spain', nameAr: 'إسبانيا', flagEmoji: '🇪🇸' },
  { code: 'pt', name: 'Portugal', nameAr: 'البرتغال', flagEmoji: '🇵🇹' },
  { code: 'nl', name: 'Netherlands', nameAr: 'هولندا', flagEmoji: '🇳🇱' },
  { code: 'be', name: 'Belgium', nameAr: 'بلجيكا', flagEmoji: '🇧🇪' },
  { code: 'ie', name: 'Ireland', nameAr: 'أيرلندا', flagEmoji: '🇮🇪' },
  { code: 'se', name: 'Sweden', nameAr: 'السويد', flagEmoji: '🇸🇪' },
  { code: 'fi', name: 'Finland', nameAr: 'فنلندا', flagEmoji: '🇫🇮' },
  { code: 'no', name: 'Norway', nameAr: 'النرويج', flagEmoji: '🇳🇴' },
  { code: 'dk', name: 'Denmark', nameAr: 'الدنمارك', flagEmoji: '🇩🇰' },
  { code: 'ch', name: 'Switzerland', nameAr: 'سويسرا', flagEmoji: '🇨🇭' },
  { code: 'at', name: 'Austria', nameAr: 'النمسا', flagEmoji: '🇦🇹' },
  { code: 'gr', name: 'Greece', nameAr: 'اليونان', flagEmoji: '🇬🇷' },
  { code: 'pl', name: 'Poland', nameAr: 'بولندا', flagEmoji: '🇵🇱' },
  { code: 'cz', name: 'Czech Republic', nameAr: 'جمهورية التشيك', flagEmoji: '🇨🇿' },
  { code: 'hu', name: 'Hungary', nameAr: 'المجر', flagEmoji: '🇭🇺' },
];

const asiaCountries: Country[] = [
  { code: 'cn', name: 'China', nameAr: 'الصين', flagEmoji: '🇨🇳' },
  { code: 'jp', name: 'Japan', nameAr: 'اليابان', flagEmoji: '🇯🇵' },
  { code: 'kr', name: 'South Korea', nameAr: 'كوريا الجنوبية', flagEmoji: '🇰🇷' },
  { code: 'in', name: 'India', nameAr: 'الهند', flagEmoji: '🇮🇳' },
  { code: 'id', name: 'Indonesia', nameAr: 'إندونيسيا', flagEmoji: '🇮🇩' },
  { code: 'my', name: 'Malaysia', nameAr: 'ماليزيا', flagEmoji: '🇲🇾' },
  { code: 'sg', name: 'Singapore', nameAr: 'سنغافورة', flagEmoji: '🇸🇬' },
  { code: 'th', name: 'Thailand', nameAr: 'تايلاند', flagEmoji: '🇹🇭' },
  { code: 'vn', name: 'Vietnam', nameAr: 'فيتنام', flagEmoji: '🇻🇳' },
  { code: 'ph', name: 'Philippines', nameAr: 'الفلبين', flagEmoji: '🇵🇭' },
  { code: 'pk', name: 'Pakistan', nameAr: 'باكستان', flagEmoji: '🇵🇰' },
  { code: 'bd', name: 'Bangladesh', nameAr: 'بنغلاديش', flagEmoji: '🇧🇩' },
  { code: 'np', name: 'Nepal', nameAr: 'نيبال', flagEmoji: '🇳🇵' },
];

const americasCountries: Country[] = [
  { code: 'us', name: 'United States', nameAr: 'الولايات المتحدة', flagEmoji: '🇺🇸' },
  { code: 'ca', name: 'Canada', nameAr: 'كندا', flagEmoji: '🇨🇦' },
  { code: 'mx', name: 'Mexico', nameAr: 'المكسيك', flagEmoji: '🇲🇽' },
  { code: 'br', name: 'Brazil', nameAr: 'البرازيل', flagEmoji: '🇧🇷' },
  { code: 'ar', name: 'Argentina', nameAr: 'الأرجنتين', flagEmoji: '🇦🇷' },
  { code: 'co', name: 'Colombia', nameAr: 'كولومبيا', flagEmoji: '🇨🇴' },
  { code: 'pe', name: 'Peru', nameAr: 'بيرو', flagEmoji: '🇵🇪' },
  { code: 've', name: 'Venezuela', nameAr: 'فنزويلا', flagEmoji: '🇻🇪' },
  { code: 'cl', name: 'Chile', nameAr: 'شيلي', flagEmoji: '🇨🇱' },
];

const africaCountries: Country[] = [
  { code: 'ng', name: 'Nigeria', nameAr: 'نيجيريا', flagEmoji: '🇳🇬' },
  { code: 'za', name: 'South Africa', nameAr: 'جنوب أفريقيا', flagEmoji: '🇿🇦' },
  { code: 'et', name: 'Ethiopia', nameAr: 'إثيوبيا', flagEmoji: '🇪🇹' },
  { code: 'ke', name: 'Kenya', nameAr: 'كينيا', flagEmoji: '🇰🇪' },
  { code: 'gh', name: 'Ghana', nameAr: 'غانا', flagEmoji: '🇬🇭' },
  { code: 'ug', name: 'Uganda', nameAr: 'أوغندا', flagEmoji: '🇺🇬' },
  { code: 'tz', name: 'Tanzania', nameAr: 'تنزانيا', flagEmoji: '🇹🇿' },
  { code: 'rw', name: 'Rwanda', nameAr: 'رواندا', flagEmoji: '🇷🇼' },
  { code: 'so', name: 'Somalia', nameAr: 'الصومال', flagEmoji: '🇸🇴' },
];

const oceaniaCountries: Country[] = [
  { code: 'au', name: 'Australia', nameAr: 'أستراليا', flagEmoji: '🇦🇺' },
  { code: 'nz', name: 'New Zealand', nameAr: 'نيوزيلندا', flagEmoji: '🇳🇿' },
  { code: 'fj', name: 'Fiji', nameAr: 'فيجي', flagEmoji: '🇫🇯' },
  { code: 'pg', name: 'Papua New Guinea', nameAr: 'بابوا غينيا الجديدة', flagEmoji: '🇵🇬' },
];

const otherCountries: Country[] = [
  { code: 'af', name: 'Afghanistan', nameAr: 'أفغانستان', flagEmoji: '🇦🇫' },
  { code: 'al', name: 'Albania', nameAr: 'ألبانيا', flagEmoji: '🇦🇱' },
  { code: 'ad', name: 'Andorra', nameAr: 'أندورا', flagEmoji: '🇦🇩' },
  { code: 'ao', name: 'Angola', nameAr: 'أنغولا', flagEmoji: '🇦🇴' },
  { code: 'ag', name: 'Antigua and Barbuda', nameAr: 'أنتيغوا وبربودا', flagEmoji: '🇦🇬' },
  { code: 'am', name: 'Armenia', nameAr: 'أرمينيا', flagEmoji: '🇦🇲' },
  { code: 'az', name: 'Azerbaijan', nameAr: 'أذربيجان', flagEmoji: '🇦🇿' },
  { code: 'bs', name: 'Bahamas', nameAr: 'جزر البهاما', flagEmoji: '🇧🇸' },
  { code: 'bb', name: 'Barbados', nameAr: 'بربادوس', flagEmoji: '🇧🇧' },
  { code: 'by', name: 'Belarus', nameAr: 'روسيا البيضاء', flagEmoji: '🇧🇾' },
  { code: 'bz', name: 'Belize', nameAr: 'بليز', flagEmoji: '🇧🇿' },
  { code: 'bj', name: 'Benin', nameAr: 'بنين', flagEmoji: '🇧🇯' },
  { code: 'bt', name: 'Bhutan', nameAr: 'بوتان', flagEmoji: '🇧🇹' },
  { code: 'bo', name: 'Bolivia', nameAr: 'بوليفيا', flagEmoji: '🇧🇴' },
  { code: 'ba', name: 'Bosnia and Herzegovina', nameAr: 'البوسنة والهرسك', flagEmoji: '🇧🇦' },
  { code: 'bw', name: 'Botswana', nameAr: 'بوتسوانا', flagEmoji: '🇧🇼' },
  { code: 'bn', name: 'Brunei', nameAr: 'بروناي', flagEmoji: '🇧🇳' },
  { code: 'bg', name: 'Bulgaria', nameAr: 'بلغاريا', flagEmoji: '🇧🇬' },
  { code: 'bf', name: 'Burkina Faso', nameAr: 'بوركينا فاسو', flagEmoji: '🇧🇫' },
  { code: 'bi', name: 'Burundi', nameAr: 'بوروندي', flagEmoji: '🇧🇮' },
  { code: 'kh', name: 'Cambodia', nameAr: 'كمبوديا', flagEmoji: '🇰🇭' },
  { code: 'cm', name: 'Cameroon', nameAr: 'الكاميرون', flagEmoji: '🇨🇲' },
  { code: 'cv', name: 'Cape Verde', nameAr: 'الرأس الأخضر', flagEmoji: '🇨🇻' },
  { code: 'cf', name: 'Central African Republic', nameAr: 'جمهورية أفريقيا الوسطى', flagEmoji: '🇨🇫' },
  { code: 'td', name: 'Chad', nameAr: 'تشاد', flagEmoji: '🇹🇩' },
  { code: 'km', name: 'Comoros', nameAr: 'جزر القمر', flagEmoji: '🇰🇲' },
  { code: 'cg', name: 'Congo', nameAr: 'الكونغو', flagEmoji: '🇨🇬' },
  { code: 'cr', name: 'Costa Rica', nameAr: 'كوستاريكا', flagEmoji: '🇨🇷' },
  { code: 'hr', name: 'Croatia', nameAr: 'كرواتيا', flagEmoji: '🇭🇷' },
  { code: 'cu', name: 'Cuba', nameAr: 'كوبا', flagEmoji: '🇨🇺' },
  { code: 'cy', name: 'Cyprus', nameAr: 'قبرص', flagEmoji: '🇨🇾' },
];

// Merge all country arrays - the original order is maintained for compatibility
export const countries: Country[] = [
  ...middleEastCountries,
  ...northAfricaCountries, 
  ...europeanCountries,
  ...asiaCountries,
  ...americasCountries,
  ...africaCountries,
  ...oceaniaCountries,
  ...otherCountries
];

// Export regional country groups for potential use in filtering
export const countryGroups = {
  middleEast: middleEastCountries,
  northAfrica: northAfricaCountries,
  europe: europeanCountries,
  asia: asiaCountries,
  americas: americasCountries,
  africa: africaCountries,
  oceania: oceaniaCountries,
  other: otherCountries
};
