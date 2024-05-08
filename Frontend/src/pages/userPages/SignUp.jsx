import { useState } from "react";
const { VITE_BACKEND_URL } = import.meta.env;

export const SignUp = () => {
  // Estado del formulario
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Estado para manejar los mensajes de error
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Maneja el cambio en los campos del formulario
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Maneja el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Limpiar errores anteriores

    try {
      const response = await fetch(`${VITE_BACKEND_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(
          data.message || "Algo salió mal :( . Inténtelo de nuevo."
        );
      }

      // Procesar respuesta exitosa
      const data = await response.json();
      console.log("¡Registro con éxito!", data);

      if (data.status === "ok") {
        setSuccess(data.message);
      }
      // Aquí podrías redirigir al usuario o limpiar el formulario
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Página de Registro</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre de usuario:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Correo electrónico:
          <input
            type="email"
            name="email"
            value={formData.email}
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
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Registrarse</button>
        {error && <div style={{ color: "red" }}>{error}</div>}
        {success && <div style={{ color: "blue" }}>{success}</div>}
      </form>
    </div>
  );
};
