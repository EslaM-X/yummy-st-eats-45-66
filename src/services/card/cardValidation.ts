
/**
 * خدمات التحقق من صحة بطاقات ST
 */

/**
 * وظيفة للتحقق من صلاحية البطاقة باستخدام خوارزمية Luhn
 */
export const isCardNumberValid = (cardNumber: string): boolean => {
  // إزالة المسافات والرموز
  const sanitizedNumber = cardNumber.replace(/\D/g, '');
  
  // التحقق من أن الرقم يتكون من 16 رقم
  if (sanitizedNumber.length !== 16) {
    return false;
  }
  
  // محاكاة خوارزمية Luhn للتحقق من صحة رقم البطاقة
  let sum = 0;
  let shouldDouble = false;
  
  // المرور على الأرقام من اليمين إلى اليسار
  for (let i = sanitizedNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitizedNumber.charAt(i));
    
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  
  return (sum % 10) === 0;
};

/**
 * وظيفة للتحقق من صلاحية رمز CVV
 */
export const isCvvValid = (cvv: string): boolean => {
  // إزالة المسافات والرموز
  const sanitizedCvv = cvv.replace(/\D/g, '');
  
  // CVV يتكون عادةً من 3 أو 4 أرقام
  return sanitizedCvv.length >= 3 && sanitizedCvv.length <= 4;
};

/**
 * تنسيق رقم البطاقة بإضافة مسافات كل أربعة أرقام
 */
export const formatCardNumber = (value: string): string => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  const matches = v.match(/\d{4,16}/g);
  const match = matches && matches[0] || '';
  const parts = [];
  
  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }
  
  if (parts.length) {
    return parts.join(' ');
  } else {
    return value;
  }
};
