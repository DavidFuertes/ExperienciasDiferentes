import { useState } from "react";
import { validateRegistrationCode } from "../../services/index.js";

export const UserValidation = () => {
  const [registrationCode, setRegistrationCode] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fetchData = async (registrationCode) => {
    try {
      const response = await validateRegistrationCode(registrationCode);

      response.status === "ok" ? setIsValid(true) : setIsValid(false);
      if (response.status === "ok") {
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    await fetchData(registrationCode);
  };

  return (
    <div>
      <h1>Validación de usuario</h1>
      <input
        type="text"
        value={registrationCode}
        onChange={(event) => setRegistrationCode(event.target.value)}
      />
      <button onClick={handleSubmit}>Enviar</button>
      {isSubmitted && !isValid && <p>Código de registro inválido</p>}
      {isValid && <p>Usuario validado correctamente</p>}
    </div>
  );
};
