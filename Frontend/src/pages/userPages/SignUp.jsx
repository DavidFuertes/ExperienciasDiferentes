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
      <ToastContainer />
      <section className={styles.formSection}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

            <input
              className={styles.inputUsername}
              type="text"
              placeholder="Introduce un nombre"
              {...register("username")}
            />
            <p className={styles.errorMsg}>{errors.username?.message}</p>
            <input className={styles.inputEmail} type="email" placeholder="example@example.com" {...register("email")} />
            <p className={styles.errorMsg}>{errors.email?.message}</p>



            <input
            className={styles.inputPassword}
              type="password"
              placeholder="Contraseña"
              {...register("password")}
            />
            <p className={styles.errorMsg}>{errors.password?.message}</p>

          <button className={styles.createButton} disabled={!isValid} type="submit">
            Registrarse
          </button>
        </form>
      </section>
    </>
  );
};
