
import React from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const OrderDetailsSkeleton: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <Skeleton className="h-12 w-48 mb-8" />
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-32" />
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-36 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetailsSkeleton;
