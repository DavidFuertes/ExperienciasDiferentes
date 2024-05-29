import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { Slide, toast } from "react-toastify";

function Comment({ active, experienceId, comments }) {
  const [rating, setRating] = useState(5);
  const [commentValue, setCommentValue] = useState("");
  const { token } = useContext(UserContext);
  const [newComments, setNewComments] = useState(comments);

  useEffect(() => {
    fetch(`http://localhost:3000/api/experiences/myexperiences/comments/?id=${experienceId}`, {
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
      .then((comentario) => {
        setNewComments(comentario);
      })
      .catch((error) => console.log(error.message));
  }, [experienceId, token, commentValue]);

  

  async function sendComment(event) {
    event.preventDefault();
    try {
      const formData = new FormData();

      if (active === 1) {
        formData.append("content", commentValue);
      } else {
        formData.append("content", commentValue);
        formData.append("rate", rating);
      }

      const resp = await fetch(
        `http://localhost:3000/api/experiences/?id=${experienceId}`,
        {
          method: "POST",
          headers: {
            token: token, // No es necesario 'Content-Type' cuando se usa FormData
          },
          body: formData,
        }
      );

      const respuesta = await resp.json();

      console.log("respuesta", respuesta);

      if (resp?.ok === true) {
        toast.success(respuesta[0].message, {
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

      } else {
        throw new Error("Error al comentar la experiencia");
      }

      setCommentValue("");
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
  }

  let printComments;

  if (newComments === undefined) {
    printComments = (
        <>
            <h3>Comentarios</h3>
            <strong>Aún no hay comentarios.</strong>
        </>
    );
} else {
    printComments = (
        <>
            <h3>Comentarios</h3>{' '}
            {newComments.map((comment, index) => (
                <div key={index}>
                    <p>{comment.content}</p>
                    <p>Por: {comment.name}</p>
                </div>
            ))}
        </>
    );
}

  if (active) {
    return (
      <>
      <section>
        {printComments}
      </section>
        <form onSubmit={sendComment}>
          <input
            type="text"
            placeholder="¡Añade un comentario!"
            value={commentValue}
            minLength={10}
            maxLength={50}
            onChange={(event) => {
              setCommentValue(event.target.value);
            }}
          />
          <button type="submit">Comentar</button>
        </form>
      </>
    );
  } else {
    return (
      <>
        <section>
          {printComments}
        </section>
        <form onSubmit={sendComment}>
          <input
            type="text"
            placeholder="¡Cuéntanos cómo te fué!"
            value={commentValue}
            minLength={10}
            maxLength={50}
            onChange={(event) => {
              setCommentValue(event.target.value);
            }}
          />
          <div>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={rating}
              onChange={(event) => {
                setRating(event.target.value);
              }}
            ></input>
            <span>{rating}</span>
          </div>
          <button type="submit">Comentar</button>
        </form>
      </>
    );
  }
}

export default Comment;
