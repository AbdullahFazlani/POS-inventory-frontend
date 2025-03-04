import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const AuthRoute = ({ children }) => {
  // const loginData = useSelector((state) => state.login);
  // const isAuthenticated = () => {
  //   return loginData?.login?.data?.token;
  // };

  // const loginData = useSelector((state) => state.login);
  // const isAuthenticated = loginData?.login?.data?.token;

  // return isAuthenticated ? children : <Navigate to="/login" replace />;
  return children;
};
