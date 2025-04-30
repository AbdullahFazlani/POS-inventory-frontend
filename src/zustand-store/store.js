import { create } from "zustand";
import { postUserAPI } from "./Apis/fetchUser";
import {
  deleteProductAPI,
  getProductsAPI,
  postProductAPI,
  updateProductAPI,
} from "./Apis/productApis";
import {
  deleteCustomerAPI,
  getCustomersAPI,
  postCustomerAPI,
  updateCustomerAPI,
} from "./Apis/customerApis";
import { getInvoiceAPI, postInvoiceAPI } from "./Apis/InvoiceApi";

const useStore = create((set) => ({
  user: [],
  products: [],
  customers: [],
  loading: false,
  error: null,
  token: null,
  // Function to set the token after login or signup
  setToken: (token) => set({ token }),

  login: (customerData) => postUserAPI(set, customerData), // Simply call the function

  // for products
  getProducts: () => getProductsAPI(set),
  addProduct: (productData) => postProductAPI(set, productData),
  updateProduct: (id, productData) => updateProductAPI(set, id, productData),
  deleteProduct: (id) => deleteProductAPI(set, id),

  // for customers
  getCustomers: () => getCustomersAPI(set),
  addCustomer: (custData) => postCustomerAPI(set, custData),
  updateCustomer: (id, custData) => updateCustomerAPI(set, id, custData),
  deleteCustomer: (id) => deleteCustomerAPI(set, id),

  // for invoice
  postInvoice: (invoiceData) => postInvoiceAPI(set, invoiceData),
  getInvoices: (startDate, endDate) => getInvoiceAPI(set, startDate, endDate), // Assuming you have a function to fetch invoices
}));

export default useStore;
