import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Package, AlertTriangle, DollarSign } from "lucide-react";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import ProductsTable from "../components/products/ProductsTable";
import SalesTrendChart from "../components/products/SalesTrendChart";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import useStore from "../zustand-store/store";
import ProductModal from "../components/products/ProductModal";

const ProductsPage = () => {
  const { getProducts, products } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Products" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Products"
            icon={Package}
            value={products?.data?.totalProducts || 0}
            color="#6366F1"
          />
          <StatCard
            name="Low Stock"
            icon={AlertTriangle}
            value={products?.data?.lowStockCount || 0}
            color="#F59E0B"
          />
          <StatCard
            name="Total Revenue"
            icon={DollarSign}
            value={products?.data?.totalInventoryValue || 0}
            color="#EF4444"
          />
        </motion.div>

        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <PlusCircle size={20} />
            Add Product
          </button>
        </div>

        <ProductsTable productsData={products?.data?.products} />

        <div className="grid grid-col-1 lg:grid-cols-2 gap-8">
          <SalesTrendChart productData={products?.data?.products || []} />
          <CategoryDistributionChart productData={products?.data?.products} />
        </div>
      </main>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ProductsPage;
