//Importamos las variables de entorno
const { VITE_BACKEND_URL } = import.meta.env;

export const getAllExperiencesService = async () => {
  try {
    //Hacemos la petición a la API
    const resp = await fetch(`${VITE_BACKEND_URL}/experiences`, {
      method: "GET",
    });

    //Extraemos los datos JSON de la respuesta
    const data = await resp.json();

    //Si la respuesta no fue exitosa, se lanza un error
    if (!resp.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    console.error("Error en la petición: ", error.message);
  }
};

export const validateRegistrationCode = async (registrationCode) => {
  //Hacemos la petición a la API
  const resp = await fetch(
    `${VITE_BACKEND_URL}/users/validate/${registrationCode}`,
    {
      method: "GET",
    }
  );

  if (!resp.ok) {
    throw new Error("El código de registro no es válido");
  }

  const json = await resp.json();

  return json;
};

export const getUserDataService = async (token) => {
  const resp = await fetch(`${VITE_BACKEND_URL}/users/profile`, {
    method: "GET",
    headers: {
      token,
    },
  });

  const json = await resp.json();

  if (!resp.ok) {
    throw new Error(json.message);
  }

  return json.data;
};

export const obtainExperienceService = async (experienceId, token) => {
  fetch(`${VITE_BACKEND_URL}/experiences/detail/?id=${experienceId}`, {
    method: "GET",
    headers: {
      token,
    },
  })
    .then((resp) => {
      if (resp.status === 200) {
        return resp.json(); // Parsea la respuesta JSON
      } else {
        throw new Error("Error al obtener la experiencia");
      }
    })
    .catch((error) => {
      console.error("Error en la petición: ", error);
      throw error;
    });
};
