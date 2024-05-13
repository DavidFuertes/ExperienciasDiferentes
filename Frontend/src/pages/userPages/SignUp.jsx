import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { newUserSchema } from "../../schemas/newUserSchema.js";
import { Slide, ToastContainer, toast } from "react-toastify";
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
    <div>
      <ToastContainer />
      <section className="formSection">
        <h1>Página de Registro</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <label>Nombre de usuario:</label>
            <input
              type="text"
              placeholder="Nombre de usuario..."
              {...register("username")}
            />
            <p>{errors.username?.message}</p>
          </fieldset>
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
            <p>{errors.password?.message}</p>
          </fieldset>
          <button disabled={!isValid} type="submit">
            Registrarse
          </button>
        </form>
      </section>
    </div>
  );
};
