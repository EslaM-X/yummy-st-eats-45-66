
import React from 'react';
import { Flag } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from '@/contexts/LanguageContext';

export interface Country {
  code: string;
  name: string;
  nameAr: string;
  flagEmoji?: string;
}

// قائمة الدول مع أعلامها
export const countries: Country[] = [
  { code: 'af', name: 'Afghanistan', nameAr: 'أفغانستان', flagEmoji: '🇦🇫' },
  { code: 'al', name: 'Albania', nameAr: 'ألبانيا', flagEmoji: '🇦🇱' },
  { code: 'dz', name: 'Algeria', nameAr: 'الجزائر', flagEmoji: '🇩🇿' },
  { code: 'ad', name: 'Andorra', nameAr: 'أندورا', flagEmoji: '🇦🇩' },
  { code: 'ao', name: 'Angola', nameAr: 'أنغولا', flagEmoji: '🇦🇴' },
  { code: 'ag', name: 'Antigua and Barbuda', nameAr: 'أنتيغوا وبربودا', flagEmoji: '🇦🇬' },
  { code: 'ar', name: 'Argentina', nameAr: 'الأرجنتين', flagEmoji: '🇦🇷' },
  { code: 'am', name: 'Armenia', nameAr: 'أرمينيا', flagEmoji: '🇦🇲' },
  { code: 'au', name: 'Australia', nameAr: 'أستراليا', flagEmoji: '🇦🇺' },
  { code: 'at', name: 'Austria', nameAr: 'النمسا', flagEmoji: '🇦🇹' },
  { code: 'az', name: 'Azerbaijan', nameAr: 'أذربيجان', flagEmoji: '🇦🇿' },
  { code: 'bs', name: 'Bahamas', nameAr: 'جزر البهاما', flagEmoji: '🇧🇸' },
  { code: 'bh', name: 'Bahrain', nameAr: 'البحرين', flagEmoji: '🇧🇭' },
  { code: 'bd', name: 'Bangladesh', nameAr: 'بنغلاديش', flagEmoji: '🇧🇩' },
  { code: 'bb', name: 'Barbados', nameAr: 'بربادوس', flagEmoji: '🇧🇧' },
  { code: 'by', name: 'Belarus', nameAr: 'روسيا البيضاء', flagEmoji: '🇧🇾' },
  { code: 'be', name: 'Belgium', nameAr: 'بلجيكا', flagEmoji: '🇧🇪' },
  { code: 'bz', name: 'Belize', nameAr: 'بليز', flagEmoji: '🇧🇿' },
  { code: 'bj', name: 'Benin', nameAr: 'بنين', flagEmoji: '🇧🇯' },
  { code: 'bt', name: 'Bhutan', nameAr: 'بوتان', flagEmoji: '🇧🇹' },
  { code: 'bo', name: 'Bolivia', nameAr: 'بوليفيا', flagEmoji: '🇧🇴' },
  { code: 'ba', name: 'Bosnia and Herzegovina', nameAr: 'البوسنة والهرسك', flagEmoji: '🇧🇦' },
  { code: 'bw', name: 'Botswana', nameAr: 'بوتسوانا', flagEmoji: '🇧🇼' },
  { code: 'br', name: 'Brazil', nameAr: 'البرازيل', flagEmoji: '🇧🇷' },
  { code: 'bn', name: 'Brunei', nameAr: 'بروناي', flagEmoji: '🇧🇳' },
  { code: 'bg', name: 'Bulgaria', nameAr: 'بلغاريا', flagEmoji: '🇧🇬' },
  { code: 'bf', name: 'Burkina Faso', nameAr: 'بوركينا فاسو', flagEmoji: '🇧🇫' },
  { code: 'bi', name: 'Burundi', nameAr: 'بوروندي', flagEmoji: '🇧🇮' },
  { code: 'kh', name: 'Cambodia', nameAr: 'كمبوديا', flagEmoji: '🇰🇭' },
  { code: 'cm', name: 'Cameroon', nameAr: 'الكاميرون', flagEmoji: '🇨🇲' },
  { code: 'ca', name: 'Canada', nameAr: 'كندا', flagEmoji: '🇨🇦' },
  { code: 'cv', name: 'Cape Verde', nameAr: 'الرأس الأخضر', flagEmoji: '🇨🇻' },
  { code: 'cf', name: 'Central African Republic', nameAr: 'جمهورية أفريقيا الوسطى', flagEmoji: '🇨🇫' },
  { code: 'td', name: 'Chad', nameAr: 'تشاد', flagEmoji: '🇹🇩' },
  { code: 'cl', name: 'Chile', nameAr: 'شيلي', flagEmoji: '🇨🇱' },
  { code: 'cn', name: 'China', nameAr: 'الصين', flagEmoji: '🇨🇳' },
  { code: 'co', name: 'Colombia', nameAr: 'كولومبيا', flagEmoji: '🇨🇴' },
  { code: 'km', name: 'Comoros', nameAr: 'جزر القمر', flagEmoji: '🇰🇲' },
  { code: 'cg', name: 'Congo', nameAr: 'الكونغو', flagEmoji: '🇨🇬' },
  { code: 'cr', name: 'Costa Rica', nameAr: 'كوستاريكا', flagEmoji: '🇨🇷' },
  { code: 'hr', name: 'Croatia', nameAr: 'كرواتيا', flagEmoji: '🇭🇷' },
  { code: 'cu', name: 'Cuba', nameAr: 'كوبا', flagEmoji: '🇨🇺' },
  { code: 'cy', name: 'Cyprus', nameAr: 'قبرص', flagEmoji: '🇨🇾' },
  { code: 'cz', name: 'Czech Republic', nameAr: 'جمهورية التشيك', flagEmoji: '🇨🇿' },
  { code: 'dk', name: 'Denmark', nameAr: 'الدنمارك', flagEmoji: '🇩🇰' },
  { code: 'dj', name: 'Djibouti', nameAr: 'جيبوتي', flagEmoji: '🇩🇯' },
  { code: 'dm', name: 'Dominica', nameAr: 'دومينيكا', flagEmoji: '🇩🇲' },
  { code: 'do', name: 'Dominican Republic', nameAr: 'جمهورية الدومينيكان', flagEmoji: '🇩🇴' },
  { code: 'ec', name: 'Ecuador', nameAr: 'الإكوادور', flagEmoji: '🇪🇨' },
  { code: 'eg', name: 'Egypt', nameAr: 'مصر', flagEmoji: '🇪🇬' },
  { code: 'sv', name: 'El Salvador', nameAr: 'السلفادور', flagEmoji: '🇸🇻' },
  { code: 'gq', name: 'Equatorial Guinea', nameAr: 'غينيا الإستوائية', flagEmoji: '🇬🇶' },
  { code: 'er', name: 'Eritrea', nameAr: 'إريتريا', flagEmoji: '🇪🇷' },
  { code: 'ee', name: 'Estonia', nameAr: 'استونيا', flagEmoji: '🇪🇪' },
  { code: 'et', name: 'Ethiopia', nameAr: 'إثيوبيا', flagEmoji: '🇪🇹' },
  { code: 'fj', name: 'Fiji', nameAr: 'فيجي', flagEmoji: '🇫🇯' },
  { code: 'fi', name: 'Finland', nameAr: 'فنلندا', flagEmoji: '🇫🇮' },
  { code: 'fr', name: 'France', nameAr: 'فرنسا', flagEmoji: '🇫🇷' },
  { code: 'ga', name: 'Gabon', nameAr: 'الغابون', flagEmoji: '🇬🇦' },
  { code: 'gm', name: 'Gambia', nameAr: 'غامبيا', flagEmoji: '🇬🇲' },
  { code: 'ge', name: 'Georgia', nameAr: 'جورجيا', flagEmoji: '🇬🇪' },
  { code: 'de', name: 'Germany', nameAr: 'ألمانيا', flagEmoji: '🇩🇪' },
  { code: 'gh', name: 'Ghana', nameAr: 'غانا', flagEmoji: '🇬🇭' },
  { code: 'gr', name: 'Greece', nameAr: 'اليونان', flagEmoji: '🇬🇷' },
  { code: 'gd', name: 'Grenada', nameAr: 'غرينادا', flagEmoji: '🇬🇩' },
  { code: 'gt', name: 'Guatemala', nameAr: 'غواتيمالا', flagEmoji: '🇬🇹' },
  { code: 'gn', name: 'Guinea', nameAr: 'غينيا', flagEmoji: '🇬🇳' },
  { code: 'gw', name: 'Guinea-Bissau', nameAr: 'غينيا بيساو', flagEmoji: '🇬🇼' },
  { code: 'gy', name: 'Guyana', nameAr: 'غيانا', flagEmoji: '🇬🇾' },
  { code: 'ht', name: 'Haiti', nameAr: 'هايتي', flagEmoji: '🇭🇹' },
  { code: 'hn', name: 'Honduras', nameAr: 'هندوراس', flagEmoji: '🇭🇳' },
  { code: 'hu', name: 'Hungary', nameAr: 'المجر', flagEmoji: '🇭🇺' },
  { code: 'is', name: 'Iceland', nameAr: 'آيسلندا', flagEmoji: '🇮🇸' },
  { code: 'in', name: 'India', nameAr: 'الهند', flagEmoji: '🇮🇳' },
  { code: 'id', name: 'Indonesia', nameAr: 'إندونيسيا', flagEmoji: '🇮🇩' },
  { code: 'ir', name: 'Iran', nameAr: 'إيران', flagEmoji: '🇮🇷' },
  { code: 'iq', name: 'Iraq', nameAr: 'العراق', flagEmoji: '🇮🇶' },
  { code: 'ie', name: 'Ireland', nameAr: 'أيرلندا', flagEmoji: '🇮🇪' },
  { code: 'il', name: 'Israel', nameAr: 'إسرائيل', flagEmoji: '🇮🇱' },
  { code: 'it', name: 'Italy', nameAr: 'إيطاليا', flagEmoji: '🇮🇹' },
  { code: 'jm', name: 'Jamaica', nameAr: 'جامايكا', flagEmoji: '🇯🇲' },
  { code: 'jp', name: 'Japan', nameAr: 'اليابان', flagEmoji: '🇯🇵' },
  { code: 'jo', name: 'Jordan', nameAr: 'الأردن', flagEmoji: '🇯🇴' },
  { code: 'kz', name: 'Kazakhstan', nameAr: 'كازاخستان', flagEmoji: '🇰🇿' },
  { code: 'ke', name: 'Kenya', nameAr: 'كينيا', flagEmoji: '🇰🇪' },
  { code: 'ki', name: 'Kiribati', nameAr: 'كيريباتي', flagEmoji: '🇰🇮' },
  { code: 'kp', name: 'North Korea', nameAr: 'كوريا الشمالية', flagEmoji: '🇰🇵' },
  { code: 'kr', name: 'South Korea', nameAr: 'كوريا الجنوبية', flagEmoji: '🇰🇷' },
  { code: 'kw', name: 'Kuwait', nameAr: 'الكويت', flagEmoji: '🇰🇼' },
  { code: 'kg', name: 'Kyrgyzstan', nameAr: 'قيرغيزستان', flagEmoji: '🇰🇬' },
  { code: 'la', name: 'Laos', nameAr: 'لاوس', flagEmoji: '🇱🇦' },
  { code: 'lv', name: 'Latvia', nameAr: 'لاتفيا', flagEmoji: '🇱🇻' },
  { code: 'lb', name: 'Lebanon', nameAr: 'لبنان', flagEmoji: '🇱🇧' },
  { code: 'ls', name: 'Lesotho', nameAr: 'ليسوتو', flagEmoji: '🇱🇸' },
  { code: 'lr', name: 'Liberia', nameAr: 'ليبيريا', flagEmoji: '🇱🇷' },
  { code: 'ly', name: 'Libya', nameAr: 'ليبيا', flagEmoji: '🇱🇾' },
  { code: 'li', name: 'Liechtenstein', nameAr: 'ليختنشتاين', flagEmoji: '🇱🇮' },
  { code: 'lt', name: 'Lithuania', nameAr: 'ليتوانيا', flagEmoji: '🇱🇹' },
  { code: 'lu', name: 'Luxembourg', nameAr: 'لوكسمبورغ', flagEmoji: '🇱🇺' },
  { code: 'mg', name: 'Madagascar', nameAr: 'مدغشقر', flagEmoji: '🇲🇬' },
  { code: 'mw', name: 'Malawi', nameAr: 'مالاوي', flagEmoji: '🇲🇼' },
  { code: 'my', name: 'Malaysia', nameAr: 'ماليزيا', flagEmoji: '🇲🇾' },
  { code: 'mv', name: 'Maldives', nameAr: 'المالديف', flagEmoji: '🇲🇻' },
  { code: 'ml', name: 'Mali', nameAr: 'مالي', flagEmoji: '🇲🇱' },
  { code: 'mt', name: 'Malta', nameAr: 'مالطا', flagEmoji: '🇲🇹' },
  { code: 'mh', name: 'Marshall Islands', nameAr: 'جزر مارشال', flagEmoji: '🇲🇭' },
  { code: 'mr', name: 'Mauritania', nameAr: 'موريتانيا', flagEmoji: '🇲🇷' },
  { code: 'mu', name: 'Mauritius', nameAr: 'موريشيوس', flagEmoji: '🇲🇺' },
  { code: 'mx', name: 'Mexico', nameAr: 'المكسيك', flagEmoji: '🇲🇽' },
  { code: 'fm', name: 'Micronesia', nameAr: 'ميكرونيزيا', flagEmoji: '🇫🇲' },
  { code: 'md', name: 'Moldova', nameAr: 'مولدوفا', flagEmoji: '🇲🇩' },
  { code: 'mc', name: 'Monaco', nameAr: 'موناكو', flagEmoji: '🇲🇨' },
  { code: 'mn', name: 'Mongolia', nameAr: 'منغوليا', flagEmoji: '🇲🇳' },
  { code: 'me', name: 'Montenegro', nameAr: 'الجبل الأسود', flagEmoji: '🇲🇪' },
  { code: 'ma', name: 'Morocco', nameAr: 'المغرب', flagEmoji: '🇲🇦' },
  { code: 'mz', name: 'Mozambique', nameAr: 'موزمبيق', flagEmoji: '🇲🇿' },
  { code: 'mm', name: 'Myanmar', nameAr: 'ميانمار', flagEmoji: '🇲🇲' },
  { code: 'na', name: 'Namibia', nameAr: 'ناميبيا', flagEmoji: '🇳🇦' },
  { code: 'nr', name: 'Nauru', nameAr: 'ناورو', flagEmoji: '🇳🇷' },
  { code: 'np', name: 'Nepal', nameAr: 'نيبال', flagEmoji: '🇳🇵' },
  { code: 'nl', name: 'Netherlands', nameAr: 'هولندا', flagEmoji: '🇳🇱' },
  { code: 'nz', name: 'New Zealand', nameAr: 'نيوزيلندا', flagEmoji: '🇳🇿' },
  { code: 'ni', name: 'Nicaragua', nameAr: 'نيكاراغوا', flagEmoji: '🇳🇮' },
  { code: 'ne', name: 'Niger', nameAr: 'النيجر', flagEmoji: '🇳🇪' },
  { code: 'ng', name: 'Nigeria', nameAr: 'نيجيريا', flagEmoji: '🇳🇬' },
  { code: 'no', name: 'Norway', nameAr: 'النرويج', flagEmoji: '🇳🇴' },
  { code: 'om', name: 'Oman', nameAr: 'عمان', flagEmoji: '🇴🇲' },
  { code: 'pk', name: 'Pakistan', nameAr: 'باكستان', flagEmoji: '🇵🇰' },
  { code: 'pw', name: 'Palau', nameAr: 'بالاو', flagEmoji: '🇵🇼' },
  { code: 'pa', name: 'Panama', nameAr: 'بنما', flagEmoji: '🇵🇦' },
  { code: 'pg', name: 'Papua New Guinea', nameAr: 'بابوا غينيا الجديدة', flagEmoji: '🇵🇬' },
  { code: 'py', name: 'Paraguay', nameAr: 'باراغواي', flagEmoji: '🇵🇾' },
  { code: 'pe', name: 'Peru', nameAr: 'بيرو', flagEmoji: '🇵🇪' },
  { code: 'ph', name: 'Philippines', nameAr: 'الفلبين', flagEmoji: '🇵🇭' },
  { code: 'pl', name: 'Poland', nameAr: 'بولندا', flagEmoji: '🇵🇱' },
  { code: 'pt', name: 'Portugal', nameAr: 'البرتغال', flagEmoji: '🇵🇹' },
  { code: 'qa', name: 'Qatar', nameAr: 'قطر', flagEmoji: '🇶🇦' },
  { code: 'ro', name: 'Romania', nameAr: 'رومانيا', flagEmoji: '🇷🇴' },
  { code: 'ru', name: 'Russia', nameAr: 'روسيا', flagEmoji: '🇷🇺' },
  { code: 'rw', name: 'Rwanda', nameAr: 'رواندا', flagEmoji: '🇷🇼' },
  { code: 'kn', name: 'Saint Kitts and Nevis', nameAr: 'سانت كيتس ونيفيس', flagEmoji: '🇰🇳' },
  { code: 'lc', name: 'Saint Lucia', nameAr: 'سانت لوسيا', flagEmoji: '🇱🇨' },
  { code: 'vc', name: 'Saint Vincent and the Grenadines', nameAr: 'سانت فنسنت والغرينادين', flagEmoji: '🇻🇨' },
  { code: 'ws', name: 'Samoa', nameAr: 'ساموا', flagEmoji: '🇼🇸' },
  { code: 'sm', name: 'San Marino', nameAr: 'سان مارينو', flagEmoji: '🇸🇲' },
  { code: 'st', name: 'São Tomé and Príncipe', nameAr: 'ساو تومي وبرينسيبي', flagEmoji: '🇸🇹' },
  { code: 'sa', name: 'Saudi Arabia', nameAr: 'المملكة العربية السعودية', flagEmoji: '🇸🇦' },
  { code: 'sn', name: 'Senegal', nameAr: 'السنغال', flagEmoji: '🇸🇳' },
  { code: 'rs', name: 'Serbia', nameAr: 'صربيا', flagEmoji: '🇷🇸' },
  { code: 'sc', name: 'Seychelles', nameAr: 'سيشل', flagEmoji: '🇸🇨' },
  { code: 'sl', name: 'Sierra Leone', nameAr: 'سيراليون', flagEmoji: '🇸🇱' },
  { code: 'sg', name: 'Singapore', nameAr: 'سنغافورة', flagEmoji: '🇸🇬' },
  { code: 'sk', name: 'Slovakia', nameAr: 'سلوفاكيا', flagEmoji: '🇸🇰' },
  { code: 'si', name: 'Slovenia', nameAr: 'سلوفينيا', flagEmoji: '🇸🇮' },
  { code: 'sb', name: 'Solomon Islands', nameAr: 'جزر سليمان', flagEmoji: '🇸🇧' },
  { code: 'so', name: 'Somalia', nameAr: 'الصومال', flagEmoji: '🇸🇴' },
  { code: 'za', name: 'South Africa', nameAr: 'جنوب أفريقيا', flagEmoji: '🇿🇦' },
  { code: 'ss', name: 'South Sudan', nameAr: 'جنوب السودان', flagEmoji: '🇸🇸' },
  { code: 'es', name: 'Spain', nameAr: 'إسبانيا', flagEmoji: '🇪🇸' },
  { code: 'lk', name: 'Sri Lanka', nameAr: 'سريلانكا', flagEmoji: '🇱🇰' },
  { code: 'sd', name: 'Sudan', nameAr: 'السودان', flagEmoji: '🇸🇩' },
  { code: 'sr', name: 'Suriname', nameAr: 'سورينام', flagEmoji: '🇸🇷' },
  { code: 'sz', name: 'Eswatini', nameAr: 'إسواتيني', flagEmoji: '🇸🇿' },
  { code: 'se', name: 'Sweden', nameAr: 'السويد', flagEmoji: '🇸🇪' },
  { code: 'ch', name: 'Switzerland', nameAr: 'سويسرا', flagEmoji: '🇨🇭' },
  { code: 'sy', name: 'Syria', nameAr: 'سوريا', flagEmoji: '🇸🇾' },
  { code: 'tj', name: 'Tajikistan', nameAr: 'طاجيكستان', flagEmoji: '🇹🇯' },
  { code: 'tz', name: 'Tanzania', nameAr: 'تنزانيا', flagEmoji: '🇹🇿' },
  { code: 'th', name: 'Thailand', nameAr: 'تايلاند', flagEmoji: '🇹🇭' },
  { code: 'tl', name: 'Timor-Leste', nameAr: 'تيمور-ليشتي', flagEmoji: '🇹🇱' },
  { code: 'tg', name: 'Togo', nameAr: 'توغو', flagEmoji: '🇹🇬' },
  { code: 'to', name: 'Tonga', nameAr: 'تونغا', flagEmoji: '🇹🇴' },
  { code: 'tt', name: 'Trinidad and Tobago', nameAr: 'ترينيداد وتوباغو', flagEmoji: '🇹🇹' },
  { code: 'tn', name: 'Tunisia', nameAr: 'تونس', flagEmoji: '🇹🇳' },
  { code: 'tr', name: 'Turkey', nameAr: 'تركيا', flagEmoji: '🇹🇷' },
  { code: 'tm', name: 'Turkmenistan', nameAr: 'تركمانستان', flagEmoji: '🇹🇲' },
  { code: 'tv', name: 'Tuvalu', nameAr: 'توفالو', flagEmoji: '🇹🇻' },
  { code: 'ug', name: 'Uganda', nameAr: 'أوغندا', flagEmoji: '🇺🇬' },
  { code: 'ua', name: 'Ukraine', nameAr: 'أوكرانيا', flagEmoji: '🇺🇦' },
  { code: 'ae', name: 'United Arab Emirates', nameAr: 'الإمارات العربية المتحدة', flagEmoji: '🇦🇪' },
  { code: 'gb', name: 'United Kingdom', nameAr: 'المملكة المتحدة', flagEmoji: '🇬🇧' },
  { code: 'us', name: 'United States', nameAr: 'الولايات المتحدة', flagEmoji: '🇺🇸' },
  { code: 'uy', name: 'Uruguay', nameAr: 'أوروغواي', flagEmoji: '🇺🇾' },
  { code: 'uz', name: 'Uzbekistan', nameAr: 'أوزبكستان', flagEmoji: '🇺🇿' },
  { code: 'vu', name: 'Vanuatu', nameAr: 'فانواتو', flagEmoji: '🇻🇺' },
  { code: 'va', name: 'Vatican City', nameAr: 'الفاتيكان', flagEmoji: '🇻🇦' },
  { code: 've', name: 'Venezuela', nameAr: 'فنزويلا', flagEmoji: '🇻🇪' },
  { code: 'vn', name: 'Vietnam', nameAr: 'فيتنام', flagEmoji: '🇻🇳' },
  { code: 'ye', name: 'Yemen', nameAr: 'اليمن', flagEmoji: '🇾🇪' },
  { code: 'zm', name: 'Zambia', nameAr: 'زامبيا', flagEmoji: '🇿🇲' },
  { code: 'zw', name: 'Zimbabwe', nameAr: 'زيمبابوي', flagEmoji: '🇿🇼' }
];

interface CountryPickerProps {
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

const CountryPicker: React.FC<CountryPickerProps> = ({
  value,
  onValueChange,
  className,
  placeholder,
  disabled = false
}) => {
  const { language, t } = useLanguage();
  
  return (
    <Select
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder || t('selectCountry')}>
          {value ? (
            <div className="flex items-center gap-2">
              <span className="text-lg">{countries.find(c => c.code === value)?.flagEmoji}</span>
              <span>
                {language === 'ar'
                  ? countries.find(c => c.code === value)?.nameAr
                  : countries.find(c => c.code === value)?.name
                }
              </span>
            </div>
          ) : null}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="max-h-[300px]">
        {countries.map((country) => (
          <SelectItem
            key={country.code}
            value={country.code}
            className="flex items-center gap-2"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{country.flagEmoji}</span>
              <span>{language === 'ar' ? country.nameAr : country.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CountryPicker;
