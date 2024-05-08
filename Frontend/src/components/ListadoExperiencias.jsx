import PropTypes from "prop-types";

export const ListadoExperiencias = ({ experiences }) => {
  return (
    <section>
      <ul>
        {experiences.map((experience) => (
          <li key={experience.id}>
            <h2>{experience.title}</h2>
            <p>{experience.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

ListadoExperiencias.propTypes = {
  experiences: PropTypes.array.isRequired,
};
