import { useState } from "react";

export const RecoverPassword = () => {
  const [recoverCode, setRecoverCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSumit = async (e) => {
    e.preventDefault();

    // Validar que las contraseñas sean iguales
    if (password !== confirmPass) {
      setMessage({ text: "Las contraseñas no coinciden", type: "error" });
      return; // Detener el flujo si las contraseñas no son iguales
    }

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recoverCode, password }),
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:3000/api/users/password/recover",
        fetchOptions
      );

      const data = await response.json();

      if (response.status === 400) {
        setMessage({ text: data.message, type: "error" }); // Mostrar mensaje de error
      }

      if (response.ok) {
        setMessage({ text: data.message, type: "success" }); // Mostrar mensaje de éxito
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000); // Redirigir después de 2 segundos
      }
    } catch (err) {
      console.error(err);
      setMessage({ text: "Ocurrió un error inesperado.", type: "error" }); // Mostrar mensaje de error genérico
    }
  };

  const handleOnChangeCode = (e) => {
    setRecoverCode(e.target.value);
  };

  const handleOnChangePassword = (e) => {
    //Validate password pattern
    if (e.target.value.length < 8) {
      document.getElementById("message-error-password").innerHTML =
        "La contraseña debe tener al menos 8 caracteres";
    } else {
      document.getElementById("message-error-password").innerHTML = "";
    }
    setPassword(e.target.value);
  };

  const handleOnChangeConfirmPass = (e) => {
    if (e.target.value !== password) {
      document.getElementById("message-error").innerHTML =
        "Las contraseñas no coinciden";
    } else {
      document.getElementById("message-error").innerHTML = "";
    }
    setConfirmPass(e.target.value);
  };

  return (
    <section className="formSection">
      <h1>Página de creación de una nueva contraseña</h1>
      <form onSubmit={handleSumit}>
        <fieldset>
          <label htmlFor="email">Código de recuperación:</label>
          <input
            onChange={handleOnChangeCode}
            value={recoverCode}
            type="text"
            id="recocerCode"
            name="recoverCode"
          />
        </fieldset>
        <fieldset>
          <label htmlFor="email">Nueva contraseña:</label>
          <input
            onChange={handleOnChangePassword}
            value={password}
            type="password"
            id="password"
            name="password"
          />
          <p id="message-error-password"></p>
        </fieldset>
        <fieldset>
          <label htmlFor="email">Repita la contraseña:</label>
          <input
            onChange={handleOnChangeConfirmPass}
            value={confirmPass}
            type="password"
            id="connfirmPass"
            name="confirmPass"
          />
          <p id="message-error"></p>
        </fieldset>
        <fieldset>
          {message.text && (
            <p style={{ color: message.type === "error" ? "red" : "white" }}>
              {message.text}
            </p>
          )}
        </fieldset>
        <button type="submit">Crea una nueva contraseña</button>
      </form>
    </section>
  );
};
