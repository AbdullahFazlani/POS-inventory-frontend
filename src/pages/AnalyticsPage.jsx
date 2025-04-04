/**
 * AnalyticsPage Component
 *
 * This component provides advanced business analytics and insights with
 * multiple specialized visualization components for in-depth data analysis.
 *
 * Features:
 * - Key metrics overview
 * - Revenue performance charts
 * - Channel effectiveness analysis
 * - Product performance metrics
 * - User retention visualization
 * - Customer segmentation analysis
 * - AI-powered business insights
 */

import Header from "../components/common/Header";

import OverviewCards from "../components/analytics/OverviewCards";
import RevenueChart from "../components/analytics/RevenueChart";
import ChannelPerformance from "../components/analytics/ChannelPerformance";
import ProductPerformance from "../components/analytics/ProductPerformance";
import UserRetention from "../components/analytics/UserRetention";
import CustomerSegmentation from "../components/analytics/CustomerSegmentation";
import AIPoweredInsights from "../components/analytics/AIPoweredInsights";

const AnalyticsPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10 bg-gray-900">
      {/* Page header */}
      <Header title={"Analytics Dashboard"} />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* Key metrics overview cards */}
        <OverviewCards />

        {/* Main revenue performance chart */}
        <RevenueChart />

        {/* Specialized analytics visualizations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Analysis of marketing/sales channels */}
          <ChannelPerformance />

          {/* Analysis of individual product performance */}
          <ProductPerformance />

          {/* User retention analysis over time */}
          <UserRetention />

          {/* Customer classification analysis */}
          <CustomerSegmentation />
        </div>

        {/* AI-generated business insights section */}
        <AIPoweredInsights />
      </main>
    </div>
  );
};
export default AnalyticsPage;
