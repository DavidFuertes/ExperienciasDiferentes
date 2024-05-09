//Importamos las variables de entorno
const { VITE_BACKEND_URL } = import.meta.env;

export const getAllExperiencesService = async () => {
  try {
    //Hacemos la petición a la API
    const resp = await fetch(`${VITE_BACKEND_URL}/experiences`, {
      method: "GET",
      headers: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwicm9sZSI6InB1YmxpYyIsImlhdCI6MTcxNTA5MTM5MCwiZXhwIjoxNzE3NjgzMzkwfQ.NXYnGkGvgfdKGoqxtASpieT7T_UcKNkB8ckWYVXk4ow",
      },
    });

    //Extraemos los datos JSON de la respuesta
    const json = await resp.json();

    //Si la respuesta no fue exitosa, se lanza un error
    if (!resp.ok) {
      throw new Error(json.message);
    }
    return json;
  } catch (error) {
    console.error("Error en la petición: ", error);
    throw error;
  }
};

export const validateRegistrationCode = async (registrationCode) => {
  try {
    //Hacemos la petición a la API
    console.log(registrationCode);
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
  } catch (error) {
    console.error("Error en la petición: ", error);
    throw error;
  }
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
