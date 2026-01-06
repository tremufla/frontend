"use client";

import { Icon, IconNode } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SideBarOptionProps {
  options: {
    icon: string | IconNode;
    name: string;
    link: string;
  }[];
}

const SidebarOption: React.FC<SideBarOptionProps> = ({ options }) => {
  const pathname = usePathname();

  return (
    <>
      {options.map((option) => (
        <Link key={option.link} href={option.link}>
          <div className={getClass(option.link)}>{getIconComponent(option.icon)} {option.name}</div>
        </Link>
      ))}
    </>
  );

  function getClass(path: string) {
    const baseClass = "flex items-center w-full p-3 rounded-md transition-colors";
    const activeClass = "bg-gray-200 font-bold";
    const inactiveClass = "hover:bg-gray-100";

    return `${baseClass} ${pathname === path ? activeClass : inactiveClass}`;
  }

  function getIconComponent(icon: string | IconNode) {
    if (typeof icon === "string") return <span>{icon}</span>;

    return <Icon iconNode={icon} />;
  }
};

export default SidebarOption;
