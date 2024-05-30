import { useEffect } from "react";
import { validateRegistrationCode } from "../../services/index.js";
import { useParams } from "react-router-dom";
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RedirectButton } from "../../components/RedirectButton.jsx";
import styles from "./LogIn.module.css";

export const UserValidation = () => {
  //Se recoge el código de registro de la URL
  const { registrationCode } = useParams();
  //Se utiliza un useEffect para que cuando se monte el componente se ejecute la función de validación
  useEffect(() => {
    const validateUser = async () => {
      try {
        const response = await validateRegistrationCode(registrationCode);
        response?.status === "ok" &&
          toast.success(response.message, {
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
    validateUser();
  }, [registrationCode]);

  return (
    <>
      <ToastContainer />
      <section className={styles.formSection}>
        <div className={styles.form}>
          <h1>¡Bienvenid@ a Experiencias Diferentes!</h1>
          <p>
            Experiencias Diferentes es una plataforma web que ofrece una
            variedad de experiencias grupales para usuarios interesados en
            actividades como surf, barranquismo, masajes, buceo, excursiones en
            velero, y más.
          </p>
          <p>
            Los usuarios pueden registrarse en la plataforma, buscar y reservar
            experiencias, gestionar su perfil y dejar valoraciones sobre las
            experiencias que hayan disfrutado.
          </p>
          <p>
            Habrá un usuario administrador que es el encargado de añadir las
            experiencias y configurarlas.
          </p>
          <RedirectButton text="Acceder" redirectUrl="/login" />
        </div>
      </section>
    </>
  );
};
