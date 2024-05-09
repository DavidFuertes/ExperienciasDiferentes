import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext.jsx";

export const PrivateRoute = () => {
  //TODO: Comprobar si el usuario está logueado
  const { user } = useContext(UserContext);
  return user ? <Outlet /> : <Navigate to="/login" />;
};
