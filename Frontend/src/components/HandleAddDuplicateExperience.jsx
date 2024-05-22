import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";


function HandleAddDuplicateExperience({ data, modalIsOpen, setModalIsOpen}) {
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

  if (active === true) {
    activo = "ACTIVO";
  } else {
    activo = "INACTIVO";
  }

  console.log(file);

  async function submitEditExperience(event) {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('id', id);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('type', type);
      formData.append('city', city);
      formData.append('image', image);
      formData.append('file', file);
      formData.append('date', date);
      formData.append('price', price);
      formData.append('min_places', min_places);
      formData.append('total_places', total_places);
      formData.append('is_active', active);

      const resp = await fetch(`http://localhost:3000/api/experiences/edit/?id=${id}`, {
        method: 'PATCH',
        headers: {
          'token': token, // No es necesario 'Content-Type' cuando se usa FormData
        },
        body: formData,
      });

      if (resp.status === 200) {
        const respuesta = await resp.json();
        console.log(respuesta);
        return respuesta;
      } else {
        throw new Error('Error al editar la experiencia');
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async function submitDuplicateExperience(event) {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('type', type);
      formData.append('city', city);
      formData.append('image', image); // Si es un archivo, usa formData.append('image', file)
      formData.append('date', date);
      formData.append('price', price);
      formData.append('min_places', min_places);
      formData.append('total_places', total_places);

      const resp = await fetch('http://localhost:3000/api/experiences/newexperience/', {
        method: 'POST',
        headers: {
          'token': token, // No es necesario 'Content-Type' cuando se usa FormData
        },
        body: formData,
      });

      if (resp.status === 200) {
        const respuesta = await resp.json();
        console.log(respuesta);
        setModalIsOpen(false);
        return respuesta;
      } else {
        throw new Error('Error al duplicar la experiencia');
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  if (modalIsOpen) {
    return (
      <div>
        <form onSubmit={submitEditExperience}>
          <h4>{title}</h4>
          <img src={image} width="100"></img>
          <p>{description}</p>
          <strong>{type}</strong>
          <br></br>
          <small>{date}</small>
          <p>{city}</p>
          <h5>{price}</h5>
          <h5>Plazas mínimas: {min_places}</h5>
          <h5>Plazas totales: {total_places}</h5>
          <strong>ESTADO: {activo}</strong>
          <br></br>
          <label>
            <input type="checkbox" required></input>
            Confirmo que todos los datos están correctos.
          </label>
          <br></br>
          <button type="submit">Editar Experiencia</button>
        </form>
        <button onClick={submitDuplicateExperience}>
          Crear nueva experiencia duplicada
        </button>
      </div>
    );
  }

  return null;
}

export default HandleAddDuplicateExperience;
