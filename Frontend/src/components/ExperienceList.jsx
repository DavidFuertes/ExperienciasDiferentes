import React, { useState } from "react";

function ExperienceList({ experiences, onSelectExperience }) {
  const [filter, setFilter] = useState("");

  const filteredExperiences = experiences.filter((experience) =>
    experience.title.toLowerCase().includes(filter.toLowerCase())
  );

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSelectChange = (event) => {
    onSelectExperience(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Filtrar experiencias"
        value={filter}
        onChange={handleFilterChange}
      />
      <select onChange={handleSelectChange}>
        <option value="">Selecciona una experiencia</option>
        {filteredExperiences.map((experience) => (
          <option key={experience.id} value={experience.id}>
            {experience.title}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ExperienceList;
