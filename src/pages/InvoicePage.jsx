import { motion } from "framer-motion";
import Header from "../components/common/Header";
import useStore from "../zustand-store/store";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const InvoicePage = () => {
  const { getCustomers, customers, getProducts, products, postInvoice } =
    useStore();

  useEffect(() => {
    getCustomers();
    getProducts();
  }, []);

  const productList = products?.data?.products || [];

  // React states
  const [items, setItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Formik for customer only
  const formik = useFormik({
    initialValues: {
      customerId: "",
    },
    validationSchema: Yup.object({
      customerId: Yup.string().required("Customer is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const payload = {
        customerId: formik.values.customerId,
        products: items.map((item) => ({
          product: item.productId,
          quantity: item.quantity,
        })),
      };
      const response = await postInvoice(payload);
      setItems([]); // Clear items after submission
      setSelectedProduct("");
      setQuantity(1); // Reset quantity to 1

      if (response.status === "success") {
        Swal.fire({
          title: "Success!",
          text: response.message,
          icon: "success",
          confirmButtonText: "OK",
        });

        resetForm();
      } else {
        Swal.fire({
          title: "Error!",
          text: response.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
      console.log("Formatted Invoice Payload:", payload);
    },
  });

  const handleAddProduct = () => {
    if (!selectedProduct || quantity < 1) return;

    const product = productList.find((p) => p._id === selectedProduct);
    if (!product) return;

    const newItem = {
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: Number(quantity),
      subtotal: product.price * quantity,
    };

    setItems((prev) => [...prev, newItem]);
    setSelectedProduct("");
    setQuantity(1);
  };

  const handleRemove = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const total = items.reduce((sum, item) => sum + item.subtotal, 0);

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Invoice" />
      <motion.div
        className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 my-8 mx-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Customer Select */}
          <div>
            <label htmlFor="name" className="block text-white mb-1">
              Select Customer
            </label>
            <select
              id="customerId"
              name="customerId"
              value={formik.values.customerId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 bg-gray-800 text-white rounded"
            >
              <option value="">Select a customer</option>
              {customers?.data?.map((customer) => (
                <option key={customer._id} value={customer._id}>
                  {customer.name}
                </option>
              ))}
            </select>
            {formik.touched.customerId && formik.errors.customerId && (
              <p className="text-red-400 text-sm mt-1">
                {formik.errors.customerId}
              </p>
            )}
          </div>

          {/* Product & Quantity Selector */}
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-white mb-1">Product</label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full p-2 bg-gray-800 text-white rounded"
              >
                <option value="">Select product</option>
                {productList.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name} - ${product.price}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-24">
              <label className="block text-white mb-1">Qty</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full p-2 bg-gray-800 text-white rounded"
              />
            </div>

            <button
              type="button"
              onClick={handleAddProduct}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>

          {/* Product List */}
          {items.length > 0 && (
            <div className="mt-6">
              <h3 className="text-white mb-2 text-lg font-semibold">
                Products Added
              </h3>
              <table className="w-full text-white table-auto">
                <thead>
                  <tr className="bg-gray-700 text-left">
                    <th className="p-2">Product</th>
                    <th className="p-2">Qty</th>
                    <th className="p-2">Price</th>
                    <th className="p-2">Subtotal</th>
                    <th className="p-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index} className="border-b border-gray-600">
                      <td className="p-2">{item.name}</td>
                      <td className="p-2">{item.quantity}</td>
                      <td className="p-2">${item.price}</td>
                      <td className="p-2">${item.subtotal}</td>
                      <td className="p-2">
                        <button
                          type="button"
                          onClick={() => handleRemove(index)}
                          className="text-red-400 hover:underline text-sm"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-right mt-2 text-white font-semibold">
                Total: ${total}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Submit Invoice
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default InvoicePage;
