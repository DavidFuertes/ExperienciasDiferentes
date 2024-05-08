import { useState, useEffect } from "react";
import ExperienceList from "../../components/ExperienceList";
import EditExperience from "../../components/EditExperience";

function ExperienceAdministration() {
    const [experiences, setExperiences] = useState([]);
    const [selectedExperienceId, setSelectedExperienceId] = useState(null);
    const handleExperienceSelect = (experienceId) => {
        setSelectedExperienceId(experienceId);
    };
    console.log(selectedExperienceId)

    useEffect(() => {
        fetch('http://localhost:3000/api/experiences/', {
            method: 'GET',
            headers: {
                'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6ImFkbWluIiwiaWF0IjoxNzE0Nzg0MTQ1LCJleHAiOjE3MTczNzYxNDV9.Sswfd_QoDVCHyUbcvEYnsHcfIMfMPw_gBpMLLyGCwlU'
            }
        })
        .then(resp => {
            if (resp.status === 200) {
                return resp.json(); // Parsea la respuesta JSON
            } else {
                throw new Error('Error al obtener las experiencias');
            }
        })
        .then(data => {
            setExperiences(data); // Actualiza el estado con los datos
        })
        .catch(error => console.log(error.message));
    }, []); // Se pasa un arreglo vacío como dependencia para que se ejecute solo una vez al montar el componente

    return (
        <>
            <h1>Administración de Experiencias</h1>
            <section>
                <ExperienceList experiences={experiences} onSelectExperience={handleExperienceSelect} />
            </section>
            <section>
                <EditExperience experiences={experiences} experienceId={selectedExperienceId} />
            </section>
        </>
    );
}

export default ExperienceAdministration;
