
import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SideMenuItemProps {
  path: string;
  label: string;
  icon: LucideIcon;
  isActive: boolean;
  highlight?: boolean;
  onClick?: () => void;
}

export const SideMenuItem: React.FC<SideMenuItemProps> = ({
  path,
  label,
  icon: Icon,
  isActive,
  highlight,
  onClick,
}) => {
  return (
    <Link
      to={path}
      className={cn(
        'flex items-center px-4 py-2.5 rounded-md transition-colors',
        isActive 
          ? 'bg-primary/10 text-primary'
          : 'hover:bg-primary/5',
        highlight && 'font-medium'
      )}
      onClick={onClick}
    >
      <Icon className="h-4 w-4 mr-3 rtl:ml-3 rtl:mr-0" />
      <span>{label}</span>
    </Link>
  );
};

export default SideMenuItem;
