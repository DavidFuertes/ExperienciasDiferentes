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
        <h1  className={styles.titleDetails}>{experience.title}</h1>
        <section className={styles.sectionDetails}>

        <div className={styles.divDetails}>
          <div className={styles.imageRate}>
            <img
              className={styles.experienceImgDetails}
              src={experience.image}
              alt={experience.title}
            />
            <p className={styles.experienceRateDetails}>
              {!isNaN(roundedRating) ? `${roundedRating}⭐` : "Sin valoración"}
            </p>

          </div>
        <p className={styles.experienceDescriptionDetails}>{experience.description}</p>
        <p className={styles.experienceDateDetails}> {formattedDate}</p>
        <section className={styles.sectionData}>
          <div className={styles.leftInfo}>
            <p className={styles.experienceCityDetails}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="currentColor"
                    className="bi bi-geo-alt-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                  </svg>{" "}
                  {experience.city}
            </p>
            <p className={styles.experienceFreeDetails}>Plazas: {experience.total_places - reserved_places}</p>
          </div>
          <div className={styles.rightInfo}>
            <p className={styles.experienceLevelDetails}> {experience.type}</p>
            <p className={styles.experiencePriceDetails}>{experience.price}€</p>
          </div>


        </section>
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
        </section>
      </>
    );
};