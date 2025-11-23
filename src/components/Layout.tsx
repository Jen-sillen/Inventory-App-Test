import React from 'react';
import SidebarNav from './SidebarNav';
import { MadeWithDyad } from './made-with-dyad';
import { Button } from '@/components/ui/button';
import { MenuIcon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {isMobile ? (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="absolute top-4 left-4 z-50 md:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-4 bg-white dark:bg-gray-800">
            <SidebarNav />
          </SheetContent>
        </Sheet>
      ) : (
        <SidebarNav />
      )}
      <div className="flex flex-col flex-1">
        <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <h1 className="text-2xl font-bold">Inventory Management</h1>
          {/* Add any header actions/user info here */}
        </header>
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
        <footer className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <MadeWithDyad />
        </footer>
      </div>
    </div>
  );
};

export default Layout;