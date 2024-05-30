import { useRef, useState } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./Loading.jsx";
import styles from "./ListadoExperiencias.module.css";
import { useNavigate } from "react-router-dom";

export const ListadoExperiencias = ({ experiences }) => {
  const parentElementRef = useRef(null);
  const navigate = useNavigate();
  const [visibleExperiences, setVisibleExperiences] = useState(4);

  const loadMoreExperiences = () => {
    const nextBatch = Math.min(visibleExperiences + 4, experiences.length);
    setVisibleExperiences(nextBatch);
  };

  console.log("Experiencias visibles:", visibleExperiences);
  console.log(
    "Experiencias pendientes de cargar:",
    experiences.length - visibleExperiences
  );

  return (
    <InfiniteScroll
      className={styles.listScroll}
      dataLength={visibleExperiences}
      next={loadMoreExperiences}
      hasMore={visibleExperiences < experiences.length}
      loader={<Loading />}
      endMessage={<p>No hay más experiencias por el momento.</p>}

      scrollableTarget={parentElementRef.current}
    >
      <section className={styles.listSectionSection}>
        <ul>
          {experiences.slice(0, visibleExperiences).map((experience) => (
            <li key={experience.id}>
              <div
                className={styles.expCard}
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate(`/experience/${experience.id}`);
                }}
              >
                <div className={styles.imageRate}>
                <img src={experience.image} className={styles.cardImg}></img>
                <p className={styles.cardRate}>
                  {experience.average_rating
                    ? `${parseFloat(
                        experience.average_rating
                      ).toFixed(1)} ⭐`
                    : "Sin valorar"}
                </p>
                </div>
                <div className={styles.expCardDiv}>
                <h2 className={styles.cardTitle}>{experience.title}</h2>
                <section className={styles.cardInfo}>
                <p className={styles.cardCity}>
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
                <p className={styles.cardIntensity}>{experience.type}</p>

                <p className={styles.cardAvailablePlaces}>
                  Plazas libres:{" "}
                  {experience.total_places - experience.num_reservations}
                </p>
                <p className={styles.cardPrice}>Precio: {experience.price} €</p>

                </section>

                <p className={styles.cardDate}>{experience.date}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
      
    </InfiniteScroll>
  );
};

ListadoExperiencias.propTypes = {
  experiences: PropTypes.array.isRequired,
};
