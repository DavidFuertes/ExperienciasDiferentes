import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { Slide, ToastContainer, toast } from "react-toastify";
import { forgetPasswordSchema } from "../../schemas/forgetPasswordSchema.js";
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
    <div>
      <ToastContainer />
      <section className="formSection">
        <h1>Quiero cambiar mi contraseña</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <label htmlFor="email">Correo electrónico:</label>
            <input type="email" placeholder="Email..." {...register("email")} />
            <p>{errors.email?.message}</p>
          </fieldset>
          <button disabled={!isValid} type="submit">
            Recuperar contraseña
          </button>
        </form>
      </section>
    </div>
  );
};
