import React from 'react';

const IDsSKUsQRs: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Full list of Created IDs/SKUs/QRs</h2>
      <p className="text-gray-600 dark:text-gray-400">
        This page will list all unique IDs, SKUs, and QR codes, organized by Live and Archived status.
      </p>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <p className="text-gray-700 dark:text-gray-300">
          Lists of Employees, Dealers, Vendors, Shelf Locations, Devices, and Products with their respective IDs/SKUs/QRs.
        </p>
      </div>
    </div>
  );
};

export default IDsSKUsQRs;