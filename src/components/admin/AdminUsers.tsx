
import React, { useState } from 'react';
import { Search, Plus, Filter, Edit, Trash, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'نشط' | 'محظور' | 'معلق';
  role: 'مستخدم' | 'مدير مطعم' | 'مشرف';
  orders: number;
  joinDate: string;
}

const AdminUsers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  const { toast } = useToast();

  // Mock users data
  const mockUsers: User[] = [
    {
      id: 'USR-1542',
      name: 'أحمد محمد',
      email: 'ahmed@example.com',
      phone: '0561234567',
      status: 'نشط',
      role: 'مستخدم',
      orders: 14,
      joinDate: '2023-05-12'
    },
    {
      id: 'USR-1867',
      name: 'نورة سعد',
      email: 'noura@example.com',
      phone: '0598765432',
      status: 'نشط',
      role: 'مستخدم',
      orders: 27,
      joinDate: '2023-08-24'
    },
    {
      id: 'USR-2104',
      name: 'خالد العمري',
      email: 'khalid@example.com',
      phone: '0551122334',
      status: 'محظور',
      role: 'مستخدم',
      orders: 3,
      joinDate: '2024-01-05'
    },
    {
      id: 'USR-1298',
      name: 'عبدالله سامي',
      email: 'abdullah@example.com',
      phone: '0505443322',
      status: 'معلق',
      role: 'مدير مطعم',
      orders: 0,
      joinDate: '2023-11-19'
    },
    {
      id: 'USR-2356',
      name: 'سارة الأحمد',
      email: 'sarah@example.com',
      phone: '0533221144',
      status: 'نشط',
      role: 'مشرف',
      orders: 8,
      joinDate: '2024-02-28'
    },
    {
      id: 'USR-1954',
      name: 'محمد العتيبي',
      email: 'mohammed@example.com',
      phone: '0549876543',
      status: 'نشط',
      role: 'مستخدم',
      orders: 19,
      joinDate: '2023-07-14'
    }
  ];

  // Filter users based on search term and tab
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = selectedTab === 'all' ||
                      (selectedTab === 'active' && user.status === 'نشط') ||
                      (selectedTab === 'blocked' && user.status === 'محظور') ||
                      (selectedTab === 'suspended' && user.status === 'معلق');
    
    return matchesSearch && matchesTab;
  });

  // Functions for actions
  const handleEditUser = (userId: string) => {
    toast({
      title: "تعديل المستخدم",
      description: `تم فتح تعديل المستخدم ${userId}`,
    });
  };

  const handleDeleteUser = (userId: string) => {
    toast({
      title: "حذف المستخدم",
      description: `تم حذف المستخدم ${userId}`,
      variant: "destructive"
    });
  };

  const handleAddNewUser = () => {
    toast({
      title: "إضافة مستخدم",
      description: "تم فتح نموذج إضافة مستخدم جديد",
    });
  };

  // Get status badge style
  const getStatusBadge = (status: User['status']) => {
    switch (status) {
      case 'نشط':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'محظور':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'معلق':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getRoleBadge = (role: User['role']) => {
    switch (role) {
      case 'مستخدم':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'مدير مطعم':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 border-purple-200 dark:border-purple-800';
      case 'مشرف':
        return 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300 border-teal-200 dark:border-teal-800';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle>المستخدمين</CardTitle>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="بحث عن مستخدم..."
                className="pl-8 pr-4 w-full"
              />
            </div>
            <Button onClick={handleAddNewUser} className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
              مستخدم جديد
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
            <TabsList className="grid grid-cols-4 w-full max-w-md">
              <TabsTrigger value="all">الكل</TabsTrigger>
              <TabsTrigger value="active">نشط</TabsTrigger>
              <TabsTrigger value="blocked">محظور</TabsTrigger>
              <TabsTrigger value="suspended">معلق</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="px-4 py-3 text-right rtl:text-left">المستخدم</th>
                  <th className="px-4 py-3 text-right rtl:text-left">رقم الهاتف</th>
                  <th className="px-4 py-3 text-right rtl:text-left">الدور</th>
                  <th className="px-4 py-3 text-right rtl:text-left">الحالة</th>
                  <th className="px-4 py-3 text-right rtl:text-left">الطلبات</th>
                  <th className="px-4 py-3 text-right rtl:text-left">تاريخ الإنضمام</th>
                  <th className="px-4 py-3 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-3 rtl:mr-0 rtl:ml-3">
                            <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{user.phone}</td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className={getRoleBadge(user.role)}>
                          {user.role}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">{user.orders}</td>
                      <td className="px-4 py-3 text-sm">{user.joinDate}</td>
                      <td className="px-4 py-3">
                        <div className="flex justify-center space-x-2 rtl:space-x-reverse">
                          <Button variant="ghost" size="sm" onClick={() => handleEditUser(user.id)}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">تعديل</span>
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteUser(user.id)}>
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">حذف</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                      لا يوجد مستخدمين مطابقين لمعايير البحث
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsers;
