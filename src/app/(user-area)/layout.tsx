import { ReactNode } from 'react';
import SidebarContent from '@/components/ui/sidebar/sidebar-content';
import Header from '@/components/ui/header/header';

type LayoutProps = {
  children?: ReactNode;
};

type LayoutPropsExtended = {
  children?: ReactNode;
  header?: ReactNode;
};

export default function UserAreaLayout(props: LayoutProps | LayoutPropsExtended) {
    const { children } = { ...props };

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarContent />

      <div className="flex flex-col flex-1">
        <Header />

        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}

