import React, { createContext, useContext } from 'react';
import useLocalStorage from '@/hooks/use-local-storage';
import {
  AppState,
  Employee,
  Dealer,
  Vendor,
  ShelfLocation,
  Device,
  Product,
  BulkDelivery,
  BulkBreaking,
  InventoryMovement,
  SaleTransaction,
  EmployeePayment,
} from '@/types/inventory';

const LOCAL_STORAGE_KEY = 'inventory-app-data';

const initialAppState: AppState = {
  employees: [],
  dealers: [],
  vendors: [],
  shelfLocations: [],
  devices: [],
  products: [],
  bulkDeliveries: [],
  bulkBreakings: [],
  inventoryMovements: [],
  saleTransactions: [],
  employeePayments: [],
};

interface DataContextType {
  data: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  addEmployee: (employee: Employee) => void;
  addDealer: (dealer: Dealer) => void;
  addVendor: (vendor: Vendor) => void;
  addShelfLocation: (location: ShelfLocation) => void;
  addDevice: (device: Device) => void;
  addProduct: (product: Product) => void;
  // ... more functions will be added as we build out features
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appState, setAppState] = useLocalStorage<AppState>(LOCAL_STORAGE_KEY, initialAppState);

  const addEmployee = (employee: Employee) => {
    setAppState(prevState => ({
      ...prevState,
      employees: [...prevState.employees, employee],
    }));
  };

  const addDealer = (dealer: Dealer) => {
    setAppState(prevState => ({
      ...prevState,
      dealers: [...prevState.dealers, dealer],
    }));
  };

  const addVendor = (vendor: Vendor) => {
    setAppState(prevState => ({
      ...prevState,
      vendors: [...prevState.vendors, vendor],
    }));
  };

  const addShelfLocation = (location: ShelfLocation) => {
    setAppState(prevState => ({
      ...prevState,
      shelfLocations: [...prevState.shelfLocations, location],
    }));
  };

  const addDevice = (device: Device) => {
    setAppState(prevState => ({
      ...prevState,
      devices: [...prevState.devices, device],
    }));
  };

  const addProduct = (product: Product) => {
    setAppState(prevState => ({
      ...prevState,
      products: [...prevState.products, product],
    }));
  };

  const contextValue: DataContextType = {
    data: appState,
    setAppState,
    addEmployee,
    addDealer,
    addVendor,
    addShelfLocation,
    addDevice,
    addProduct,
  };

  return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};