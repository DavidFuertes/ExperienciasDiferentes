import { useState } from "react";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Slide, ToastContainer, toast } from "react-toastify";
import { recoverPasswordSchema } from "../schemas/recoverPasswordSchema.js";
const { VITE_BACKEND_URL } = import.meta.env;

export const RecoverPassword = () => {
  const { recoverCode } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onTouched",
    resolver: joiResolver(recoverPasswordSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const verifyResponse = await fetch(`${VITE_BACKEND_URL}/verifyPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: data.currentPassword,
        }),
      });

      if (!verifyResponse.ok) {
        throw new Error("Contraseña actual incorrecta");
      }

      const changePasswordResponse = await fetch(
        `${VITE_BACKEND_URL}/changePassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: data.password,
            confirmPassword: data.confirmPassword,
          }),
        }
      );

      if (!changePasswordResponse.ok) {
        throw new Error("Error al cambiar la contraseña");
      }

      const changePasswordRespData = await changePasswordResponse.json();

      toast.success(changePasswordRespData.message, {
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

      setTimeout(() => {
        navigate("/login");
      }, 2000);
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
      setLoading(false);
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
            placeholder="Contraseña actual..."
            {...register("currentPassword", { required: true })}
          />
          <div>
            {errors.currentPassword && "Contraseña actual es requerida"}
          </div>
        </fieldset>
        <fieldset>
          <label>Nueva contraseña:</label>
          <input
            type="password"
            placeholder="Nueva contraseña..."
            {...register("password")}
          />
          <div>{errors.password?.message}</div>
          <p id="message-error-password"></p>
        </fieldset>
        <fieldset>
          <label>Repita la contraseña:</label>
          <input
            type="password"
            placeholder="Repite la nueva contraseña..."
            {...register("confirmPassword")}
          />
          <div>{errors.confirmPassword?.message}</div>
        </fieldset>
        <button disabled={!isValid || loading} type="submit">
          {loading ? "Cambiando contraseña..." : "Cambiar contraseña"}
        </button>
      </form>
    </section>
  );
};
