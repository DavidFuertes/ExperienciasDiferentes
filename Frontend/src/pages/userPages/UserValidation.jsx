import { useState, useEffect } from "react";
import { validateRegistrationCode } from "../../services/index.js";

export const UserValidation = () => {
  const [registrationCode, setRegistrationCode] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fetchData = async (registrationCode) => {
    try {
      const response = await validateRegistrationCode(registrationCode);

      response.status === "ok" ? setIsValid(true) : setIsValid(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    await fetchData(registrationCode);
  };

  useEffect(() => {
    if (isValid) {
      // Realiza alguna acción cuando isValid cambie a true
      console.log("El código de registro es válido");
    }
  }, [isValid]);

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
      {isValid && <p>Código de registro válido</p>}
    </div>
  );
};
