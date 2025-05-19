
import React, { useState } from 'react';
import { Search, Plus, Filter, Edit, Trash, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';

interface Restaurant {
  id: string;
  name: string;
  type: string;
  address: string;
  status: 'مفتوح' | 'مغلق' | 'معلق';
  rating: number;
  orders: number;
  joiningDate: string;
  imageUrl: string;
}

const AdminRestaurants: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  const { toast } = useToast();

  // Mock restaurants data
  const mockRestaurants: Restaurant[] = [
    {
      id: 'REST-1001',
      name: 'مطعم البيت السوري',
      type: 'شرق أوسطي',
      address: 'شارع العليا، الرياض',
      status: 'مفتوح',
      rating: 4.8,
      orders: 1245,
      joiningDate: '2023-03-15',
      imageUrl: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      id: 'REST-1002',
      name: 'بيتزا الشام',
      type: 'إيطالي',
      address: 'شارع التحلية، جدة',
      status: 'مفتوح',
      rating: 4.6,
      orders: 982,
      joiningDate: '2023-05-22',
      imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      id: 'REST-1003',
      name: 'برجر فاكتوري',
      type: 'سريع',
      address: 'حي النخيل، الرياض',
      status: 'مغلق',
      rating: 4.5,
      orders: 876,
      joiningDate: '2023-07-10',
      imageUrl: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      id: 'REST-1004',
      name: 'شاورما على كيفك',
      type: 'شرق أوسطي',
      address: 'شارع الملك فهد، الدمام',
      status: 'معلق',
      rating: 4.4,
      orders: 723,
      joiningDate: '2023-09-05',
      imageUrl: 'https://images.unsplash.com/photo-1613514785940-daed07799d9b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      id: 'REST-1005',
      name: 'مطعم الأصيل',
      type: 'هندي',
      address: 'حي العزيزية، الخبر',
      status: 'مفتوح',
      rating: 4.7,
      orders: 1051,
      joiningDate: '2023-02-18',
      imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
  ];

  // Filter restaurants based on search term and tab
  const filteredRestaurants = mockRestaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          restaurant.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          restaurant.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = selectedTab === 'all' ||
                      (selectedTab === 'open' && restaurant.status === 'مفتوح') ||
                      (selectedTab === 'closed' && restaurant.status === 'مغلق') ||
                      (selectedTab === 'suspended' && restaurant.status === 'معلق');
    
    return matchesSearch && matchesTab;
  });

  // Functions for actions
  const handleEditRestaurant = (restaurantId: string) => {
    toast({
      title: "تعديل المطعم",
      description: `تم فتح تعديل المطعم ${restaurantId}`,
    });
  };

  const handleDeleteRestaurant = (restaurantId: string) => {
    toast({
      title: "حذف المطعم",
      description: `تم حذف المطعم ${restaurantId}`,
      variant: "destructive"
    });
  };

  const handleAddNewRestaurant = () => {
    toast({
      title: "إضافة مطعم",
      description: "تم فتح نموذج إضافة مطعم جديد",
    });
  };

  // Get status badge style
  const getStatusBadge = (status: Restaurant['status']) => {
    switch (status) {
      case 'مفتوح':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'مغلق':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'معلق':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle>المطاعم</CardTitle>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="بحث عن مطعم..."
                className="pl-8 pr-4 w-full"
              />
            </div>
            <Button onClick={handleAddNewRestaurant} className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
              مطعم جديد
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
            <TabsList className="grid grid-cols-4 w-full max-w-md">
              <TabsTrigger value="all">الكل</TabsTrigger>
              <TabsTrigger value="open">مفتوح</TabsTrigger>
              <TabsTrigger value="closed">مغلق</TabsTrigger>
              <TabsTrigger value="suspended">معلق</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.length > 0 ? (
              filteredRestaurants.map((restaurant) => (
                <Card key={restaurant.id} className="overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={restaurant.imageUrl} 
                      alt={restaurant.name}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute top-2 left-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(restaurant.status)}`}>
                        {restaurant.status}
                      </span>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/60 rounded-full px-2 py-1 flex items-center">
                      <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1 rtl:mr-0 rtl:ml-1" />
                      <span className="text-xs font-medium text-white">{restaurant.rating}</span>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{restaurant.name}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{restaurant.id}</p>
                      </div>
                      <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                        {restaurant.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{restaurant.address}</p>
                    <div className="flex justify-between items-center mt-4">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">الطلبات</p>
                        <p className="font-semibold">{restaurant.orders}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">تاريخ الإنضمام</p>
                        <p className="font-semibold">{restaurant.joiningDate}</p>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2 rtl:space-x-reverse mt-4">
                      <Button variant="outline" size="sm" onClick={() => handleEditRestaurant(restaurant.id)}>
                        <Edit className="h-4 w-4 mr-1 rtl:mr-0 rtl:ml-1" />
                        تعديل
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteRestaurant(restaurant.id)}>
                        <Trash className="h-4 w-4 mr-1 rtl:mr-0 rtl:ml-1" />
                        حذف
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-3 py-8 text-center text-gray-500 dark:text-gray-400">
                لا يوجد مطاعم مطابقة لمعايير البحث
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminRestaurants;
