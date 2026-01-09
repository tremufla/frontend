import Image from 'next/image';
import SidebarOption from './sidebar-button';

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
      <div className="text-stone-800 text-lg p-3 rounded-md flex items-center">
        <Image src="/logo-completo.svg" alt="T.R.E.M. logo" width={194} height={28} />
      </div>
      <nav className="mt- 4 space-y-2">
        <SidebarOption options={options} />
      </nav>
    </div>
  );
};

export default SidebarContent;
