import { Route, Routes, useLocation } from "react-router-dom";

import Sidebar from "./components/common/Sidebar";
import Login from "./pages/LoginPage"; // Import the Login page

import OverviewPage from "./pages/OverviewPage";
import ProductsPage from "./pages/ProductsPage";
import UsersPage from "./pages/UsersPage";
import SalesPage from "./pages/SalesPage";
import OrdersPage from "./pages/OrdersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
import { AuthRoute } from "./components/authRoute";
import InvoicePage from "./pages/InvoicePage";
function App() {
  const location = useLocation(); // Get current route

  // List of routes where Sidebar should NOT appear
  const hideSidebarRoutes = ["/login"];

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>

      {/* Show Sidebar only if the route is NOT in hideSidebarRoutes */}
      {!hideSidebarRoutes.includes(location.pathname) && <Sidebar />}

      {/* Main Routes */}
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />
        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <AuthRoute>
              <OverviewPage />
            </AuthRoute>
          }
        />
        <Route
          path="/products"
          element={
            <AuthRoute>
              <ProductsPage />
            </AuthRoute>
          }
        />
        <Route
          path="/invoice"
          element={
            <AuthRoute>
              <InvoicePage />
            </AuthRoute>
          }
        />
        <Route
          path="/users"
          element={
            <AuthRoute>
              <UsersPage />
            </AuthRoute>
          }
        />
        <Route
          path="/sales"
          element={
            <AuthRoute>
              <SalesPage />
            </AuthRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <AuthRoute>
              <OrdersPage />
            </AuthRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <AuthRoute>
              <AnalyticsPage />
            </AuthRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <AuthRoute>
              <SettingsPage />
            </AuthRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
