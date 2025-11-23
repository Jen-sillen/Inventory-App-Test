import React from 'react';
import SidebarNav from './SidebarNav';
import { MadeWithDyad } from './made-with-dyad';
// Removed unused imports for Button, MenuIcon, Sheet, SheetContent, SheetTrigger as they are not directly used in Layout's JSX
// Removed unused import for useIsMobile as SidebarNav handles its own responsiveness

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  console.log("Layout component is rendering!"); // Diagnostic log
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* SidebarNav now handles its own mobile/desktop rendering */}
      <SidebarNav /> 
      <div className="flex flex-col flex-1">
        <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <h1 className="text-2xl font-bold">Inventory Management</h1>
          {/* Add any header actions/user info here */}
        </header>
        {/* Temporary diagnostic message */}
        <div className="p-2 bg-yellow-200 text-yellow-800 text-center">
          Layout is rendering. If you see this, the issue is likely within the page content.
        </div>
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