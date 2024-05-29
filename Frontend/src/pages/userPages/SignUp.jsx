import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { newUserSchema } from "../../schemas/newUserSchema.js";
import { Slide, ToastContainer, toast } from "react-toastify";
import styles from "./LogIn.module.css"
const { VITE_BACKEND_URL } = import.meta.env;

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onTouched",
    resolver: joiResolver(newUserSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const respData = await response.json();
      if (response.ok === true) {
        toast.success(respData.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });

        reset();
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
    <>
        <h1 className={styles.h1LogIn}>Página de Registro</h1>
    <div className={styles.divLogin}>
      <ToastContainer />
      <section >
        <form className={styles.formSection} onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <label className={styles.labelUsername}>Nombre de usuario:</label>
            <input
              className={styles.inputUsername}
              type="text"
              placeholder="Introduce un nombre"
              {...register("username")}
            />
            <p>{errors.username?.message}</p>
          </fieldset>
          <fieldset>
            <label className={styles.labelEmail}>Correo electrónico:</label>
            <input className={styles.inputEmail} type="email" placeholder="example@example.com" {...register("email")} />
            <p>{errors.email?.message}</p>
          </fieldset>
          <fieldset>
            <label className={styles.labelPassword}>Contraseña:</label>
            <input
            className={styles.inputPassword}
              type="password"
              placeholder="Contraseña"
              {...register("password")}
            />
            <p>{errors.password?.message}</p>
          </fieldset>
          <button className={styles.createButton} disabled={!isValid} type="submit">
            Registrarse
          </button>
        </form>
      </section>
    </div>
    </>
  );
};
