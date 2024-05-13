import { useState, useEffect, useContext } from "react";
import ExperienceList from "../../components/ExperienceList";
import EditExperience from "../../components/EditExperience";
import { UserContext } from "../../context/UserContext.jsx";
import { getAllExperiencesService } from "../../services/index.js";

function ExperienceAdministration() {
  const [experiences, setExperiences] = useState([]);
  const [selectedExperienceId, setSelectedExperienceId] = useState(null);
  const { token } = useContext(UserContext);
  const handleExperienceSelect = (experienceId) => {
    setSelectedExperienceId(experienceId);
    console.log("Selected experience ID:", experienceId);
  };

  useEffect(() => {
    // fetch("http://localhost:3000/api/experiences/", {
    //   method: "GET",
    //   headers: {
    //     token,
    //   },
    // })
    //   .then((resp) => {
    //     if (resp.status === 200) {
    //       return resp.json(); // Parsea la respuesta JSON
    //     } else {
    //       throw new Error("Error al obtener las experiencias");
    //     }
    //   })
    //   .then((data) => {
    //     setExperiences(data); // Actualiza el estado con los datos
    //   })
    //   .catch((error) => console.log(error.message));
    try {
      getAllExperiencesService(token).then((data) => setExperiences(data));
    } catch (error) {
      console.error("Error en la petición: ", error);
    }
  }, [token]); // Se pasa un arreglo vacío como dependencia para que se ejecute solo una vez al montar el componente

  return (
    <>
      <section className="formSection">
        <h1>Administración de Experiencias</h1>
        <ExperienceList
          experiences={experiences}
          onSelectExperience={handleExperienceSelect}
        />
      </section>
      <section className="formSection">
        <EditExperience
          experiences={experiences}
          experienceId={selectedExperienceId}
          token={token}
        />
      </section>
    </>
  );
}

export default ExperienceAdministration;
