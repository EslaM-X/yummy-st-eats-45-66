
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// إعداد headers لـ CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // التعامل مع طلبات CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // استخراج البيانات من الطلب
    const { email, type, redirectUrl } = await req.json();
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    
    // إنشاء عميل Supabase باستخدام مفتاح الخدمة
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    if (type === 'signup') {
      // إرسال رسالة تحقق مخصصة
      const { data, error } = await supabase.auth.admin.generateLink({
        type: 'signup',
        email: email,
        options: {
          redirectTo: redirectUrl || 'https://lovable.dev/int/podtrairfwunyjzdvmst/login',
          data: { 
            custom_email: true,
            app_name: 'ST🍕 Eat'
          },
        },
      });
      
      if (error) {
        throw error;
      }
      
      // استخراج الرابط والمعلومات
      const { properties } = data;
      const emailLink = properties?.action_link || '';
      
      // بناء رسالة البريد الإلكتروني المخصصة
      const emailTemplate = generateCustomEmail(email, emailLink);
      
      // إرسال البريد الإلكتروني باستخدام Supabase
      const { error: emailError } = await supabase.functions.invoke('send-custom-email', {
        body: {
          to: email,
          subject: 'تفعيل حسابك في ST🍕 Eat - رحلة الطعام تبدأ هنا!',
          html: emailTemplate,
        },
      });
      
      if (emailError) {
        throw emailError;
      }
      
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }
    
    // لأنواع أخرى من الرسائل (مثل إعادة تعيين كلمة المرور)
    return new Response(JSON.stringify({ message: 'نوع غير مدعوم' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
    
  } catch (error) {
    console.error('Error processing request:', error);
    
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});

// دالة إنشاء قالب البريد الإلكتروني المخصص
function generateCustomEmail(email: string, actionLink: string): string {
  return `
  <!DOCTYPE html>
  <html dir="rtl" lang="ar">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>تفعيل حسابك في ST🍕 Eat</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap');
      body {
        font-family: 'Tajawal', sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f9f9f9;
        color: #333;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
      }
      .header {
        text-align: center;
        padding: 20px 0;
        border-bottom: 2px solid #f5f5f5;
      }
      .header img {
        max-height: 80px;
      }
      .content {
        padding: 30px 20px;
        line-height: 1.6;
      }
      .button {
        display: block;
        width: 200px;
        margin: 30px auto;
        padding: 15px 20px;
        background-color: #FF5722;
        color: white;
        text-align: center;
        text-decoration: none;
        font-weight: bold;
        border-radius: 50px;
        box-shadow: 0 4px 8px rgba(255, 87, 34, 0.3);
        transition: all 0.3s ease;
      }
      .button:hover {
        background-color: #E64A19;
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(255, 87, 34, 0.4);
      }
      .footer {
        text-align: center;
        padding: 20px;
        color: #777;
        font-size: 14px;
        border-top: 2px solid #f5f5f5;
      }
      .emoji {
        font-size: 24px;
        margin: 0 5px;
        vertical-align: middle;
      }
      .highlights {
        display: flex;
        justify-content: space-around;
        margin: 30px 0;
        flex-wrap: wrap;
      }
      .highlight-item {
        text-align: center;
        width: 30%;
        margin-bottom: 15px;
      }
      .highlight-icon {
        font-size: 36px;
        margin-bottom: 10px;
      }
      @media only screen and (max-width: 600px) {
        .container {
          border-radius: 0;
        }
        .highlight-item {
          width: 100%;
          margin-bottom: 20px;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>ST<span class="emoji">🍕</span> Eat</h1>
        <p>رحلة الطعام اللذيذ تبدأ من هنا!</p>
      </div>
      
      <div class="content">
        <h2>مرحباً بك في عائلتنا!</h2>
        
        <p>شكراً لتسجيلك في ST<span class="emoji">🍕</span> Eat، منصة الطعام الأولى في المنطقة.</p>
        
        <p>لتفعيل حسابك والبدء في استكشاف عالم من النكهات المميزة، يرجى النقر على الزر أدناه:</p>
        
        <a href="${actionLink}" class="button">تفعيل الحساب</a>
        
        <div class="highlights">
          <div class="highlight-item">
            <div class="highlight-icon">🍔</div>
            <div>وجبات متنوعة</div>
          </div>
          <div class="highlight-item">
            <div class="highlight-icon">🚚</div>
            <div>توصيل سريع</div>
          </div>
          <div class="highlight-item">
            <div class="highlight-icon">💰</div>
            <div>عروض حصرية</div>
          </div>
        </div>
        
        <p>إذا لم تقم بالتسجيل في خدمتنا، يمكنك تجاهل هذه الرسالة.</p>
        
        <p>نحن متحمسون لانضمامك إلينا!</p>
      </div>
      
      <div class="footer">
        <p>حقوق النشر © 2025 ST🍕 Eat. جميع الحقوق محفوظة.</p>
        <p>هذه الرسالة آلية، يرجى عدم الرد عليها مباشرة.</p>
      </div>
    </div>
  </body>
  </html>
  `;
}
