//Importamos las variables de entorno
const { VITE_BACKEND_URL } = import.meta.env;

export const getAllExperiencesService = async (filters) => {
  //generamos la url
  let url = new URL(`${VITE_BACKEND_URL}/experiences`);

  //generamos los params
  let params = new URLSearchParams(url.search);

  //agregamos los filtros a los params iterando el objeto de filtros si los hay
  if (filters) {
    Object.keys(filters).forEach((key) => {
      params.append(key, filters[key]);
    });
  }

  //agregamos los params a la query convirtiendo el objeto a una query ?search=&sortBy=&sortOrder=&type=
  url.search = params.toString();

  //Hacemos la petición a la API
  const resp = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  //Extraemos los datos JSON de la respuesta
  const data = await resp.json();

  //Si la respuesta no fue exitosa, se lanza un error
  if (!resp.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const validateRegistrationCode = async (registrationCode) => {
  //Hacemos la petición a la API
  const resp = await fetch(
    `${VITE_BACKEND_URL}/users/validate/${registrationCode}`,
    {
      method: "PATCH",
    }
  );
  const respData = await resp.json();

  if (!resp.ok) {
    throw new Error(respData.message);
  }

  return respData;
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

export const obtainExperienceService = async (experienceId) => {
  try {
    const resp = await fetch(
      `${VITE_BACKEND_URL}/experiences/detail/?id=${experienceId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (resp.status === 200) {
      const response = await resp.json();
      return response; // Parsea la respuesta JSON
    } else {
      throw new Error("Error al obtener la experiencia");
    }
  } catch (error) {
    console.error("Error en la petición: ", error);
    throw error;
  }
};

export const bookExperienceService = async (
  token,
  experienceId,
  cancelation
) => {
  const resp = await fetch(`${VITE_BACKEND_URL}/experiences/reservation`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      token,
    },
    body: JSON.stringify({
      experience_id: experienceId,
      cancelation,
    }),
  });

  const json = await resp.json();

  if (!resp.ok) {
    throw new Error(json.message);
  }

  return json;
};
