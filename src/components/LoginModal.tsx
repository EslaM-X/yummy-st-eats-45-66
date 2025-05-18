
import React, { useState } from 'react';
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication (would connect to backend in real implementation)
    setTimeout(() => {
      setIsLoading(false);
      if (isSignUp) {
        toast.success('تم إنشاء الحساب بنجاح! يرجى تسجيل الدخول');
        setIsSignUp(false);
      } else {
        toast.success('تم تسجيل الدخول بنجاح');
        onClose();
      }
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] rounded-lg p-6 bg-white dark:bg-gray-900">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white text-center">
            {isSignUp ? 'إنشاء حساب جديد' : 'تسجيل الدخول'}
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400 text-center mt-2">
            {isSignUp 
              ? 'أنشئ حسابك للوصول إلى جميع مميزات التطبيق'
              : 'أدخل بيانات حسابك للوصول إلى جميع مميزات التطبيق'
            }
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input
              id="email"
              type="email" 
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
              dir="ltr"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">كلمة المرور</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
              dir="ltr"
            />
          </div>
          <DialogFooter className="flex flex-col gap-2 sm:gap-0">
            <Button 
              type="submit" 
              className="w-full bg-yellow-700 hover:bg-yellow-800 text-white"
              disabled={isLoading}
            >
              {isLoading ? 'جاري التحميل...' : isSignUp ? 'إنشاء حساب' : 'تسجيل الدخول'}
            </Button>
            <div className="text-center mt-3">
              <button
                type="button"
                className="text-yellow-700 dark:text-yellow-500 hover:underline text-sm"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? 'لديك حساب بالفعل؟ سجل الدخول' : 'ليس لديك حساب؟ سجل الآن'}
              </button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
