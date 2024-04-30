import { Navigate, Outlet } from "react-router-dom";

export const AdminRoute = () => {
  //TODO: Comprobar si el usuario es admin
  return localStorage.getItem("token") ? <Outlet /> : <Navigate to="/" />;
};
