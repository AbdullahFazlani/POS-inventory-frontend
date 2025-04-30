/**
 * LoginPage Component
 *
 * This component provides the authentication interface for users to sign in to the application.
 * It includes form validation, remember me functionality, and error handling.
 *
 * Features:
 * - Email and password validation using Formik and Yup
 * - Password visibility toggle
 * - Remember me functionality
 * - Loading state with animation
 * - Error display
 * - Responsive design
 */

import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import useStore from "../zustand-store/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  // Access store state and actions
  const { login, loading, error, user } = useStore();
  const navigate = useNavigate();

  // Local state for UI interactions
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Redirect to home if user is already authenticated
  useEffect(() => {
    if (user?.status === "success") {
      navigate("/");
    }
  }, [user, navigate]);

  // Form validation and submission handling
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // Define validation schema with comprehensive rules
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),

      password: Yup.string().required("Password is required"),
    }),
    // Handle form submission
    onSubmit: (values) => {
      const loginValues = {
        email: values.email,
        password: values.password,
        rememberMe,
      };
      console.log(loginValues);
      login(loginValues);
    },
  });

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-900 text-white">
      {/* Main login container with animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-10 rounded-lg shadow-lg w-[90%] max-w-md text-center relative"
      >
        {/* Decorative animated elements */}
        <motion.div
          className="absolute top-[-40px] left-[-30px] w-28 h-28 bg-purple-500 rounded-full opacity-50"
          animate={{ y: [0, 15, 0], scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
        />
        <motion.div
          className="absolute top-[20px] right-[20px] w-12 h-12 bg-gray-600 rounded-full opacity-50"
          animate={{ y: [0, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />

        {/* Page title */}
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Welcome Back
        </h2>

        {/* Error message display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-md text-red-400"
          >
            {error}
          </motion.div>
        )}

        <form
          onSubmit={formik.handleSubmit}
          className="w-full flex flex-col items-center text-left space-y-4"
        >
          {/* Email input field */}
          <div className="w-full">
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 bg-gray-700 rounded-md outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
            />
            {/* Email validation error message */}
            {formik.errors.email && formik.touched.email && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm mt-1"
              >
                {formik.errors.email}
              </motion.div>
            )}
          </div>

          {/* Password input field with visibility toggle */}
          <div className="w-full relative">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-3 bg-gray-700 rounded-md outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
              />
              {/* Password visibility toggle button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {/* Password validation error message */}
            {formik.errors.password && formik.touched.password && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm mt-1"
              >
                {formik.errors.password}
              </motion.div>
            )}
          </div>

          {/* Remember me checkbox and forgot password link */}
          <div className="w-full flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="form-checkbox h-4 w-4 text-purple-500 rounded focus:ring-purple-400"
              />
              <span>Remember me</span>
            </label>
            <span className="text-purple-400 hover:text-purple-300 cursor-pointer transition-colors">
              Forgot password?
            </span>
          </div>

          {/* Sign-in Button with loading state */}
          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className={`w-full py-3 rounded-md font-semibold transition-all duration-300 ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                {/* Loading spinner SVG */}
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

        {/* Sign up link */}
        <motion.div
          className="text-gray-400 text-sm mt-6"
          whileHover={{ scale: 1.01 }}
        >
          Don't have an account?{" "}
          <span className="text-purple-400 font-medium cursor-pointer hover:text-purple-300 transition-colors">
            Create an account
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
