import SidebarOption from "./sidebar-button";

const options = [
  { icon: "map", name: "Mapa de Pulverizações", link: "/map-ssr" },
  { icon: "calendar", name: "Calendário de Pulverizações", link: "/schedule" },
  { icon: "map-pin", name: "Meus locais", link: "/property" },
  { icon: "info", name: "Sobre o T.R.E.M", link: "/property" },
  { icon: "user-round", name: "Minha conta", link: "/property" },
];

const SidebarContent: React.FC = () => {
  return (
    <div className="hidden md:block w-1/4 bg-white shadow-md p-4">
      <div className="bg-orange-400 text-white font-bold text-lg p-3 rounded-md flex items-center">
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2 text-lg">
          T
        </div>
        T.R.E.M.
      </div>
      <nav className="mt-4 space-y-2">
        <SidebarOption options={options} />
      </nav>
    </div>
  );
};

export default SidebarContent;
