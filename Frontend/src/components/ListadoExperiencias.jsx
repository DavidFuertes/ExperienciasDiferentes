import PropTypes from "prop-types";
import { RedirectButton } from "./RedirectButton.jsx";

export const ListadoExperiencias = ({ experiences, filters }) => {
  const experiencesOrdenadas = [...experiences];

  if (filters.sortBy === "price") {
    if (filters.sortOrder === "asc") {
      experiencesOrdenadas.sort((a, b) => a.price - b.price);
    } else {
      experiencesOrdenadas.sort((a, b) => b.price - a.price);
    }
  } else if (filters.sortBy === "date") {
    if (filters.sortOrder === "asc") {
      experiencesOrdenadas.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else {
      experiencesOrdenadas.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  } else if (filters.sortBy === "average_rating") {
    if (filters.sortOrder === "asc") {
      experiencesOrdenadas.sort((a, b) => a.average_rating - b.average_rating);
    } else {
      experiencesOrdenadas.sort((a, b) => b.average_rating - a.average_rating);
    }
  }

  return (
    <section>
      <ul>
        {experiencesOrdenadas
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
                  <p>Precio: {experience.price}</p>
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
