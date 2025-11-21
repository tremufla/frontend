import { ReactNode } from "react";
import MainContent from "@/components/ui/content/main-content";
import SidebarContent from "@/components/ui/sidebar/sidebar-content";

type LayoutProps = {
  children?: ReactNode;
};

type LayoutPropsExtended = {
  children?: ReactNode;
  header?: ReactNode;
};

export default function UserAreaLayout(
  props: LayoutProps | LayoutPropsExtended
) {
  const { children, header } = {
    ...props,
    header: undefined,
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <SidebarContent />
      <div className="w-full md:w-3/4 p-4 flex flex-col gap-6">
        {header}
        <MainContent>{children}</MainContent>
      </div>
    </div>
  );
}
