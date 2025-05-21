
import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { Resend } from 'npm:resend@2.0.0';

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
    const { to, subject, html } = await req.json();
    
    if (!to || !subject || !html) {
      throw new Error('Missing required fields: to, subject, or html');
    }
    
    console.log(`Sending email to ${to} with subject: ${subject}`);
    
    // إرسال البريد الإلكتروني
    const { data, error } = await resend.emails.send({
      from: 'ST🍕 Eat <onboarding@resend.dev>', // قم بتغيير هذا إلى نطاق البريد الإلكتروني الخاص بك
      to: [to],
      subject: subject,
      html: html,
    });
    
    if (error) {
      console.error('Error sending email:', error);
      throw error;
    }
    
    console.log('Email sent successfully:', data);
    
    return new Response(JSON.stringify({ success: true, data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
    
  } catch (error) {
    console.error('Error sending email:', error);
    
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
