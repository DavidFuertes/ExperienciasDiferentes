import { useState, useEffect, useContext } from "react";
import ExperienceList from "../../components/ExperienceList";
import EditExperience from "../../components/EditExperience";
import { UserContext } from "../../context/UserContext.jsx";
import { getAllExperiencesService } from "../../services/index.js";
import styles from "./ExperienceAdministration.module.css";

function ExperienceAdministration() {
  const [experiences, setExperiences] = useState([]);
  const [selectedExperienceId, setSelectedExperienceId] = useState(null);
  const { token } = useContext(UserContext);
  const handleExperienceSelect = (experienceId) => {
    setSelectedExperienceId(experienceId);
  };

  useEffect(() => {
    try {
      getAllExperiencesService().then((data) =>
        setExperiences(data.experiences)
      );
    } catch (error) {
      console.error("Error en la petición: ", error);
    }
  }, []); // Se pasa un arreglo vacío como dependencia para que se ejecute solo una vez al montar el componente

  return (
    <section className={styles.PanelControl}>
      <h1 className={styles.title}>Panel de Control</h1>

      <ExperienceList
        experiences={experiences}
        onSelectExperience={handleExperienceSelect}
      />
      <EditExperience
        experiences={experiences}
        experienceId={selectedExperienceId}
        token={token}
      />
    </section>
  );
}

export default ExperienceAdministration;
