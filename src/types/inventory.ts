export interface Employee {
  id: string;
  passcode: string;
  name: string;
}

export interface Dealer {
  id: string;
  passcode: string;
  name: string;
}

export interface Vendor {
  id: string;
  name: string;
}

export interface ShelfLocation {
  id: string;
  name: string;
  qrCode: string; // Assuming QR code is a string representation or URL
}

export interface Device {
  id: string;
  name: string;
}

export interface Product {
  sku: string;
  name: string;
  size: string; // e.g., "bulk", "small package", "large package"
  isBulk: boolean;
  quantity: number;
  locationId?: string; // Link to ShelfLocation
}

export interface BulkDelivery {
  id: string;
  vendorId: string;
  productId: string; // SKU of the bulk product
  quantity: number;
  date: string;
  employeeId?: string; // Employee who tracked the delivery
}

export interface BulkBreaking {
  id: string;
  bulkProductId: string; // SKU of the bulk product
  brokenIntoProducts: { sku: string; quantity: number }[]; // SKUs and quantities of sellable packages
  date: string;
  employeeId: string;
}

export interface InventoryMovement {
  id: string;
  productId: string; // SKU of the product moved
  fromLocationId?: string;
  toLocationId: string;
  quantity: number;
  date: string;
  employeeId: string;
}

export interface SaleTransaction {
  id: string;
  dealerId: string;
  employeeId: string;
  productsSold: { sku: string; quantity: number; price: number }[];
  totalAmount: number;
  date: string;
}

export interface EmployeePayment {
  id: string;
  employeeId: string;
  amount: number;
  date: string;
  description: string;
}

export interface ProductReceipt {
  id: string;
  vendorId?: string; // Optional, as some deliveries might not be directly from a vendor
  productId: string; // SKU of the product received (can be bulk or non-bulk)
  quantity: number;
  date: string;
  employeeId?: string;
  toLocationId: string; // Where the product is received
}

// Central application state for localStorage
export interface AppState {
  employees: Employee[];
  dealers: Dealer[];
  vendors: Vendor[];
  shelfLocations: ShelfLocation[];
  devices: Device[];
  products: Product[];
  bulkDeliveries: BulkDelivery[];
  bulkBreakings: BulkBreaking[];
  inventoryMovements: InventoryMovement[];
  saleTransactions: SaleTransaction[];
  employeePayments: EmployeePayment[];
  productReceipts: ProductReceipt[]; // New array for general product deliveries
}