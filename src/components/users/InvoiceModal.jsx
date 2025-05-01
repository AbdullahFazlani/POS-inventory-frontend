import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

const InvoiceModal = ({ isOpen, onClose, customer }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen || !customer) return null;

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-3xl mx-4 overflow-y-auto max-h-[80vh]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">
            Invoices for {customer.name}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {customer.invoiceCreditDebit?.length > 0 ? (
          <div className="space-y-4">
            {customer.invoiceCreditDebit.map((entry, index) => {
              const total =
                entry.invoiceId?.products?.reduce(
                  (sum, product) => sum + product.price * product.quantity,
                  0
                ) || 0;

              return (
                <div
                  key={index}
                  className="bg-gray-800 p-4 rounded-md text-white border border-gray-700"
                >
                  <p>
                    <span className="font-semibold">Invoice #:</span>{" "}
                    {entry.invoiceId?.invoiceNumber || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Date:</span>{" "}
                    {new Date(entry.invoiceId?.createdAt).toLocaleString()}
                  </p>
                  <p>
                    <span className="font-semibold">Payment Status:</span>{" "}
                    {entry.invoiceId?.paymentStatus}
                  </p>
                  <p>
                    <span className="font-semibold text-red-400">Debit:</span>{" "}
                    {entry.debit} |{" "}
                    <span className="font-semibold text-green-400">
                      Credit:
                    </span>{" "}
                    {entry.credit}
                  </p>

                  <p className="mt-2 font-semibold">Products:</p>
                  <ul className="list-disc list-inside text-sm text-gray-300">
                    {entry.invoiceId?.products?.map((product, i) => (
                      <li key={i}>
                        {product.name} - Qty: {product.quantity} @ Rs :
                        {product.price} = Rs:
                        {(product.price * product.quantity).toFixed(2)}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 font-semibold text-yellow-300">
                    Total: {total.toFixed(2)}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-400">No invoices available.</p>
        )}

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>,
    document.body
  );
};

export default InvoiceModal;
