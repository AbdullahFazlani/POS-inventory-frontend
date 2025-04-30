import { motion } from "framer-motion";
import { Eye, PlusCircle, Trash2, X } from "lucide-react";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import useStore from "../zustand-store/store";
import Header from "../components/common/Header";
import { useNavigate } from "react-router-dom";

const InvoicesTable = () => {
  const { getInvoices } = useStore();
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null); // modal state

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await getInvoices();
        if (response?.status === "success") {
          setInvoices(response.data.invoices);
        } else {
          console.error("Failed to load invoices:", response.message);
        }
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Invoices" />
      <div className="flex justify-end my-4 mx-5">
        <button
          onClick={() => navigate("/add-invoice")}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <PlusCircle size={20} />
          Add Invoice
        </button>
      </div>
      <motion.div
        className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 my-8 mx-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold text-gray-100 mb-4">Invoices</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Invoice #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Customer
                </th>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Products
                </th> */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {invoices.length > 0 ? (
                invoices.map((invoice) => (
                  <tr key={invoice._id}>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {invoice.invoiceNumber}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {invoice?.customer?.name || "Unknown"}
                    </td>
                    {/* <td className="px-6 py-4 text-sm text-gray-300">
                      {invoice.products.map((p) => p.name).join(", ")}
                    </td> */}
                    <td className="px-6 py-4 text-sm text-gray-300">
                      ${(invoice.grandTotal || 0).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300 capitalize">
                      {invoice.paymentStatus}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {new Date(invoice.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      <button
                        onClick={() => setSelectedInvoice(invoice)}
                        className="text-blue-400 hover:text-blue-300 mr-2"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-4 text-gray-400 text-sm"
                  >
                    No invoices found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-gray-800 rounded-xl shadow-lg max-w-md w-full max-h-[90vh] p-6 relative overflow-hidden">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
              onClick={() => setSelectedInvoice(null)}
            >
              <X size={20} />
            </button>

            <h3 className="text-lg text-white font-semibold mb-4">
              Invoice #{selectedInvoice.invoiceNumber}
            </h3>

            {/* Customer Info */}
            <div className="mb-4 border-b border-gray-600 pb-4">
              <h4 className="text-gray-200 font-semibold text-md mb-2">
                Customer Info
              </h4>
              <p className="text-gray-300">
                <span className="font-medium">Name:</span>{" "}
                {selectedInvoice.customer?.name}
              </p>
              <p className="text-gray-300">
                <span className="font-medium">Email:</span>{" "}
                {selectedInvoice.customer?.email}
              </p>
              <p className="text-gray-300">
                <span className="font-medium">Phone:</span>{" "}
                {selectedInvoice.customer?.phone}
              </p>
              <p className="text-gray-300">
                <span className="font-medium">Balance:</span> $
                {selectedInvoice.customer?.balance?.toFixed(2) || "0.00"}
              </p>
            </div>

            {/* Product List with Scroll */}
            <h4 className="text-gray-200 font-semibold text-md mb-2">
              Products
            </h4>
            <div className="max-h-60 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
              {selectedInvoice?.products?.map((item, index) => (
                <div
                  key={index}
                  className="text-gray-300 border-b border-gray-700 pb-2"
                >
                  <div>
                    <span className="font-medium">Name:</span> {item.name}
                  </div>
                  <div>
                    <span className="font-medium">Price:</span> $
                    {item.price.toFixed(2)}
                  </div>
                  <div>
                    <span className="font-medium">Quantity:</span>{" "}
                    {item.quantity}
                  </div>
                  <div>
                    <span className="font-medium">Subtotal:</span> $
                    {(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Total Summary */}
            <div className="mt-4 pt-4 border-t border-gray-700 text-gray-200 text-sm">
              <p>
                <span className="font-semibold">Total Amount:</span> $
                {selectedInvoice?.totalAmount?.toFixed(2) || "0.00"}
              </p>
              <p>
                <span className="font-semibold">Tax:</span> $
                {selectedInvoice?.tax?.toFixed(2) || "0.00"}
              </p>
              <p>
                <span className="font-semibold">Grand Total:</span> $
                {selectedInvoice?.grandTotal?.toFixed(2) || "0.00"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoicesTable;
