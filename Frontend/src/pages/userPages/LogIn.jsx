import { useState } from "react";
const { VITE_BACKEND_URL } = import.meta.env;

export const LogIn = () => {
  // Estado para las credenciales del usuario
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  // Estado para manejar los mensajes de error
  const [error, setError] = useState("");

  // Maneja el cambio en los campos del formulario
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Maneja el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Limpiar errores anteriores

    try {
      const response = await fetch(`${VITE_BACKEND_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Usuario o contraseña incorrectos :(.");
      }

      // Procesar respuesta exitosa
      const data = await response.json();
      console.log("¡LogIn con éxito! :):", data);

      window.location.href = "/";
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Página de LogIn</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Correo electrónico:
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Contraseña:
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Iniciar sesión</button>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </form>
    </div>
  );
};
