import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";

function HandleAddDuplicateExperience({ data, isOpen }) {
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

  console.log(id);

  async function submitEditExperience(event) {
    event.preventDefault();
    try {
      const resp = await fetch(
        `http://localhost:3000/api/experiences/edit/?id=${id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            // token:
            //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6ImFkbWluIiwiaWF0IjoxNzE0Nzg0MTQ1LCJleHAiOjE3MTczNzYxNDV9.Sswfd_QoDVCHyUbcvEYnsHcfIMfMPw_gBpMLLyGCwlU",
            token,
          },
          body: JSON.stringify({
            title: title,
            description: description,
            type: type,
            city: city,
            image: image,
            date: date,
            price: price,
            min_places: min_places,
            total_places: total_places,
            is_active: active,
          }),
        }
      );

      if (resp.status === 200) {
        const respuesta = await resp.json();
        console.log(respuesta);
        return respuesta;
      } else {
        throw new Error("Error al obtener las experiencias");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async function submitDuplicateExperience(event) {
    event.preventDefault();
    try {
      const resp = await fetch(
        "http://localhost:3000/api/experiences/newexperience/",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            // token:
            //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6ImFkbWluIiwiaWF0IjoxNzE0Nzg0MTQ1LCJleHAiOjE3MTczNzYxNDV9.Sswfd_QoDVCHyUbcvEYnsHcfIMfMPw_gBpMLLyGCwlU",
            token,
          },
          body: JSON.stringify({
            title: title,
            description: description,
            type: type,
            city: city,
            image: image,
            date: date,
            price: price,
            min_places: min_places,
            total_places: total_places,
          }),
        }
      );

      if (resp.status === 201) {
        const respuesta = await resp.json();
        console.log(respuesta);
        return respuesta;
      } else {
        throw new Error("Error al obtener las experiencias");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  if (isOpen) {
    return (
      <div>
        <form onSubmit={submitEditExperience}>
          <h4>{title}</h4>
          <p>{image}</p>
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
}

export default HandleAddDuplicateExperience;
