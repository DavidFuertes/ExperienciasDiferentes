import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Slide, ToastContainer, toast } from "react-toastify";
import { recoverPasswordSchema } from "../../schemas/recoverPasswordSchema.js";
import styles from "./LogIn.module.css"
const { VITE_BACKEND_URL } = import.meta.env;

export const RecoverPassword = () => {
  const { recoverCode } = useParams();
  const navigate = useNavigate();
  // Estado para las credenciales del usuario
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onTouched",
    resolver: joiResolver(recoverPasswordSchema),
  });
  console.log(isValid);

  const onSubmit = async (data) => {
    if (data.password === data.confirmPassword) {
      delete data.confirmPassword;
      const confirmedData = {
        ...data,
        recoverCode,
      };
      console.log(confirmedData);
      try {
        const response = await fetch(
          `${VITE_BACKEND_URL}/users/password/recover`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(confirmedData),
          }
        );

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
    }
  };

  return (
    <>
      <h1 className={styles.h1LogIn}>Página de creación de una nueva contraseña</h1>
      <div className={styles.divLogin}>
      <section className={styles.formSection}>
      <ToastContainer />
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
  
          <input
            className={styles.inputPassword}
            type="password"
            placeholder="Nueva contraseña"
            {...register("password")}
          />
          <p  className={styles.errorMsg}>{errors.password?.message}</p>

          <input
            className={styles.inputPassword}
            type="password"
            placeholder="Repita la contraseña"
            {...register("confirmPassword")}
          />
          <p  className={styles.errorMsg}>{errors.confirmPassword?.message}</p>

        <button className={styles.createButton} disabled={!isValid} type="submit">
          Crear contraseña
        </button>
      </form>
    </section>
    </div>
    </>
  );
};
