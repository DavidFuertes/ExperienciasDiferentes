import { Outlet, Navigate } from "react-router-dom";

export const PrivateRoute = () => {
  //TODO: Comprobar si el usuario está logueado
  return localStorage.getItem("token") ? <Outlet /> : <Navigate to="/login" />;
};
