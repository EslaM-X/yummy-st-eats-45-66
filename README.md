# ST-Eat · منصة توصيل الطعام

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE) [![CI](https://github.com/EslaM-X/yummy-st-eats-45-66/actions/workflows/ci.yml/badge.svg)](https://github.com/EslaM-X/yummy-st-eats-45-66/actions)

منصة توصيل طعام عربية متكاملة: تصفح المطاعم، أضف الوجبات إلى السلة، ادفع،
وتابع طلباتك — مع لوحة تحكم للمطاعم وسجل طلبات كامل.

> التصميم والتطوير: [EslaM-X](https://github.com/EslaM-X)

---

## المميزات

- **تصفح المطاعم** — مطاعم مميزة وجميع المطاعم (Restaurants, Featured).
- **سلة ودفع** — سلة طلبات، صفحة دفع، وحقول عنوان التوصيل.
- **طلباتي** — تتبع طلباتك وتفاصيل كل طلب.
- **لوحة المطعم** — أضف الأطعمة، شاهد إحصائيات المطعم، وإدارة الطلبات.
- **المكافآت** — نظام نقاط ومكافآت للعملاء.
- **الحسابات** — تسجيل دخول، ملف شخصي، استعادة كلمة المرور.
- **الوثائق القانونية** — سياسة الخصوصية، الشروط والأحكام، سياسة الكوكيز.

## التقنيات

| الطبقة | التقنية |
| --- | --- |
| الواجهة | React · TypeScript · Tailwind |
| الحالة | React Context (سلة، طلبات، لغة، حسابات) |
| البيانات | Supabase (نماذج Mock جاهزة للتطوير) |
| الاستضافة | Vercel |

## التشغيل

```bash
npm install
npm run dev
```

## بنية المشروع

```
src/
  pages/          الصفحات (Index, Restaurants, Cart, Checkout, Orders, Admin...)
  components/     مكونات الواجهة (admin, checkout, products, rewards, team)
  services/       خدمات الـ API
  locales/        الترجمات
  contexts/       الحالة العالمية
  mocks/          بيانات تجريبية
```

## License

MIT. See `LICENSE`.
