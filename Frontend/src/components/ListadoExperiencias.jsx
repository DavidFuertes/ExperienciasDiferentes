import PropTypes from "prop-types";
import { RedirectButton } from "./RedirectButton.jsx";

export const ListadoExperiencias = ({ experiences }) => {
  return (
    <section>
      <ul>
        {experiences
          .filter((experience) => experience.active === 1)
          .map((experience) => {
            const date = new Date(experience.date);
            const options = { year: "numeric", month: "long", day: "numeric" };
            const formattedDate = date.toLocaleDateString("es-ES", options);
            const roundedRating = parseFloat(experience.average_rating).toFixed(
              1
            );
            return (
              <li key={experience.id}>
                <article className="expCard">
                  <h2>{experience.title}</h2>
                  <p>Ciudad: {experience.city}</p>
                  <p>Intensidad: {experience.type}</p>
                  <p>Fecha: {formattedDate}</p>
                  <p>Plazas Totales: {experience.total_places}</p>
                  <p>
                    Plazas Disponibles:{" "}
                    {experience.total_places - experience.num_reservations}
                  </p>
                  <p>Precio: {experience.price} €</p>
                  <p>
                    {!isNaN(roundedRating)
                      ? `${roundedRating}⭐`
                      : "Sin valoración"}
                  </p>
                  <RedirectButton
                    text="Detalles"
                    redirectUrl={`/experience/${experience.id}`}
                  />
                </article>
              </li>
            );
          })}
      </ul>
    </section>
  );
};

ListadoExperiencias.propTypes = {
  experiences: PropTypes.array.isRequired,
};
