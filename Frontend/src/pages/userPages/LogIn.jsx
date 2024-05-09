import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext.jsx";
const { VITE_BACKEND_URL } = import.meta.env;

export const LogIn = () => {
  // Estado para las credenciales del usuario
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  // Estado para manejar los mensajes de error
  const [error, setError] = useState("");

  const { login } = useContext(UserContext);

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
      const processedResp = await response.json();
      // console.log("¡LogIn con éxito! :):", data);
      const token = processedResp.data.token;
      login(token);
      window.location.href = "/";
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <section className="formSection">
        <h1>Página de Log In</h1>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label>Correo electrónico:</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </fieldset>
          <fieldset>
            <label>Contraseña:</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </fieldset>
          <button type="submit">Iniciar sesión</button>
          <Link to="/forget_password">Olvidé mi contraseña</Link>
          {error && <div style={{ color: "red" }}>{error}</div>}
        </form>
      </section>
    </div>
  );
};
