import { useState } from "react";

export const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  const isValidEmail = (email) => {
    // Regular expression for basic email validation
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleSumit = async (e) => {
    e.preventDefault();
    if (isValidEmail(email) === false) {
      setMessage({ text: "El correo electrónico no es válido", type: "error" }); // Mostrar mensaje de error
      return;
    }

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    };

    try {
      await fetch(
        "http://127.0.0.1:3000/api/users/password/forget",
        fetchOptions
      );

      setMessage({
        text: `Si hay una cuenta asociada a ${email} recibirá un correo electrónico con un enlace para restablecer tu contraseña.`,
        type: "success",
      }); // Mostrar mensaje de éxito
    } catch (err) {
      console.error(err);
      setMessage({ text: "Ocurrió un error inesperado.", type: "error" }); // Mostrar mensaje de error genérico
    }
  };

  const handleOnChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div>
      <h1>Página olvidé mi contraseña</h1>
      <form onSubmit={handleSumit}>
        <label htmlFor="email">Correo electrónico:</label>
        <input
          onChange={handleOnChange}
          value={email}
          type="email"
          id="email"
          name="email"
        />
        <button type="submit">Obtener codigo</button>{" "}
        {message.text && (
          <p style={{ color: message.type === "error" ? "red" : "green" }}>
            {message.text}
          </p>
        )}
      </form>
    </div>
  );
};
