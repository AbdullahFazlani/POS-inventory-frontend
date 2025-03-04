import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { X } from "lucide-react";
import Swal from "sweetalert2";
import useStore from "../../zustand-store/store";
import { createPortal } from "react-dom";
import { useEffect } from "react";

const UserModal = ({ isOpen, onClose, customer }) => {
  const { addCustomer, updateCustomer, getCustomers, loading } = useStore();
  const isEditing = !!customer;

  // Prevent body scrolling when modal is open
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

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: customer?.name || "",
      email: customer?.email || "",
      phone: customer?.phone || "",
      //   quantity: customer?.quantity || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Customer name is required"),
      email: Yup.string()
        .email("Must be a valid email")
        .required("Email is required"),
      phone: Yup.number()
        .typeError("Price must be a number")
        .required("Price is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      let response;
      if (isEditing) {
        response = await updateCustomer(customer._id, values); // Update existing product
      } else {
        response = await addCustomer(values); // Add new product
      }

      if (response.status === "success") {
        Swal.fire({
          title: "Success!",
          text: response.message,
          icon: "success",
          confirmButtonText: "OK",
        });
        getCustomers();
        resetForm();
        onClose();
      } else {
        Swal.fire({
          title: "Error!",
          text: response.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    },
  });

  if (!isOpen) return null;

  // Render the modal content using a portal
  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      // Optional: Close modal when clicking outside
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="bg-gray-900 p-6 rounded-lg shadow-lg w-96 max-w-full mx-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={(e) => e.stopPropagation()} // Prevent clicks from bubbling up
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">
            {isEditing ? "Edit Customer" : "Add Customer"}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Customer Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-3 bg-gray-800 text-white rounded outline-none focus:ring-2 focus:ring-blue-400"
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-500 text-sm">{formik.errors.name}</div>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-3 bg-gray-800 text-white rounded outline-none focus:ring-2 focus:ring-blue-400"
          />
          {formik.touched.sku && formik.errors.sku && (
            <div className="text-red-500 text-sm">{formik.errors.sku}</div>
          )}

          <input
            type="number"
            name="phone"
            placeholder="Phone Number"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-3 bg-gray-800 text-white rounded outline-none focus:ring-2 focus:ring-blue-400"
          />
          {formik.touched.price && formik.errors.price && (
            <div className="text-red-500 text-sm">{formik.errors.price}</div>
          )}

          {/* <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formik.values.quantity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-3 bg-gray-800 text-white rounded outline-none focus:ring-2 focus:ring-blue-400"
          />
          {formik.touched.quantity && formik.errors.quantity && (
            <div className="text-red-500 text-sm">{formik.errors.quantity}</div>
          )} */}

          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className={`w-full py-3 rounded-md font-semibold transition text-white ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-80"
            }`}
          >
            {loading
              ? "Saving..."
              : isEditing
              ? "Update Customer"
              : "Add Customer"}
          </motion.button>
        </form>
      </motion.div>
    </div>,
    document.body // Render directly to body element
  );
};

export default UserModal;
