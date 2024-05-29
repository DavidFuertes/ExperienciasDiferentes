import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Slide, toast } from "react-toastify";

function Comment({ active, experienceId }) {
  const [rating, setRating] = useState(5);
  const [commentValue, setCommentValue] = useState("");
  const { token, user } = useContext(UserContext);

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

  if (active) {
    return (
      <>
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
