'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Map, Calendar, type LucideIcon, MapPinned, Info, UserRound } from 'lucide-react';

interface SideBarOptionProps {
  options: {
    icon: string;
    name: string;
    link: string;
  }[];
}

const iconMap: Record<string, LucideIcon> = {
  map: Map,
  calendar: Calendar,
  'map-pinned': MapPinned,
  info: Info,
  'user-round': UserRound,
};

const SidebarOption: React.FC<SideBarOptionProps> = ({ options }) => {
  const pathname = usePathname();

  function getClass(path: string) {
    const isActive = pathname === path;

    const base = 'flex items-center w-full gap-3 px-4 py-3 rounded-lg transition-colors whitespace-nowrap';
    const active = 'bg-orange-500 text-white font-medium shadow-sm';

    const inactive = 'text-stone-700 hover:bg-orange-500 hover:text-white';

    return `${base} ${isActive ? active : inactive}`;
  }

  return (
    <>
      {options.map(({ icon, name, link }) => {
        const Icon = iconMap[icon] ?? Map;

        return (
          <Link key={link} href={link} className="block">
            <div className={getClass(link)}>
              <Icon className="w-5 h-5 shrink-0" />
              <span className="text-sm leading-none">{name}</span>
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default SidebarOption;
