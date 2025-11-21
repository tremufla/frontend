"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SideBarOptionProps {
  options: {
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
          <div className={getClass(option.link)}>{option.name}</div>
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
};

export default SidebarOption;
