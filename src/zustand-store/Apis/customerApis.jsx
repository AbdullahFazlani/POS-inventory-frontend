import AxiosInstance from "../../config/api-intances";

export const getCustomersAPI = async (set) => {
  set({ loading: true, error: null });

  try {
    const response = await AxiosInstance.get("/api/customers");
    console.log({ response });
    set({
      customers: response.data,
      loading: false,
    });
  } catch (error) {
    set({ error: "Failed to fetch custoemrs data", loading: false });
  }
};

export const postCustomerAPI = async (set, custData) => {
  set({ loading: true, error: null });

  try {
    const response = await AxiosInstance.post("/api/customers", custData);
    console.log({ response });
    set({
      loading: false,
    });
    return response.data;
  } catch (error) {
    set({ error: "Failed to Add customer", loading: false });
    return error.response.data;
  }
};

export const updateCustomerAPI = async (set, id, custData) => {
  set({ loading: true, error: null });

  try {
    const response = await AxiosInstance.put(`/api/customers/${id}`, custData);
    console.log({ response });
    set({
      loading: false,
    });
    return response.data;
  } catch (error) {
    set({ error: "Failed to update customer", loading: false });
    return error.response.data;
  }
};

export const deleteCustomerAPI = async (set, id) => {
  set({ loading: true, error: null });

  try {
    const response = await AxiosInstance.delete(`/api/customers/${id}`);
    console.log({ response });
    set({
      loading: false,
    });
    return response.data;
  } catch (error) {
    set({ error: "Failed to delete customer", loading: false });
    return error.response.data;
  }
};
