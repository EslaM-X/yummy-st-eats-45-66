
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface BottomNavItemProps {
  path: string;
  label: string;
  icon: LucideIcon;
  isActive: boolean;
  showBadge?: boolean;
  badgeCount?: number;
}

export const BottomNavItem: React.FC<BottomNavItemProps> = ({
  path,
  label,
  icon: Icon,
  isActive,
  showBadge,
  badgeCount,
}) => {
  return (
    <Link
      to={path}
      className={cn(
        'flex flex-col items-center justify-center py-2 px-3 relative transition-all',
        isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
      )}
    >
      {isActive && (
        <motion.div
          layoutId="bubble"
          className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-full -z-10"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      <div className="relative">
        <Icon className="h-5 w-5 mb-1" />
        {showBadge && (
          <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 h-2 w-2 bg-green-500 rounded-full"></span>
        )}
        {typeof badgeCount === 'number' && badgeCount > 0 && (
          <span className="absolute -top-1 -right-1 text-xs bg-primary text-white rounded-full h-4 w-4 flex items-center justify-center">
            {badgeCount}
          </span>
        )}
      </div>
      <span className="text-xs font-medium">{label}</span>
    </Link>
  );
};

export default BottomNavItem;
