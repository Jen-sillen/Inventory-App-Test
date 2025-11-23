import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataProvider } from "./context/DataContext";
import Layout from "./components/Layout";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import OverallMetricsSales from "./pages/OverallMetricsSales";
import VendorDealerSalesHistory from "./pages/VendorDealerSalesHistory";
import FullTransactionLog from "./pages/FullTransactionLog";
import InventorySnapshot from "./pages/InventorySnapshot";
import IDsSKUsQRs from "./pages/IDsSKUsQRs";
import TodaysTransactions from "./pages/TodaysTransactions";
import ManageData from "./pages/ManageData"; // New import

// Action Pages
import NewSale from "./pages/actions/NewSale";
import BulkPurchase from "./pages/actions/BulkPurchase";
import TrackDelivery from "./pages/actions/TrackDelivery";
import MoveInventory from "./pages/actions/MoveInventory";
import BreakBulkProduct from "./pages/actions/BreakBulkProduct";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DataProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/overall-metrics-sales" element={<OverallMetricsSales />} />
              <Route path="/vendor-dealer-sales" element={<VendorDealerSalesHistory />} />
              <Route path="/transaction-log" element={<FullTransactionLog />} />
              <Route path="/inventory-snapshot" element={<InventorySnapshot />} />
              <Route path="/ids-skus-qrs" element={<IDsSKUsQRs />} />
              <Route path="/todays-transactions" element={<TodaysTransactions />} />
              <Route path="/manage-data" element={<ManageData />} /> {/* New route */}
              {/* Action Routes */}
              <Route path="/actions/new-sale" element={<NewSale />} />
              <Route path="/actions/bulk-purchase" element={<BulkPurchase />} />
              <Route path="/actions/track-delivery" element={<TrackDelivery />} />
              <Route path="/actions/move-inventory" element={<MoveInventory />} />
              <Route path="/actions/break-bulk-product" element={<BreakBulkProduct />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </DataProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;