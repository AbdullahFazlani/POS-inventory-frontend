import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useStore from "../zustand-store/store";

export const AuthRoute = ({ children }) => {
  const { token } = useStore(); // Get token from Zustand store
  const [alertShown, setAlertShown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token && !alertShown) {
      setAlertShown(true); // Prevent multiple alerts

      Swal.fire({
        title: "Access Denied!",
        text: "You need to log in to access this page.",
        icon: "warning",
        confirmButtonText: "Go to Login",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login"); // Redirect only after alert is closed
        }
      });
    }
  }, [token, alertShown, navigate]);

  // if (shouldRedirect) {
  //   return <Navigate to="/login" replace />;
  // }

  return children;
};
