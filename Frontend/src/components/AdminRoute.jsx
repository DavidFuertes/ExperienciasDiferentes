import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext.jsx";

export const AdminRoute = () => {
  //TODO: Comprobar que el enrutado este funcionando de administrador

  const { user } = useContext(UserContext);

  return user.user.role === "admin" ? <Outlet /> : <Navigate to="/" />;
};
