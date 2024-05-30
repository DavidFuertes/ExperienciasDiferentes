import { useState, useRef } from "react";
import styles from "./ExperienceList.module.css";

function ExperienceList({ experiences, onSelectExperience }) {
  const [filter, setFilter] = useState("");
  const selectRef = useRef(null);

  const filteredExperiences = experiences.filter((experience) =>
    experience.title.toLowerCase().includes(filter.toLowerCase())
  );

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    selectRef.current.focus();
  };

  const handleSelectChange = (expId) => {
    onSelectExperience(expId);
  };

  return (
    <section className={styles.filterBox}>
      <div className={styles.filterDiv}>
        <input
          type="text"
          placeholder="Filtrar experiencias"
          value={filter}
          onChange={handleFilterChange}
          onClick={() => selectRef.current.focus()}
          ref={selectRef}
        />
      </div>
      <div className={styles.resultsDiv}>
        <div className={styles.results}>
          {filteredExperiences.map((experience) => (
            <span
              onClick={() => handleSelectChange(experience.id)}
              key={experience.id}
              value={experience.id}
            >
              <p>{experience.title}</p>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ExperienceList;
