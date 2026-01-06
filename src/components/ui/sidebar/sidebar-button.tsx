'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Map, Calendar, MapPin, type LucideIcon } from 'lucide-react';

interface SideBarOptionProps {
  options: {
    icon: string;
    name: string;
    link: string;
  }[];
}

const iconMap: Record<string, LucideIcon> = {
  'map': Map,
  'calendar': Calendar,
  'map-pin': MapPin,
};

const SidebarOption: React.FC<SideBarOptionProps> = ({ options }) => {
  const pathname = usePathname();

  return (
    <>
      {options.map(({ icon, name, link }) => {
        const Icon = iconMap[icon] ?? Map;
        return (
          <Link key={link} href={link}>
            <div className={getClass(link)}>
              <Icon className="mr-2" />
              {name}
            </div>
          </Link>
        );
      })}
    </>
  );

  function getClass(path: string) {
    const baseClass = 'flex items-center w-full p-3 rounded-md transition-colors';
    const activeClass = 'bg-gray-200 font-bold';
    const inactiveClass = 'hover:bg-gray-100';

    return `${baseClass} ${pathname === path ? activeClass : inactiveClass}`;
  }
};

export default SidebarOption;
