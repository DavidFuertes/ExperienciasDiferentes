import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Slide, ToastContainer, toast } from "react-toastify";
import { changeUserPasswordSchema } from "../../schemas/changeUserPasswordSchema.js";
import { UserContext } from "../../context/UserContext.jsx";
import { useContext } from "react";
import styles from "./LogIn.module.css"
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
    <>
    <h1 className={styles.h1LogIn} >Cambiar contraseña</h1>

    <section className={styles.formSection}>
      <ToastContainer />
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

          <input
            className={styles.inputPassword}
            type="password"
            placeholder="Contraseña actual..."
            {...register("currentPassword")}
          />
          <p className={styles.errorMsg}>{errors.currentPassword?.message}</p>
          <input
            className={styles.inputPassword}
            type="password"
            placeholder="Nueva contraseña..."
            {...register("newPassword")}
          />
          <p className={styles.errorMsg}>{errors.newPassword?.message}</p>
          <input
            className={styles.inputPassword}
            type="password"
            placeholder="Confirma tu nueva contraseña..."
            {...register("confirmNewPassword", {
              validate: (value) =>
                value === getValues("newPassword") ||
                "Las contraseñas no coinciden",
            })}
          />
          <p className={styles.errorMsg}>{errors.confirmNewPassword?.message}</p>

        <button className={styles.createButton} disabled={!isValid} type="submit">
          Crear una nueva contraseña
        </button>
      </form>
    </section>
    </>
  );
};
