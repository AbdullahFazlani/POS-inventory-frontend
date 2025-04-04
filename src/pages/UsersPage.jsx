/**
 * UsersPage Component
 *
 * This component displays user/customer management interface with statistics,
 * data table, and visualizations for user analytics.
 *
 * Features:
 * - User statistics (total, new, active, churn)
 * - Customer table with CRUD operations
 * - User growth chart visualization
 * - Activity and demographic analytics
 * - Add customer functionality
 */

import {
  PlusCircle,
  UserCheck,
  UserPlus,
  UsersIcon,
  UserX,
} from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import UsersTable from "../components/users/UsersTable";
import UserGrowthChart from "../components/users/UserGrowthChart";
import UserActivityHeatmap from "../components/users/UserActivityHeatmap";
import UserDemographicsChart from "../components/users/UserDemographicsChart";
import useStore from "../zustand-store/store";
import { useEffect, useState } from "react";
import UserModal from "../components/users/UserModal";

// Static user statistics data
const userStats = {
  totalUsers: 152845,
  newUsersToday: 243,
  activeUsers: 98520,
  churnRate: "2.4%",
};

const UsersPage = () => {
  // Access store state and actions
  const { getCustomers, customers } = useStore();
  // State for controlling the Add Customer modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch customers data on component mount
  useEffect(() => {
    getCustomers();
  }, []);

  console.log({ customers });

  return (
    <div className="flex-1 overflow-auto relative z-10">
      {/* Page header */}
      <Header title="Users" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* Stats section with key user metrics */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Users"
            icon={UsersIcon}
            value={userStats.totalUsers.toLocaleString()}
            color="#6366F1"
          />
          <StatCard
            name="New Users Today"
            icon={UserPlus}
            value={userStats.newUsersToday}
            color="#10B981"
          />
          <StatCard
            name="Active Users"
            icon={UserCheck}
            value={userStats.activeUsers.toLocaleString()}
            color="#F59E0B"
          />
          <StatCard
            name="Churn Rate"
            icon={UserX}
            value={userStats.churnRate}
            color="#EF4444"
          />
        </motion.div>

        {/* Add customer button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <PlusCircle size={20} />
            Add Customer
          </button>
        </div>

        {/* Users/Customers data table */}
        <UsersTable custData={customers?.data} />

        {/* User analytics charts section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <UserGrowthChart />
          <UserActivityHeatmap />
          <UserDemographicsChart />
        </div>
      </main>

      {/* Add Customer modal component */}
      <UserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
export default UsersPage;
