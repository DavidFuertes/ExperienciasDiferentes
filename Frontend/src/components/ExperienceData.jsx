import { useContext, useEffect, useState } from "react";
import { bookExperienceService } from "../services/index.js";
import styles from "./ExperienceData.module.css";
import { UserContext } from "../context/UserContext.jsx";
import { Slide, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ExperienceData = ({
  experience,
  experienceId,
  inscribed,
  rate,
}) => {
  const navigate = useNavigate();
  const { token, user } = useContext(UserContext);
  const [cancelation, setCancelation] = useState(0);

  // Verificamos si el usuario está inscrito al cargar el componente con el método some
  useEffect(() => {
    if (!user) {
      setCancelation(0);
    } else if (inscribed.some((objeto) => objeto.id === user.user.id)) {
      setCancelation(1);
    } else {
      setCancelation(0);
    }
  }, [inscribed, user]);

  // averiguamos el número de plazas reservadas
  const reserved_places = inscribed.length;

  //formateamos la fecha
  const date = new Date(experience.date);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("es-ES", options);

  //redondeamos el rating
  const roundedRating = parseFloat(rate.average_rate).toFixed(1);

  const handleSubmit = async (e, value) => {
    e.preventDefault();
    if (!token) {
      navigate("/login");
    }
    try {
      const response = await bookExperienceService(
        token,
        experienceId,
        cancelation
      );

      setCancelation(value);

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
      toast.error(
        "Para reservar la experiencia debes iniciar sesión o registrarte.",
        {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        }
      );
    }
  };

  if (experience)
    return (
    <>
        <h1  className={styles.titleDetails}>Detalle de la experiencia</h1>
        <div className={styles.divDetails}>
        <h2 className={styles.experienceTitleDetails}>{experience.title}</h2>
        <img
          className={styles.experienceImgDetails}
          src={experience.image}
          alt={experience.title}
          style={{ width: "350px" }}
        />
        <p className={styles.experienceDescriptionDetails}>{experience.description}</p>
        <p className={styles.experienceCityDetails}>  {experience.city}</p>
        <p className={styles.experienceLevelDetails}> {experience.type}</p>
        {/* <p className={styles.experienceTotalDetails}>Plazas totales: {experience.total_places}</p> */}
        <p className={styles.experienceFreeDetails}>Plazas libres: {experience.total_places - reserved_places}</p>
        <p className={styles.experienceDateDetails}> {formattedDate}</p>
        <p className={styles.experienceRateDetails}>
          Rating:{" "}
          {!isNaN(roundedRating) ? `${roundedRating}⭐` : "Sin valoración"}
        </p>
        <p className={styles.experiencePriceDetails}>Precio: {experience.price}€</p>
        {cancelation === 0 ? (
          <button className={styles.bookButton} type="button" onClick={(e) => handleSubmit(e, 1)}>
            Reservar
          </button>
        ) : (
          <button className={styles.cancelButton} type="button" onClick={(e) => handleSubmit(e, 0)}>
            Cancelar reserva
          </button>
        )}
      </div>
      </>
    );
};