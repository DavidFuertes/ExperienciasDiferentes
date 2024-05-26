import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext.jsx";
import { joiResolver } from "@hookform/resolvers/joi";
import { loginUserSchema } from "../../schemas/loginUserSchema.js";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Importar estilos de Toastify
const { VITE_BACKEND_URL } = import.meta.env;

export const LogIn = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [reactivateLoading, setReaactivateLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: "onTouched",
    resolver: joiResolver(loginUserSchema),
  });

  const emailValue = watch("email");

  const handleReactivateAccount = async () => {
    if (!emailValue) {
      toast.error("Por favor, introduce tu correo electrónico.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
      return;
    }

    try {
      setReaactivateLoading(true);
      const response = await fetch(`${VITE_BACKEND_URL}/users/reactivate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailValue }),
      });

      const respData = await response.json();

      if (response.ok) {
        toast.success(respData.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
      } else {
        throw new Error(respData.message);
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
    } finally {
      setReaactivateLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const respData = await response.json();

      if (response.ok) {
        const token = respData.data.token;
        login(token);
        navigate("/");
      } else {
        throw new Error(respData.message);
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
    }
  };

  return (
    <div>
      <ToastContainer />
      <section className="formSection">
        <h1>Página de Log In</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <label>Correo electrónico:</label>
            <input type="email" placeholder="Email..." {...register("email")} />
            <p>{errors.email?.message}</p>
          </fieldset>
          <fieldset>
            <label>Contraseña:</label>
            <input
              type="password"
              placeholder="Contraseña..."
              {...register("password")}
            />
            <div>{errors.password?.message}</div>
          </fieldset>
          <button disabled={!isValid} type="submit">
            Iniciar sesión
          </button>
          <Link to="/forget_password">Olvidé mi contraseña</Link>
          <button
            disabled={!emailValue || reactivateLoading}
            type="button"
            onClick={handleReactivateAccount}
          >
            {reactivateLoading ? "Enviando..." : "Quiero reactivar mi cuenta"}
          </button>
        </form>
      </section>
    </div>
  );
};
