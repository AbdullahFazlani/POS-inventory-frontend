import AxiosInstance from "../../config/api-intances";

export const postUserAPI = async (set, userData) => {
  set({ loading: true, error: null });

  try {
    const response = await AxiosInstance.post("/api/auth/login", userData);
    console.log({ response });
    set({
      user: response.data,
      loading: false,
      token: response.data.data.token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    set({
      loading: false,
      error: error.response
        ? error.response.data.message
        : "An unexpected error occurred",
    });
  }
};
