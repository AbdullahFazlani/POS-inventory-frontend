import AxiosInstance from "../../config/api-intances";

export const postInvoiceAPI = async (set, invoiceData) => {
  set({ loading: true, error: null });

  try {
    const response = await AxiosInstance.post("/api/invoices", invoiceData);
    console.log({ response });
    set({
      loading: false,
    });
    return response.data;
  } catch (error) {
    set({ error: "Failed to post invoice", loading: false });
    return error.response.data;
  }
};

export const getInvoiceAPI = async (set, startDate, endDate) => {
  set({ loading: true, error: null });

  try {
    const response = await AxiosInstance.get("/api/invoices", {
      params: {
        startDate, // expects format 'YYYY-MM-DD'
        endDate,
      },
    });

    console.log({ response });

    set({
      loading: false,
    });

    return response.data;
  } catch (error) {
    set({ error: "Failed to fetch invoice", loading: false });
    return (
      error?.response?.data || { status: "error", message: "Unknown error" }
    );
  }
};
