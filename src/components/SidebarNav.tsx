import React from 'react';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { MenuIcon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavLink {
  to: string;
  label: string;
}

const mainNavLinks: NavLink[] = [
  { to: '/overall-metrics-sales', label: 'Overall Metrics & Sales' }, // Corrected route, now effectively the landing page
  { to: '/vendor-dealer-sales', label: 'Vendor/Dealer Sales History' },
  { to: '/transaction-log', label: 'Full Transaction Log' },
  { to: '/inventory-snapshot', label: 'Inventory Snapshot' },
  { to: '/ids-skus-qrs', label: 'Full list of IDs/SKUs/QRs' },
  { to: '/todays-transactions', label: 'Today’s Transactions' },
  { to: '/manage-data', label: 'Manage Data' },
];

const actionLinks: NavLink[] = [
  { to: '/actions/new-sale', label: 'Make a new Sale' },
  { to: '/actions/bulk-purchase', label: 'Make a Bulk Purchase' },
  { to: '/actions/track-delivery', label: 'Track a Delivery' },
  { to: '/actions/move-inventory', label: 'Move Inventory' },
  { to: '/actions/break-bulk-product', label: 'Break Bulk Product' },
];

const SidebarNav: React.FC = () => {
  const isMobile = useIsMobile();

  const renderNavLinks = (links: NavLink[], title?: string) => (
    <div className="mb-6">
      {title && <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">{title}</h3>}
      <nav className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-4 bg-white dark:bg-gray-800">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Jen's Inventory</h2>
          {renderNavLinks(mainNavLinks)}
          {renderNavLinks(actionLinks, 'Actions')}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="hidden md:block w-64 bg-gray-100 dark:bg-gray-900 p-4 border-r border-gray-200 dark:border-gray-700 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Jen's Inventory</h2>
      {renderNavLinks(mainNavLinks)}
      {renderNavLinks(actionLinks, 'Actions')}
    </div>
  );
};

export default SidebarNav;