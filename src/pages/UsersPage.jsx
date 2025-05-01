import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";

import Header from "../components/common/Header";
import UsersTable from "../components/users/UsersTable";
import UserModal from "../components/users/UserModal";
import InvoiceModal from "../components/users/InvoiceModal";

import useStore from "../zustand-store/store";

const UsersPage = () => {
  const { getCustomers, customers } = useStore();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCustomerForInvoices, setSelectedCustomerForInvoices] =
    useState(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  useEffect(() => {
    getCustomers();
  }, []);

  const handleViewInvoices = (customer) => {
    setSelectedCustomerForInvoices(customer);
    setIsInvoiceModalOpen(true);
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Users" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <PlusCircle size={20} />
            Add Customer
          </button>
        </div>

        <UsersTable
          custData={customers?.data}
          onViewInvoicesClick={handleViewInvoices}
        />
      </main>

      {/* Add customer modal */}
      <UserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      {/* Invoice detail modal */}
      <InvoiceModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        customer={selectedCustomerForInvoices}
      />
    </div>
  );
};

export default UsersPage;
