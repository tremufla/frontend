import Image from 'next/image';
import SidebarOption from './sidebar-button';
import { Menu } from 'lucide-react';

const options = [
  { icon: 'map', name: 'Mapa de Pulverizações', link: '/map-ssr' },
  { icon: 'calendar', name: 'Calendário de Pulverizações', link: '/schedule' },
  { icon: 'map-pin', name: 'Meus locais', link: '/property' },
  { icon: 'info', name: 'Sobre o T.R.E.M', link: '/info' },
  { icon: 'user-round', name: 'Minha conta', link: '/user' },
];

const SidebarContent: React.FC = () => {
  return (
    <div className="hidden md:block w-1/5 bg-white shadow-md p-4">
      <nav className="space-y-2">
        <div>
          <button
        type="button"
        className="flex items-center w-full gap-3 px-4 py-3 rounded-lg transition-colors whitespace-nowrap text-stone-700 min-h-[40px] cursor-default"
          >
        <Menu className="w-5 h-5 shrink-0 cursor-pointer" />
        <div className="flex items-center h-5">
          <Image src="/logo-completo.svg" alt="T.R.E.M. logo" width={160} height={20} priority />
        </div>
          </button>
        </div>
        <SidebarOption options={options} />
      </nav>
    </div>
  );
};

export default SidebarContent;
