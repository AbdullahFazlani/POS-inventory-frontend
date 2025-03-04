import { create } from "zustand";
import { postUserAPI } from "./Apis/fetchUser";
import {
  getProductsAPI,
  postProductAPI,
  updateProductAPI,
} from "./Apis/productApis";
import {
  getCustomersAPI,
  postCustomerAPI,
  updateCustomerAPI,
} from "./Apis/customerApis";

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

  // for customers
  getCustomers: () => getCustomersAPI(set),
  addCustomer: (custData) => postCustomerAPI(set, custData),
  updateCustomer: (id, custData) => updateCustomerAPI(set, id, custData),
}));

export default useStore;
