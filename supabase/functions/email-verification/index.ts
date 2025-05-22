
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Resend } from "npm:resend@2.0.0";

// إعداد headers لـ CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// إنشاء مثيل من Resend باستخدام API key
const resendApiKey = Deno.env.get('RESEND_API_KEY');
const resend = new Resend(resendApiKey);

serve(async (req) => {
  // التعامل مع طلبات CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // استخراج البيانات من الطلب
    const { email, confirmationUrl } = await req.json();
    
    if (!email || !confirmationUrl) {
      throw new Error('البريد الإلكتروني ورابط التأكيد مطلوبان');
    }
    
    console.log(`إرسال بريد تأكيد إلى ${email}`);
    
    // إرسال البريد الإلكتروني
    const { data, error } = await resend.emails.send({
      from: 'ST🍕 Eat <onboarding@resend.dev>',
      to: [email],
      subject: 'تأكيد حسابك في ST🍕 Eat',
      html: generateEmailTemplate(email, confirmationUrl),
    });
    
    if (error) {
      console.error('خطأ في إرسال البريد الإلكتروني:', error);
      throw error;
    }
    
    console.log('تم إرسال البريد الإلكتروني بنجاح:', data);
    
    return new Response(JSON.stringify({ success: true, data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
    
  } catch (error) {
    console.error('خطأ في معالجة الطلب:', error);
    
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});

function generateEmailTemplate(email: string, confirmationUrl: string): string {
  return `
  <!DOCTYPE html>
  <html dir="rtl" lang="ar">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>تأكيد حسابك في ST🍕 Eat</title>
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
      }
      .footer {
        text-align: center;
        padding: 20px;
        color: #777;
        font-size: 14px;
        border-top: 2px solid #f5f5f5;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>ST🍕 Eat</h1>
        <p>تأكيد حسابك</p>
      </div>
      
      <div class="content">
        <h2>مرحباً!</h2>
        
        <p>شكراً لتسجيلك في ST🍕 Eat، منصة الطعام الأولى في المنطقة.</p>
        
        <p>لتفعيل حسابك والبدء في استكشاف عالم من النكهات المميزة، يرجى النقر على الزر أدناه:</p>
        
        <a href="${confirmationUrl}" class="button">تفعيل الحساب</a>
        
        <p>إذا لم تقم بإنشاء حساب في خدمتنا، يمكنك تجاهل هذه الرسالة.</p>
        
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
