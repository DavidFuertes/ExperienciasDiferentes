import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext.jsx";

export const AdminRoute = () => {
  const { user } = useContext(UserContext);

  return user !== null && user.user.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};
