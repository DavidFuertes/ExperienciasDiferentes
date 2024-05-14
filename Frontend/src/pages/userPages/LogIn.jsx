import { useForm } from "react-hook-form";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext.jsx";
import { joiResolver } from "@hookform/resolvers/joi";
import { loginUserSchema } from "../../schemas/loginUserSchema.js";
import { Slide, ToastContainer, toast } from "react-toastify";
const { VITE_BACKEND_URL } = import.meta.env;

export const LogIn = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  // Estado para las credenciales del usuario
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onTouched",
    resolver: joiResolver(loginUserSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const respData = await response.json();

      if (response.ok === true) {
        const token = respData.data.token;
        console.log(token)
        login(token);
        navigate("/");
        return;
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
        </form>
      </section>
    </div>
  );
};
