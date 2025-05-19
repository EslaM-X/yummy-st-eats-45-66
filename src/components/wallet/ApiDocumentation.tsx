
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Copy, Lock } from 'lucide-react';

const ApiDocumentation: React.FC = () => {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "تم النسخ",
      description: "تم نسخ النص إلى الحافظة",
    });
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="border-b bg-gray-50 dark:bg-gray-800/50">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl flex items-center">
              <span className="ml-2 p-1 bg-teal-100 dark:bg-teal-900/30 rounded-md">
                <CreditCard className="h-5 w-5 text-teal-600 dark:text-teal-400" />
              </span>
              API بطاقات ST الافتراضية
            </CardTitle>
            <CardDescription>
              دليل استخدام واجهة برمجة التطبيقات لمعاملات البطاقات الافتراضية
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={() => toast({
            title: "تحميل الوثائق",
            description: "جاري تحميل الوثائق الكاملة...",
          })}>
            تحميل PDF
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="authentication" className="w-full">
          <TabsList className="grid w-full grid-cols-3 rounded-none border-b">
            <TabsTrigger value="authentication">المصادقة</TabsTrigger>
            <TabsTrigger value="payment">الدفع</TabsTrigger>
            <TabsTrigger value="refund">الاسترداد</TabsTrigger>
          </TabsList>
          
          <TabsContent value="authentication" className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium flex items-center">
                  <Lock className="h-4 w-4 mr-2" />
                  المصادقة (Authentication)
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  تتطلب جميع الطلبات مفتاح API صالح يُرسل في هيدر x-api-key. أي طلب بدون مفتاح صحيح سيُرجع خطأ 401 أو 403.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md">
                <div className="flex justify-between">
                  <p className="text-sm font-mono">Header: x-api-key</p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 px-2"
                    onClick={() => copyToClipboard('x-api-key: your_api_key_here')}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    نسخ
                  </Button>
                </div>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <h4 className="font-medium mb-2">مثال HTTP Request:</h4>
                <pre className="bg-gray-950 text-gray-100 p-3 rounded-md text-xs overflow-auto">
                  {`curl -X POST https://api.steats.com/st-vpc/v1/transactions \
  -H "x-api-key: your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{"card_number": "1234567890123456", "cvv": "123", "amount": 100.50, "order_id": 9876}'`}
                </pre>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => copyToClipboard(`curl -X POST https://api.steats.com/st-vpc/v1/transactions \
  -H "x-api-key: your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{"card_number": "1234567890123456", "cvv": "123", "amount": 100.50, "order_id": 9876}'`)}
                >
                  <Copy className="h-3 w-3 mr-1" />
                  نسخ الأمر
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="payment" className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">💳 إنشاء معاملة دفع</h3>
                <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-500 dark:text-gray-400 mt-1">
                  <span className="font-semibold">Method:</span>
                  <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-0.5 rounded">POST</span>
                  <span className="font-semibold">Path:</span>
                  <span className="font-mono">/st-vpc/v1/transactions</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  سحب مبلغ من البطاقة وإضافته إلى رصيد محفظة التاجر.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">📥 جسم الطلب (JSON):</h4>
                <pre className="bg-gray-950 text-gray-100 p-3 rounded-md text-xs overflow-auto">
                  {`{
  "card_number": "1234 5678 9012 3456",
  "cvv": "123",
  "amount": 100.50,
  "order_id": 9876
}`}
                </pre>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => copyToClipboard(`{
  "card_number": "1234 5678 9012 3456",
  "cvv": "123",
  "amount": 100.50,
  "order_id": 9876
}`)}
                >
                  <Copy className="h-3 w-3 mr-1" />
                  نسخ
                </Button>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">✅ الاستجابة الناجحة (200):</h4>
                <pre className="bg-gray-950 text-gray-100 p-3 rounded-md text-xs overflow-auto">
                  {`{
  "transaction_id": 512,
  "status": "frozen"
}`}
                </pre>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">❌ أمثلة على أخطاء (400):</h4>
                <pre className="bg-gray-950 text-gray-100 p-3 rounded-md text-xs overflow-auto">
                  {`{
  "code": "invalid_card",
  "message": "البطاقة غير صالحة أو معطّلة.",
  "data": {
    "status": 400
  }
}`}
                </pre>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="refund" className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">🔄 إنشاء معاملة استرداد</h3>
                <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-500 dark:text-gray-400 mt-1">
                  <span className="font-semibold">Method:</span>
                  <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-0.5 rounded">POST</span>
                  <span className="font-semibold">Path:</span>
                  <span className="font-mono">/st-vpc/v1/refund</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  إعادة مبلغ لبطاقة ST وخصم من رصيد المحفظة.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">📥 جسم الطلب (JSON):</h4>
                <pre className="bg-gray-950 text-gray-100 p-3 rounded-md text-xs overflow-auto">
                  {`{
  "order_id": 9876,
  "amount": 50.00
}`}
                </pre>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => copyToClipboard(`{
  "order_id": 9876,
  "amount": 50.00
}`)}
                >
                  <Copy className="h-3 w-3 mr-1" />
                  نسخ
                </Button>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">✅ الاستجابة الناجحة (200):</h4>
                <pre className="bg-gray-950 text-gray-100 p-3 rounded-md text-xs overflow-auto">
                  {`{
  "status": "success",
  "refund_txn_id": 513,
  "new_wallet_bal": 1250.75,
  "new_card_bal": 75.50
}`}
                </pre>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-md border border-blue-100 dark:border-blue-900/30">
                <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-1">💡 ملاحظات هامة:</h4>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  جميع المبالغ بدقة 5 خانات عشرية، وحالة الطلب في WooCommerce تُحدّث إلى refunded.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ApiDocumentation;
