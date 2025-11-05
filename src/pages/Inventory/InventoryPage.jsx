import React, { useEffect, useState } from "react";
import axios from "axios";

import { InventoryHeader } from "../Inventory/InventoryHeader.jsx";
import { InventoryTable } from "../Inventory/InventoryTable.jsx";

const InventoryPage = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
  fetch("http://localhost:8000/products")
    .then((r) => r.json())
    .then(setProducts)
    .catch(console.error);
};

useEffect(fetchProducts, []);

  return (
    // on force dark mode ici
    <div className="dark">
      <div className="min-h-screen bg-slate-900 text-slate-100">
        <div className="max-w-6xl mx-auto p-6 space-y-6">
          <InventoryHeader products={products} />
           <InventoryTable products={products} onRefresh={fetchProducts} />
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
 