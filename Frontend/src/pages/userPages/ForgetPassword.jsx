import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { Slide, ToastContainer, toast } from "react-toastify";
import { forgetPasswordSchema } from "../../schemas/forgetPasswordSchema.js";
import styles from "./LogIn.module.css"
const { VITE_BACKEND_URL } = import.meta.env;

export const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onTouched",
    resolver: joiResolver(forgetPasswordSchema),
  });
  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `${VITE_BACKEND_URL}/users/password/forget`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const respData = await response.json();
      if (response.ok === true) {
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
        <h1 className={styles.h1LogIn}>Olvidé mi contraseña</h1>

      <ToastContainer />
      <section className={styles.formSection}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

  
            <input className={styles.inputEmail} type="email" placeholder="example@example.com" {...register("email")} />
            <p className={styles.errorMsg}>{errors.email?.message}</p>

          <button className={styles.createButton} disabled={!isValid} type="submit">
            Recuperar contraseña
          </button>
        </form>
      </section>

    </>
  );
};
