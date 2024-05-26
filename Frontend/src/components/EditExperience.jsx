import { useState, useEffect } from "react";
import EditComments from "./EditComments.jsx";
import InscribedItems from "./InscribedItems.jsx";
import EditExperienceForm from "./EditExperienceForm.jsx";
import { deleteCommentFromExperienceService } from "../services/index.js";
import { Slide, toast } from "react-toastify";

function EditExperience({ experienceId, token }) {
  const [experience, setExperience] = useState(null);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [comments, setComments] = useState([]);
  const [inscribed, setInscribed] = useState([]);
  const [averageRate, setAverageRate] = useState(null);

  useEffect(() => {
    if (experienceId !== null) {
      fetch(
        `http://localhost:3000/api/experiences/detail/?id=${experienceId}`,
        {
          method: "GET",
          headers: {
            // 'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6InB1YmxpYyIsImlhdCI6MTcxNDczNzU4OSwiZXhwIjoxNzE3MzI5NTg5fQ.i9lVo9n7r6D4AmOa-YR0kNk8_Wzhaklia_afpIt8ghA',
            // 'Cache-Control': 'no-cache'
            token,
          },
        }
      )
        .then((resp) => {
          if (resp.status === 200) {
            return resp.json(); // Parsea la respuesta JSON
          } else {
            throw new Error("Error al obtener la experiencia");
          }
        })
        .then((data) => {
          setExperience(data); // Actualiza el estado con los datos
          const commentsObject = data.comments;
          const commentsArray = Object.values(commentsObject);
          setComments(commentsArray);
          const inscribedObject = data.inscribed;
          const inscribedArray = Object.values(inscribedObject);
          setInscribed(inscribedArray);
          const averageRate = data.rate[0].average_rate;
          setAverageRate(averageRate);
        })
        .catch((error) => console.log(error.message));
    }
  }, [experienceId, token]);

  const handleDeleteComment = async (id, token) => {
    try {
      const data = await deleteCommentFromExperienceService(id, token);

      const filteredComments = comments.filter((comment) => comment.id !== id);

      setComments(filteredComments);

      toast.success(data.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
    }
  };

  const filterInscribed = (id) => {
    setInscribed((prevInscribed) =>
      prevInscribed.filter((insc) => insc.id !== id)
    );
  };

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
    // const experienceObject = experience;
    // const experienceArray = Object.values(experienceObject);
    return (
      <>
        <section>
          <EditExperienceForm experienceInfo={experience.data} />
        </section>

        <section>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleDeleteComment(selectedCommentId, token);
            }}
          >
            <h2>Comentarios</h2>
            <ul>
              {comments.map((comment) => (
                <EditComments
                  key={comment.id}
                  comment={comment}
                  selectedCommentId={selectedCommentId}
                  onCommentSelect={setSelectedCommentId}
                />
              ))}
            </ul>
            <button type="submit">Eliminar Comentario</button>
          </form>
        </section>
        <section>
          <h4>Puntuación: {averageRate}</h4>
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
              {inscribed.map((inscribed) => (
                <InscribedItems
                  key={inscribed.name}
                  inscribed={{ inscribed }}
                  filterInscribed={filterInscribed}
                />
              ))}
            </tbody>
          </table>
        </section>
      </>
    );
  }
}

export default EditExperience;
