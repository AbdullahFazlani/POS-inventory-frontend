import AxiosInstance from "../../config/api-intances";

export const getProductsAPI = async (set) => {
  set({ loading: true, error: null });

  try {
    const response = await AxiosInstance.get("/api/products");
    console.log({ response });
    set({
      products: response.data,
      loading: false,
    });
  } catch (error) {
    set({ error: "Failed to fetch products", loading: false });
  }
};

export const postProductAPI = async (set, productData) => {
  set({ loading: true, error: null });

  try {
    const response = await AxiosInstance.post("/api/products", productData);
    console.log({ response });
    set({
      loading: false,
    });
    return response.data;
  } catch (error) {
    set({ error: "Failed to fetch products", loading: false });
    return error.response.data;
  }
};
export const updateProductAPI = async (set, id, productData) => {
  set({ loading: true, error: null });

  try {
    const response = await AxiosInstance.put(
      `/api/products/${id}`,
      productData
    );
    console.log({ response });
    set({
      loading: false,
    });
    return response.data;
  } catch (error) {
    set({ error: "Failed to update products", loading: false });
    return error.response.data;
  }
};
