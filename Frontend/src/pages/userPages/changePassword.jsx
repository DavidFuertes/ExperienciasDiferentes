import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Slide, ToastContainer, toast } from "react-toastify";
import { changeUserPasswordSchema } from "../../schemas/changeUserPasswordSchema.js";
import { UserContext } from "../../context/UserContext.jsx";
import { useContext } from "react";
const { VITE_BACKEND_URL } = import.meta.env;

export const ChangePassword = () => {
  const { recoverCode } = useParams();
  const navigate = useNavigate();
  // Estado para las credenciales del usuario
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm({
    mode: "onTouched",
    resolver: joiResolver(changeUserPasswordSchema),
  });
  console.log(isValid);

  const { token } = useContext(UserContext);
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/users/changePassword`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify(data),
      });

      const respData = await response.json();

      if (response.ok === true) {
        toast.success(respData.message, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
        setTimeout(() => {
          navigate("/login");
          return;
        }, 2000);
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
    <section className="formSection">
      <ToastContainer />
      <h1>Página de creación de una nueva contraseña</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <label>Contraseña actual:</label>
          <input
            type="password"
            placeholder="Contraseña..."
            {...register("currentPassword")}
          />
          <div>{errors.password?.message}</div>
          <p id="message-error-password"></p>
        </fieldset>
        <fieldset>
          <label>Introduce tu nueva contraseña:</label>
          <input
            type="password"
            placeholder="Contraseña..."
            {...register("newPassword")}
          />
          <div>{errors.newPassword?.message}</div>
        </fieldset>
        <fieldset>
          <label>Confirma tu nueva contraseña:</label>
          <input
            type="password"
            placeholder="Confirma tu contraseña..."
            {...register("confirmNewPassword", {
              validate: (value) =>
                value === getValues("newPassword") ||
                "Las contraseñas no coinciden",
            })}
          />
          <div>{errors.confirmNewPassword?.message}</div>
        </fieldset>
        <button disabled={!isValid} type="submit">
          Crea una nueva contraseña
        </button>
      </form>
    </section>
  );
};
