
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { LogIn, LogOut, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const AuthButtons: React.FC = () => {
  const { user, profile, signOut, isLoading } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/auth');
  };

  if (isLoading) {
    return (
      <Button variant="ghost" disabled className="h-9 w-9 p-0">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
      </Button>
    );
  }

  if (!user) {
    return (
      <Button variant="outline" size="sm" onClick={handleSignInClick}>
        <LogIn className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
        {language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative h-9 w-9 rounded-full p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src={profile?.avatar_url} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {profile?.username ? profile.username.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{profile?.full_name || user.email}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={() => navigate('/profile')}
          className="cursor-pointer"
        >
          <User className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
          {language === 'ar' ? 'الملف الشخصي' : 'Profile'}
        </DropdownMenuItem>
        {profile?.user_type === 'restaurant_owner' && (
          <DropdownMenuItem 
            onClick={() => navigate('/my-restaurant')}
            className="cursor-pointer"
          >
            <User className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
            {language === 'ar' ? 'مطعمي' : 'My Restaurant'}
          </DropdownMenuItem>
        )}
        {profile?.user_type === 'admin' && (
          <DropdownMenuItem 
            onClick={() => navigate('/admin')}
            className="cursor-pointer"
          >
            <User className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
            {language === 'ar' ? 'لوحة التحكم' : 'Admin Dashboard'}
          </DropdownMenuItem>
        )}
        <DropdownMenuItem 
          onClick={() => navigate('/orders')}
          className="cursor-pointer"
        >
          <User className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
          {language === 'ar' ? 'طلباتي' : 'My Orders'}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={signOut}
          className="cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
        >
          <LogOut className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
          {language === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
