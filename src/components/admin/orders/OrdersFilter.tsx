
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface OrdersFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedTab: string;
  onTabChange: (value: string) => void;
  dateFilter: string;
  onDateFilterChange: (value: string) => void;
}

const OrdersFilter: React.FC<OrdersFilterProps> = ({
  searchTerm,
  onSearchChange,
  selectedTab,
  onTabChange,
  dateFilter,
  onDateFilterChange
}) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="بحث عن طلب..."
            className="pl-8 pr-4 w-full"
          />
        </div>
        <Select value={dateFilter} onValueChange={onDateFilterChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="تصفية حسب التاريخ" />
          </SelectTrigger>
          <SelectContent position="popper" align="end" sideOffset={4} className="w-[180px] bg-white dark:bg-gray-800 z-50">
            <SelectItem value="all">جميع الأيام</SelectItem>
            <SelectItem value="today">اليوم</SelectItem>
            <SelectItem value="yesterday">الأمس</SelectItem>
            <SelectItem value="week">آخر 7 أيام</SelectItem>
            <SelectItem value="month">آخر 30 يوم</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Tabs value={selectedTab} onValueChange={onTabChange} className="mb-6 fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-800 p-2 shadow-lg w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full">
          <TabsTrigger value="all">الكل</TabsTrigger>
          <TabsTrigger value="new">جديد</TabsTrigger>
          <TabsTrigger value="preparing">قيد التحضير</TabsTrigger>
          <TabsTrigger value="delivering">قيد التوصيل</TabsTrigger>
          <TabsTrigger value="completed">مكتمل</TabsTrigger>
          <TabsTrigger value="cancelled">ملغي</TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  );
};

export default OrdersFilter;
