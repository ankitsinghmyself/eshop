import CircularChart from '@/components/common/charts/CircularChart';
import { getActiveProducts, getTotalProducts } from '@/lib/productService';
import React, { useEffect, useState } from 'react';

const AdminDashboard: React.FC = () => {
  const [activeProducts, setActiveProducts] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const total = await getTotalProducts();
      const active = await getActiveProducts();
      setTotalProducts(total);
      setActiveProducts(active);
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <CircularChart activeProducts={activeProducts} totalProducts={totalProducts} />
    </div>
  );
};

export default AdminDashboard;
