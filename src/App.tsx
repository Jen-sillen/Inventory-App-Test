import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataProvider } from "./context/DataContext";
import Layout from "./components/Layout";

// Pages
// import Index from "./pages/Index"; // Removed Index page import
import NotFound from "./pages/NotFound";
import OverallMetricsSales from "./pages/OverallMetricsSales";
import VendorDealerSalesHistory from "./pages/VendorDealerSalesHistory";
import FullTransactionLog from "./pages/FullTransactionLog";
import InventorySnapshot from "./pages/InventorySnapshot";
// import IDsSKUsQRs from "./pages/IDsSKUsQRs"; // Removed IDsSKUsQRs import
// import TodaysTransactions from "./pages/TodaysTransactions"; // Removed TodaysTransactions import
import ManageData from "./pages/ManageData";

// Action Pages
import NewSale from "./pages/actions/NewSale";
import BulkPurchase from "./pages/actions/BulkPurchase";
// import TrackDelivery from "./pages/actions/TrackDelivery"; // Removed TrackDelivery import
import MoveInventory from "./pages/actions/MoveInventory";
import BreakBulkProduct from "./pages/actions/BreakBulkProduct";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <DataProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<OverallMetricsSales />} /> {/* OverallMetricsSales is now the landing page */}
              <Route path="/overall-metrics-sales" element={<OverallMetricsSales />} />
              <Route path="/vendor-dealer-sales" element={<VendorDealerSalesHistory />} />
              <Route path="/transaction-log" element={<FullTransactionLog />} />
              <Route path="/inventory-snapshot" element={<InventorySnapshot />} />
              {/* <Route path="/ids-skus-qrs" element={<IDsSKUsQRs />} /> */} {/* Removed IDsSKUsQRs route */}
              {/* <Route path="/todays-transactions" element={<TodaysTransactions />} /> */} {/* Removed TodaysTransactions route */}
              <Route path="/manage-data" element={<ManageData />} />
              {/* Action Routes */}
              <Route path="/actions/new-sale" element={<NewSale />} />
              <Route path="/actions/bulk-purchase" element={<BulkPurchase />} />
              {/* <Route path="/actions/track-delivery" element={<TrackDelivery />} /> */} {/* Removed TrackDelivery route */}
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