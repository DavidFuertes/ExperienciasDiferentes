import React, { useState } from "react";
import PropTypes from "prop-types";
import { RedirectButton } from "./RedirectButton.jsx";
import InfiniteScroll from "react-infinite-scroll-component";

export const ListadoExperiencias = ({ experiences }) => {
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
    <section style={{ height: "500px", overflowY: "scroll" }}>
      <InfiniteScroll
        dataLength={visibleExperiences}
        next={loadMoreExperiences}
        hasMore={visibleExperiences < experiences.length}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No hay más experiencias por el momento.</p>}
        height={500} // Establece la altura del componente InfiniteScroll
      >
        <ul>
          {experiences.slice(0, visibleExperiences).map((experience) => (
            <li key={experience.id}>
              <article className="expCard">
                <h2>{experience.title}</h2>
                <p>Ciudad: {experience.city}</p>
                <p>Intensidad: {experience.type}</p>
                <p>Fecha: {experience.date}</p>
                <p>Plazas Totales: {experience.total_places}</p>
                <p>
                  Plazas Disponibles:{" "}
                  {experience.total_places - experience.num_reservations}
                </p>
                <p>Precio: {experience.price} €</p>
                <p>
                  {experience.average_rating
                    ? `${parseFloat(experience.average_rating).toFixed(1)}⭐`
                    : "Sin valoración"}
                </p>
                <RedirectButton
                  text="Detalles"
                  redirectUrl={`/experience/${experience.id}`}
                />
              </article>
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    </section>
  );
};

ListadoExperiencias.propTypes = {
  experiences: PropTypes.array.isRequired,
};
