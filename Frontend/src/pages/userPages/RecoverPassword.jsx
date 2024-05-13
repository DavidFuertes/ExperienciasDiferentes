import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Slide, ToastContainer, toast } from "react-toastify";
import { recoverPasswordSchema } from "../../schemas/recoverPasswordSchema.js";
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
    <section className="formSection">
      <ToastContainer />
      <h1>Página de creación de una nueva contraseña</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <label>Nueva contraseña:</label>
          <input
            type="password"
            placeholder="Contraseña..."
            {...register("password")}
          />
          <div>{errors.password?.message}</div>
          <p id="message-error-password"></p>
        </fieldset>
        <fieldset>
          <label>Repita la contraseña:</label>
          <input
            type="password"
            placeholder="Contraseña..."
            {...register("confirmPassword")}
          />
          <div>{errors.confirmPassword?.message}</div>
        </fieldset>
        <button disabled={!isValid} type="submit">
          Crea una nueva contraseña
        </button>
      </form>
    </section>
  );
};
