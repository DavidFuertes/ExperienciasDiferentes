import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext.jsx";
import ActiveExperienceList from "../../components/ActiveExperiencesList.jsx";
import InactiveExperienceList from "../../components/InactiveExperienceList.jsx";
import styles from "../../components/ExperienceData.module.css";
import { ToastContainer } from "react-toastify";
function MyExperiences() {
  const [myExperiences, setMyExperiences] = useState([]);
  const { token } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:3000/api/experiences/myexperiences/", {
      method: "GET",
      headers: {
        token,
      },
    })
      .then((resp) => {
        if (resp.status === 200) {
          return resp.json(); // Parsea la respuesta JSON
        } else {
          throw new Error("Error al obtener las experiencias");
        }
      })
      .then((data) => {
        setMyExperiences(data);
      })
      .catch((error) => console.log(error.message));
  }, [token]);

  const getCurrentDateTime = () => {
    return new Date();
  };

  const inactiveExperiences = myExperiences.filter(
    (exp) => new Date(exp.formatted_date) < getCurrentDateTime()
  );
  const activeExperiences = myExperiences.filter(
    (exp) => new Date(exp.formatted_date) >= getCurrentDateTime()
  );

  return (
    <>
      <ToastContainer />
      <section className={styles.myExperiencesSection}>
      <h1 className={styles.titleDetails}>Experiencias por vivir</h1>
        <section>
          
          {activeExperiences.length > 0 ? (
            <ActiveExperienceList activeExperiences={activeExperiences} />
          ) : (
            <p className="experience-card">
              No hay ninguna experiencia que mostrar aquí aún
            </p>
          )}
        </section>
        <h1 className={styles.titleDetails}>Experiencias pasadas</h1>
        <section >
          {inactiveExperiences.length > 0 ? (
            <InactiveExperienceList inactiveExperiences={inactiveExperiences} />
          ) : (
            <p className="experience-card">
              No hay ninguna experiencia que mostrar aquí aún
            </p>
          )}
        </section>
      </section>
    </>
  );
}

export default MyExperiences;
