import { useState, useEffect } from "react";
import EditComments from "./EditComments.jsx";
import InscribedItems from "./InscribedItems.jsx";
import EditExperienceForm from "./EditExperienceForm.jsx";

function EditExperience({ experienceId }) {
    const [experience, setExperience] = useState(null);

    useEffect(() => {
        if (experienceId !== null) {
            fetch(`http://localhost:3000/api/experiences/detail/?id=${experienceId}`, {
                method: 'GET',
                headers: {
                    'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6InB1YmxpYyIsImlhdCI6MTcxNDczNzU4OSwiZXhwIjoxNzE3MzI5NTg5fQ.i9lVo9n7r6D4AmOa-YR0kNk8_Wzhaklia_afpIt8ghA',
                    'Cache-Control': 'no-cache'
                }
            })
            .then(resp => {
                if (resp.status === 200) {
                    return resp.json(); // Parsea la respuesta JSON
                } else {
                    throw new Error('Error al obtener la experiencia');
                }
            })
            .then(data => {
                setExperience(data); // Actualiza el estado con los datos
            })
            .catch(error => console.log(error.message));
        }
    }, [experienceId]);

    if (experienceId === null) {
        return (
            <>
                <h3>Selecciona una experiencia para modificar.</h3>
            </>
        );
    } else if (!experience) {
        return (
            <>
                <p>Cargando...</p>
            </>
        );
    } else {


        //const experienceObject = experience;
        //const experienceArray = Object.values(experienceObject);
        
        const commentsObject = experience.comments; 
        const commentsArray = Object.values(commentsObject);
            

        const { average_rate } = experience.rate[0];

        const inscribedObject = experience.inscribed;
        const inscribedArray = Object.values(inscribedObject);

    


        return (
            <>
                <section>
                <EditExperienceForm experienceInfo={experience.data} />

                </section>

                <section>
                    <form>
                        <h2>Comentarios</h2>
                        <ul>
                            {commentsArray.map(comment => (
                            <EditComments key={comment.id} comment={comment} />
                            ))}
                        </ul>
                    </form>
                    <button type="submit">Eliminar Comentario</button>

                    
                </section>
                <section>
                    <h4>Puntuación: {average_rate}</h4>
                </section>
                <section>
                    <h2>Inscritos</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>AVATAR</th>
                                <th>NOMBRE</th>
                                <th>EMAIL</th>
                                <th>ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inscribedArray.map(inscribed => (
                            <InscribedItems key={inscribed.name} inscribed={inscribed} />
                            ))}
                        </tbody>
                    </table>
                </section>




            </>
        );
    }
}

export default EditExperience;
