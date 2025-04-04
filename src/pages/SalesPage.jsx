/**
 * SalesPage Component
 *
 * This component provides a comprehensive sales dashboard with key metrics and visualizations
 * to monitor and analyze sales performance.
 *
 * Features:
 * - Sales statistics (revenue, order value, conversion, growth)
 * - Sales overview charts
 * - Category-based sales analysis
 * - Daily sales trend visualization
 */

import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import { CreditCard, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";
import SalesOverviewChart from "../components/sales/SalesOverviewChart";
import SalesByCategoryChart from "../components/sales/SalesByCategoryChart";
import DailySalesTrend from "../components/sales/DailySalesTrend";

// Static sales statistics data
const salesStats = {
  totalRevenue: "$1,234,567",
  averageOrderValue: "$78.90",
  conversionRate: "3.45%",
  salesGrowth: "12.3%",
};

const SalesPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      {/* Page header */}
      <Header title="Sales Dashboard" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* Sales statistics cards */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Revenue"
            icon={DollarSign}
            value={salesStats.totalRevenue}
            color="#6366F1"
          />
          <StatCard
            name="Avg. Order Value"
            icon={ShoppingCart}
            value={salesStats.averageOrderValue}
            color="#10B981"
          />
          <StatCard
            name="Conversion Rate"
            icon={TrendingUp}
            value={salesStats.conversionRate}
            color="#F59E0B"
          />
          <StatCard
            name="Sales Growth"
            icon={CreditCard}
            value={salesStats.salesGrowth}
            color="#EF4444"
          />
        </motion.div>

        {/* Main sales overview chart */}
        <SalesOverviewChart />

        {/* Additional sales analysis charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Chart showing sales by product category */}
          <SalesByCategoryChart />
          {/* Chart showing daily sales fluctuation */}
          <DailySalesTrend />
        </div>
      </main>
    </div>
  );
};
export default SalesPage;
