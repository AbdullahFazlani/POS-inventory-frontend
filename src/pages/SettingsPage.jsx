/**
 * SettingsPage Component
 *
 * This component provides the user settings interface with multiple configuration sections.
 * It organizes various settings into logical groups for better user experience.
 *
 * Features:
 * - User profile settings
 * - Notification preferences
 * - Security settings
 * - Account connections
 * - Account deletion and danger zone
 */

import Header from "../components/common/Header";
import ConnectedAccounts from "../components/settings/ConnectedAccounts";
import DangerZone from "../components/settings/DangerZone";
import Notifications from "../components/settings/Notifications";
import Profile from "../components/settings/Profile";
import Security from "../components/settings/Security";

const SettingsPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10 bg-gray-900">
      {/* Page header */}
      <Header title="Settings" />
      <main className="max-w-4xl mx-auto py-6 px-4 lg:px-8">
        {/* User profile settings section */}
        <Profile />
        {/* Notification preferences section */}
        <Notifications />
        {/* Account security settings section */}
        <Security />
        {/* Third-party account connections */}
        <ConnectedAccounts />
        {/* Critical account actions section */}
        <DangerZone />
      </main>
    </div>
  );
};
export default SettingsPage;
