import { useState } from "react";

export const RecoverPassword = () => {
  const [email, setEmail] = useState("");

  const handleSumit = async (e) => {
    e.preventDefault();

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:3000/api/users/password/recover",
        fetchOptions
      );

      if (!response.ok) {
        throw new Error("Error en la petición");
      }

      const data = await response.json();
      alert(`Modal opened with data: ${data.message}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOnChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div>
      <h1>Página de recuperación de contraseña</h1>
      <form onSubmit={handleSumit}>
        <label htmlFor="email">Correo electrónico:</label>
        <input
          onChange={handleOnChange}
          value={email}
          type="email"
          id="email"
          name="email"
        />
        <button type="submit">Recuperar contraseña</button>
      </form>
    </div>
  );
};
