import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext.jsx";
import ActiveExperienceList from "../../components/ActiveExperiencesList.jsx";
import InactiveExperienceList from "../../components/InactiveExperienceList.jsx";

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

      const inactiveExperiences = myExperiences.filter(exp => exp.status === 1);
      const activeExperiences = myExperiences.filter(exp => exp.status === 0);



    return (
        <>
        <section className="myExperiences">
            <section className="activeExperiences">
                <h1>Experiencias vividas</h1>
                <ActiveExperienceList activeExperiences={activeExperiences} />
            </section>
            <section className="inactiveExperiences">
                <h1>Experiencias por vivir</h1>
                <InactiveExperienceList inactiveExperiences={inactiveExperiences} />
            </section>
        </section>
        </>
    )

}

export default MyExperiences;