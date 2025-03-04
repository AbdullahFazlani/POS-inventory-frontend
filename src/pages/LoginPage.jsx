import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import useStore from "../zustand-store/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, loading, error, user } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.status === "success") {
      navigate("/");
    }
  }, [user, navigate]); // ✅ Only runs when `user` changes

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required("Required*"),
      password: Yup.string().required("Required*"),
    }),
    onSubmit: (values) => {
      const loginValues = {
        email: values.email,
        password: values.password,
      };
      console.log(loginValues);
      login(loginValues);
    },
  });

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-10 rounded-lg shadow-lg w-[40%] text-center relative flex flex-col items-center">
        {/* Floating Bubbles */}
        <motion.div
          className="absolute top-[-40px] left-[-30px] w-28 h-28 bg-purple-500 rounded-full opacity-50"
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        />
        <motion.div
          className="absolute top-[20px] right-[20px] w-12 h-12 bg-gray-600 rounded-full opacity-50"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        />

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-8">Sign In.</h2>

        <form
          onSubmit={formik.handleSubmit}
          className="w-full flex flex-col items-center text-left"
        >
          {/* Email Field */}
          <div className="w-full mb-5">
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 bg-gray-700 rounded-md outline-none focus:ring-2 focus:ring-purple-400"
            />
            {formik.errors.email && formik.touched.email && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>
          <div className="w-full mb-6">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 bg-gray-700 rounded-md outline-none focus:ring-2 focus:ring-purple-400"
            />
            {formik.errors.password && formik.touched.password && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </div>
            )}
          </div>

          {/* Sign-in Button */}
          {/* Sign-in Button with Loader */}
          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            disabled={loading} // Disable button while loading
            className={`w-full py-3 rounded-md font-semibold transition ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-80"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                <span>Signing In...</span>
              </div>
            ) : (
              "Sign In"
            )}
          </motion.button>
        </form>

        {/* Links */}
        <div className="text-gray-400 text-sm mt-6">
          Don't have an account?{" "}
          <span className="text-white font-medium cursor-pointer hover:underline">
            Create an account
          </span>
        </div>
        <div className="text-gray-400 text-sm mt-3 cursor-pointer hover:underline">
          Forgot password?
        </div>
      </div>
    </div>
  );
};

export default Login;
