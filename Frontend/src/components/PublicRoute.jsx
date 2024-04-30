import { Outlet, Navigate } from "react-router-dom";

export const PublicRoute = () => {
  //TODO: Comprobar si el usuario no está logueado
  return !localStorage.getItem("token") ? <Outlet /> : <Navigate to="/" />;
};
