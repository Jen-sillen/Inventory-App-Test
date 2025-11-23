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
  ProductReceipt,
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
  productReceipts: [],
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
  addSaleTransaction: (sale: SaleTransaction) => void;
  addBulkDelivery: (delivery: BulkDelivery) => void;
  addProductReceipt: (receipt: ProductReceipt) => void;
  addInventoryMovement: (movement: InventoryMovement) => void;
  addBulkBreaking: (breaking: BulkBreaking) => void;
  updateEmployee: (oldId: string, updatedEmployee: Employee) => void;
  updateProduct: (oldSku: string, updatedProduct: Product) => void;
  updateSaleTransaction: (oldId: string, updatedSale: SaleTransaction) => void; // New
  updateBulkDelivery: (oldId: string, updatedDelivery: BulkDelivery) => void; // New
  // ... more functions will be added as we build out features
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appState, setAppState] = useLocalStorage<AppState>(LOCAL_STORAGE_KEY, initialAppState);

  // Add a console log here to inspect appState
  React.useEffect(() => {
    console.log("DataContext initialized with appState:", JSON.stringify(appState, null, 2));
  }, [appState]);

  const addEmployee = (employee: Employee) => {
    setAppState(prevState => ({
      ...prevState,
      employees: [...prevState.employees, employee],
    }));
  };

  const updateEmployee = (oldId: string, updatedEmployee: Employee) => {
    setAppState(prevState => {
      const newId = updatedEmployee.id;
      let newState = { ...prevState };

      // Update the employee in the main list
      newState.employees = prevState.employees.map(emp =>
        emp.id === oldId ? updatedEmployee : emp
      );

      // Update employeeId in all relevant transactions if ID changed
      if (oldId !== newId) {
        newState.saleTransactions = prevState.saleTransactions.map(t =>
          t.employeeId === oldId ? { ...t, employeeId: newId } : t
        );
        newState.bulkDeliveries = prevState.bulkDeliveries.map(t =>
          t.employeeId === oldId ? { ...t, employeeId: newId } : t
        );
        newState.bulkBreakings = prevState.bulkBreakings.map(t =>
          t.employeeId === oldId ? { ...t, employeeId: newId } : t
        );
        newState.inventoryMovements = prevState.inventoryMovements.map(t =>
          t.employeeId === oldId ? { ...t, employeeId: newId } : t
        );
        newState.productReceipts = prevState.productReceipts.map(t =>
          t.employeeId === oldId ? { ...t, employeeId: newId } : t
        );
        newState.employeePayments = prevState.employeePayments.map(t =>
          t.employeeId === oldId ? { ...t, employeeId: newId } : t
        );
      }

      return newState;
    });
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

  const updateProduct = (oldSku: string, updatedProduct: Product) => {
    setAppState(prevState => {
      const newSku = updatedProduct.sku;
      let newState = { ...prevState };

      // Update the product in the main list
      newState.products = prevState.products.map(prod =>
        prod.sku === oldSku ? updatedProduct : prod
      );

      // Update product references in all relevant transactions if SKU changed
      if (oldSku !== newSku) {
        newState.saleTransactions = prevState.saleTransactions.map(t => ({
          ...t,
          productsSold: t.productsSold.map(item =>
            item.sku === oldSku ? { ...item, sku: newSku } : item
          ),
        }));
        newState.bulkDeliveries = prevState.bulkDeliveries.map(t =>
          t.productId === oldSku ? { ...t, productId: newSku } : t
        );
        newState.bulkBreakings = prevState.bulkBreakings.map(t => ({
          ...t,
          bulkProductId: t.bulkProductId === oldSku ? newSku : t.bulkProductId,
          brokenIntoProducts: t.brokenIntoProducts.map(item =>
            item.sku === oldSku ? { ...item, sku: newSku } : item
          ),
        }));
        newState.inventoryMovements = prevState.inventoryMovements.map(t =>
          t.productId === oldSku ? { ...t, productId: newSku } : t
        );
        newState.productReceipts = prevState.productReceipts.map(t =>
          t.productId === oldSku ? { ...t, productId: newSku } : t
        );
      }

      return newState;
    });
  };

  const addSaleTransaction = (sale: SaleTransaction) => {
    setAppState(prevState => {
      const updatedProducts = prevState.products.map(product => {
        const soldItem = sale.productsSold.find(item => item.sku === product.sku);
        if (soldItem) {
          if (product.quantity < soldItem.quantity) {
            throw new Error(`Not enough stock for product ${product.name} (${product.sku}). Available: ${product.quantity}, Requested: ${soldItem.quantity}`);
          }
          return { ...product, quantity: product.quantity - soldItem.quantity };
        }
        return product;
      });

      return {
        ...prevState,
        saleTransactions: [...prevState.saleTransactions, sale],
        products: updatedProducts,
      };
    });
  };

  const updateSaleTransaction = (oldId: string, updatedSale: SaleTransaction) => {
    setAppState(prevState => {
      const oldSale = prevState.saleTransactions.find(s => s.id === oldId);
      if (!oldSale) {
        throw new Error(`Sale transaction with ID ${oldId} not found.`);
      }

      let updatedProducts = [...prevState.products];

      // 1. Reverse the impact of the old sale on product quantities
      oldSale.productsSold.forEach(oldItem => {
        const productIndex = updatedProducts.findIndex(p => p.sku === oldItem.sku);
        if (productIndex !== -1) {
          updatedProducts[productIndex] = {
            ...updatedProducts[productIndex],
            quantity: updatedProducts[productIndex].quantity + oldItem.quantity,
          };
        }
      });

      // 2. Apply the impact of the new sale on product quantities
      updatedSale.productsSold.forEach(newItem => {
        const productIndex = updatedProducts.findIndex(p => p.sku === newItem.sku);
        if (productIndex === -1) {
          throw new Error(`Product with SKU ${newItem.sku} not found for new sale.`);
        }
        if (updatedProducts[productIndex].quantity < newItem.quantity) {
          throw new Error(`Not enough stock for product ${updatedProducts[productIndex].name} (${newItem.sku}). Available: ${updatedProducts[productIndex].quantity}, Requested: ${newItem.quantity}`);
        }
        updatedProducts[productIndex] = {
          ...updatedProducts[productIndex],
          quantity: updatedProducts[productIndex].quantity - newItem.quantity,
        };
      });

      // 3. Update the sale transaction itself
      const newSaleTransactions = prevState.saleTransactions.map(s =>
        s.id === oldId ? updatedSale : s
      );

      return {
        ...prevState,
        saleTransactions: newSaleTransactions,
        products: updatedProducts,
      };
    });
  };

  const addBulkDelivery = (delivery: BulkDelivery) => {
    setAppState(prevState => {
      // Check if the product exists and is a bulk product
      const targetProduct = prevState.products.find(p => p.sku === delivery.productId);
      if (!targetProduct) {
        throw new Error(`Product with SKU ${delivery.productId} not found.`);
      }
      if (!targetProduct.isBulk) {
        throw new Error(`Product ${targetProduct.name} (${targetProduct.sku}) is not a bulk product.`);
      }

      const updatedProducts = prevState.products.map(product => {
        if (product.sku === delivery.productId) {
          const oldQuantity = product.quantity;
          const oldCost = product.cost;
          const newQuantity = oldQuantity + delivery.quantity;
          const newTotalCost = (oldQuantity * oldCost) + delivery.totalAmount;
          const newCost = newQuantity > 0 ? newTotalCost / newQuantity : 0; // Weighted average cost

          return { ...product, quantity: newQuantity, cost: newCost };
        }
        return product;
      });

      return {
        ...prevState,
        bulkDeliveries: [...prevState.bulkDeliveries, delivery],
        products: updatedProducts,
      };
    });
  };

  const updateBulkDelivery = (oldId: string, updatedDelivery: BulkDelivery) => {
    setAppState(prevState => {
      const oldDelivery = prevState.bulkDeliveries.find(d => d.id === oldId);
      if (!oldDelivery) {
        throw new Error(`Bulk delivery with ID ${oldId} not found.`);
      }

      let updatedProducts = [...prevState.products];
      const productIndex = updatedProducts.findIndex(p => p.sku === oldDelivery.productId);
      if (productIndex === -1) {
        throw new Error(`Product with SKU ${oldDelivery.productId} not found for old delivery.`);
      }

      // 1. Reverse the quantity impact of the old delivery
      updatedProducts[productIndex] = {
        ...updatedProducts[productIndex],
        quantity: updatedProducts[productIndex].quantity - oldDelivery.quantity,
      };

      // 2. Apply the quantity impact of the new delivery
      // Check if the product for the new delivery is valid
      const newProductIndex = updatedProducts.findIndex(p => p.sku === updatedDelivery.productId);
      if (newProductIndex === -1) {
        throw new Error(`Product with SKU ${updatedDelivery.productId} not found for new delivery.`);
      }
      if (!updatedProducts[newProductIndex].isBulk) {
        throw new Error(`Product ${updatedProducts[newProductIndex].name} (${updatedDelivery.productId}) is not a bulk product.`);
      }

      // If product SKU changed, adjust the old product's quantity back and apply to new product
      if (oldDelivery.productId !== updatedDelivery.productId) {
        // Add old quantity back to the original product (already done above for oldDelivery.productId)
        // Now, find the *new* product and add the new quantity
        updatedProducts[newProductIndex] = {
          ...updatedProducts[newProductIndex],
          quantity: updatedProducts[newProductIndex].quantity + updatedDelivery.quantity,
        };
        // Note: Cost recalculation for product changes is complex and omitted for simplicity here.
        // The cost of the *new* product will not be re-averaged based on this edit.
      } else {
        // If product SKU is the same, just apply the new quantity
        updatedProducts[productIndex] = {
          ...updatedProducts[productIndex],
          quantity: updatedProducts[productIndex].quantity + updatedDelivery.quantity,
        };
        // Recalculate weighted average cost if product is the same
        const oldProduct = prevState.products[productIndex];
        const oldTotalQuantityBeforeOldDelivery = oldProduct.quantity - oldDelivery.quantity;
        const oldTotalCostBeforeOldDelivery = oldTotalQuantityBeforeOldDelivery * oldProduct.cost;

        const newTotalQuantity = oldTotalQuantityBeforeOldDelivery + updatedDelivery.quantity;
        const newTotalCost = oldTotalCostBeforeOldDelivery + updatedDelivery.totalAmount;
        const newCost = newTotalQuantity > 0 ? newTotalCost / newTotalQuantity : 0;

        updatedProducts[productIndex] = {
          ...updatedProducts[productIndex],
          cost: newCost,
        };
      }

      // 3. Update the bulk delivery transaction itself
      const newBulkDeliveries = prevState.bulkDeliveries.map(d =>
        d.id === oldId ? updatedDelivery : d
      );

      return {
        ...prevState,
        bulkDeliveries: newBulkDeliveries,
        products: updatedProducts,
      };
    });
  };

  const addProductReceipt = (receipt: ProductReceipt) => {
    setAppState(prevState => {
      const updatedProducts = prevState.products.map(product => {
        if (product.sku === receipt.productId) {
          // Increase quantity
          const newQuantity = product.quantity + receipt.quantity;
          // If product had no location and a new one is provided, set it. Otherwise, keep existing.
          const newLocationId = product.locationId === undefined && receipt.toLocationId
            ? receipt.toLocationId
            : product.locationId;
          return { ...product, quantity: newQuantity, locationId: newLocationId };
        }
        return product;
      });

      // Check if the product exists
      const targetProduct = prevState.products.find(p => p.sku === receipt.productId);
      if (!targetProduct) {
        throw new Error(`Product with SKU ${receipt.productId} not found.`);
      }

      return {
        ...prevState,
        productReceipts: [...prevState.productReceipts, receipt],
        products: updatedProducts,
      };
    });
  };

  const addInventoryMovement = (movement: InventoryMovement) => {
    setAppState(prevState => {
      const updatedProducts = prevState.products.map(product => {
        if (product.sku === movement.productId) {
          if (product.quantity < movement.quantity) {
            throw new Error(`Not enough stock for product ${product.name} (${product.sku}) at location ${movement.fromLocationId || 'any'}. Available: ${product.quantity}, Requested: ${movement.quantity}`);
          }
          // Update the product's location to the new location
          return { ...product, locationId: movement.toLocationId };
        }
        return product;
      });

      // Check if the product exists
      const targetProduct = prevState.products.find(p => p.sku === movement.productId);
      if (!targetProduct) {
        throw new Error(`Product with SKU ${movement.productId} not found.`);
      }

      return {
        ...prevState,
        inventoryMovements: [...prevState.inventoryMovements, movement],
        products: updatedProducts,
      };
    });
  };

  const addBulkBreaking = (breaking: BulkBreaking) => {
    setAppState(prevState => {
      let updatedProducts = [...prevState.products];

      // 1. Decrease quantity of the bulk product
      const bulkProductIndex = updatedProducts.findIndex(p => p.sku === breaking.bulkProductId);
      if (bulkProductIndex === -1) {
        throw new Error(`Bulk product with SKU ${breaking.bulkProductId} not found.`);
      }
      if (!updatedProducts[bulkProductIndex].isBulk) {
        throw new Error(`Product ${updatedProducts[bulkProductIndex].name} (${breaking.bulkProductId}) is not a bulk product.`);
      }
      if (updatedProducts[bulkProductIndex].quantity < breaking.quantityToBreak) {
        throw new Error(`Not enough bulk product ${updatedProducts[bulkProductIndex].name} (${breaking.bulkProductId}) to break. Available: ${updatedProducts[bulkProductIndex].quantity}, Requested: ${breaking.quantityToBreak}`);
      }
      updatedProducts[bulkProductIndex] = {
        ...updatedProducts[bulkProductIndex],
        quantity: updatedProducts[bulkProductIndex].quantity - breaking.quantityToBreak,
      };

      // 2. Increase quantities of the resulting sellable products
      breaking.brokenIntoProducts.forEach(item => {
        const sellableProductIndex = updatedProducts.findIndex(p => p.sku === item.sku);
        if (sellableProductIndex === -1) {
          throw new Error(`Resulting product with SKU ${item.sku} not found.`);
        }
        if (updatedProducts[sellableProductIndex].isBulk) {
          throw new Error(`Resulting product ${updatedProducts[sellableProductIndex].name} (${item.sku}) cannot be a bulk product.`);
        }
        updatedProducts[sellableProductIndex] = {
          ...updatedProducts[sellableProductIndex],
          quantity: updatedProducts[sellableProductIndex].quantity + item.quantity,
        };
      });

      return {
        ...prevState,
        bulkBreakings: [...prevState.bulkBreakings, breaking],
        products: updatedProducts,
      };
    });
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
    addSaleTransaction,
    addBulkDelivery,
    addProductReceipt,
    addInventoryMovement,
    addBulkBreaking,
    updateEmployee,
    updateProduct,
    updateSaleTransaction,
    updateBulkDelivery,
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