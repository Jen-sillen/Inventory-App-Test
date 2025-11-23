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
  // Add specific functions for CRUD operations here as needed
  addEmployee: (employee: Employee) => void;
  addVendor: (vendor: Vendor) => void;
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

  const addVendor = (vendor: Vendor) => {
    setAppState(prevState => ({
      ...prevState,
      vendors: [...prevState.vendors, vendor],
    }));
  };

  // Add more specific CRUD functions here for other entities

  const contextValue: DataContextType = {
    data: appState,
    setAppState,
    addEmployee,
    addVendor,
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