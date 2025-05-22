
/**
 * تنسيق السعر بالعملة المناسبة
 * @param price السعر كرقم
 * @param currency رمز العملة (افتراضيًا ريال)
 * @returns النص المنسق للسعر مع العملة
 */
export function formatPrice(price: number | string, currency: string = 'ر.س'): string {
  // التأكد من أن السعر رقم
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  // تنسيق الرقم بفاصلتين عشريتين
  const formattedPrice = numericPrice.toFixed(2);
  
  // إزالة الأصفار الزائدة بعد الفاصلة العشرية إذا كانت قيمتها صفر
  const cleanPrice = formattedPrice.replace(/\.00$/, '');
  
  // إرجاع السعر مع العملة
  return `${cleanPrice} ${currency}`;
}

/**
 * تنسيق التاريخ بالصيغة المناسبة
 * @param dateString التاريخ كنص
 * @returns التاريخ المنسق
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * تنسيق الوقت المنقضي منذ تاريخ معين
 * @param dateString التاريخ كنص
 * @returns الوقت المنقضي كنص
 */
export function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  // وحدات الوقت بالثواني
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;
  
  if (seconds < minute) {
    return 'منذ لحظات';
  } else if (seconds < hour) {
    const minutes = Math.floor(seconds / minute);
    return `منذ ${minutes} ${minutes === 1 ? 'دقيقة' : 'دقائق'}`;
  } else if (seconds < day) {
    const hours = Math.floor(seconds / hour);
    return `منذ ${hours} ${hours === 1 ? 'ساعة' : 'ساعات'}`;
  } else if (seconds < week) {
    const days = Math.floor(seconds / day);
    return `منذ ${days} ${days === 1 ? 'يوم' : 'أيام'}`;
  } else if (seconds < month) {
    const weeks = Math.floor(seconds / week);
    return `منذ ${weeks} ${weeks === 1 ? 'أسبوع' : 'أسابيع'}`;
  } else if (seconds < year) {
    const months = Math.floor(seconds / month);
    return `منذ ${months} ${months === 1 ? 'شهر' : 'أشهر'}`;
  } else {
    const years = Math.floor(seconds / year);
    return `منذ ${years} ${years === 1 ? 'سنة' : 'سنوات'}`;
  }
}
