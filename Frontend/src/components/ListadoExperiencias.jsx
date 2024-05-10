import PropTypes from "prop-types";

export const ListadoExperiencias = ({ experiences }) => {
  return (
    <section>
      <ul>
        {experiences.map((experience) => {
          const date = new Date(experience.date);
          const options = { year: "numeric", month: "long", day: "numeric" };
          const formattedDate = date.toLocaleDateString("es-ES", options);

          return (
            <li key={experience.id}>
              <article className="expCard">
                <h2>{experience.title}</h2>
                <p>Ciudad: {experience.city}</p>
                <p>Descripción: {experience.description}</p>
                <p>Intensidad: {experience.type}</p>
                <p>Fecha: {formattedDate}</p>
                <p>precio: {experience.price}</p>
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
