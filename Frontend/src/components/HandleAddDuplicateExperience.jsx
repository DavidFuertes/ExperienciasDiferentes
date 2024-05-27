import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { Slide, toast } from "react-toastify";
import styles from "./HandleAddDuplicateExperience.module.css";

function HandleAddDuplicateExperience({ data, modalIsOpen, setModalIsOpen }) {
  const { token } = useContext(UserContext);

  if (!data) {
    return <></>;
  }

  const {
    id,
    title,
    description,
    type,
    city,
    image,
    file,
    date,
    price,
    min_places,
    total_places,
    active,
  } = data;

  let activo = "";

  if (active === 1) {
    activo = "ACTIVO";
  } else {
    activo = "INACTIVO";
  }

  async function submitEditExperience(event) {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("type", type);
      formData.append("city", city);
      formData.append("newImage", file);
      formData.append("date", date);
      formData.append("price", price);
      formData.append("min_places", min_places);
      formData.append("total_places", total_places);
      formData.append("is_active", active);

      const resp = await fetch(
        `http://localhost:3000/api/experiences/edit/?id=${id}`,
        {
          method: "PATCH",
          headers: {
            token: token, // No es necesario 'Content-Type' cuando se usa FormData
          },
          body: formData,
        }
      );

      if (resp?.ok === true) {
        const respuesta = await resp.json();

        toast.success(respuesta.message, {
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
        setModalIsOpen(false);
      } else {
        throw new Error("Error al editar la experiencia");
      }
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

  async function submitDuplicateExperience(event) {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("type", type);
      formData.append("city", city);
      formData.append("newImage", file); // Si es un archivo, usa formData.append('image', file)
      formData.append("date", date);
      formData.append("price", price);
      formData.append("min_places", min_places);
      formData.append("total_places", total_places);

      const resp = await fetch(
        "http://localhost:3000/api/experiences/newexperience/",
        {
          method: "POST",
          headers: {
            token: token, // No es necesario 'Content-Type' cuando se usa FormData
          },
          body: formData,
        }
      );

      const data = await resp.json();

      if (resp?.ok === true) {
        toast.success(data[0].message, {
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
        setModalIsOpen(false);
      } else {
        throw new Error(data.message);
      }
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
  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  if (modalIsOpen) {
    return (
      <div className={styles.modal}>
        <form className={styles.modalContent} onSubmit={submitEditExperience}>
          <span className={styles.close} onClick={handleCloseModal}>
            &times;
          </span>
          <h4>{title}</h4>
          <img src={image} width="100"></img>
          <p>{type}</p>
          <p>{description}</p>
          <p>{date}</p>
          <p>{city}</p>
          <h5>{price}</h5>
          <h5>Plazas mínimas: {min_places}</h5>
          <h5>Plazas totales: {total_places}</h5>
          <strong>ESTADO: {activo}</strong>
          <div className={styles.divCheckBox}>
            <label>Confirmar Cambios</label>
            <input type="checkbox" required></input>
          </div>
          <button type="submit">Editar Experiencia</button>
          <button onClick={submitDuplicateExperience}>
            Crear nueva experiencia duplicada
          </button>
        </form>
      </div>
    );
  }

  return null;
}

export default HandleAddDuplicateExperience;
