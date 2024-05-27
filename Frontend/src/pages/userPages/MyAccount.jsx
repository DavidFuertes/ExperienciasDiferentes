import React, { useState, useEffect, useContext } from "react";
const { VITE_BACKEND_URL } = import.meta.env;
import { UserContext } from "../../context/UserContext.jsx";
import { Link, useNavigate } from "react-router-dom";

export const MyAccount = () => {
  const { token, setToken, user, setUser, login } = useContext(UserContext);
  const {
    name: currentName,
    email: currentEmail,
    date: currentDate,
    residence: currentResidence,
    languages: currentLanguages,
    avatar: currentAvatar,
  } = user.user;

  const logout = () => {
    console.log("Haciendo logout...");
    if (typeof setToken === "function") {
      setToken("");
    }
    if (typeof setUser === "function") {
      setUser(null);
    }
  };

  const [refreshPage, setRefreshPage] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    date: "",
    residence: "",
    languages: "",
    avatar: null,
  });

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [reloadPage, setReloadPage] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [defaultValues, setDefaultValues] = useState({
    name: currentName || "",
    email: currentEmail || "",
    date: currentDate || "",
    avatar: currentAvatar || null,
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Token cargado:", localStorage.getItem("token"));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setUserData((prevUserData) => ({
        ...prevUserData,
        avatar: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };

    e.preventDefault();
    try {
      const formData = new FormData();
      const defaultValuesCorrected = new Date(currentDate)
        .toLocaleDateString("es-ES", options)
        .replace(/[/.,]/g, "-");

      console.log(defaultValuesCorrected);

      const [day, month, year] = defaultValuesCorrected.split("-");
      const invertedDateString = `${year}-${month}-${day} `;

      console.log(invertedDateString);
      formData.append("name", userData.name || defaultValues.name);
      formData.append("email", userData.email || defaultValues.email);
      if (userData.date) {
        formData.append("date", userData.date);
      }

      if (userData.residence) {
        formData.append("residence", userData.residence);
      }
      if (userData.languages) {
        formData.append("languages", userData.languages);
      }

      if (userData.avatar) {
        formData.append("avatar", userData.avatar);
        console.log("Imagen encontrada en avatar:", userData.avatar);
      } else {
        console.log("No se encontró ninguna imagen en avatar");
      }

      console.log(formData);
      const response = await fetch(`${VITE_BACKEND_URL}/users/updateProfile`, {
        method: "PATCH",
        headers: {
          token,
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Error al actualizar los datos");
      }
      setModalMessage(
        "Información actualizada correctamente. ¿Quieres recargar la página?"
      );
      setShowModal(true);
      console.log("Datos actualizados:", userData);
    } catch (error) {
      console.error("Error al actualizar los datos: ", error);
    }
  };

  const closeModal = (reloadPage) => {
    setShowModal(false);
    if (reloadPage) {
      setRefreshPage(true);
    }
  };

  useEffect(() => {
    if (refreshPage) {
      if (confirmDelete) {
        logout();
        navigate("/");
      } else {
        navigate("/");
      }
      setRefreshPage(false);
    }
  }, [refreshPage, confirmDelete, logout, navigate]);

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/users/deleteAccount`, {
        method: "PATCH",
        headers: {
          token,
        },
      });
      if (!response.ok) {
        throw new Error("Error al eliminar la cuenta");
      }
      setRefreshPage(true);
    } catch (error) {
      console.error("Error al eliminar la cuenta: ", error);
    }
  };

  return (
    <div>
      <h1>Página de Perfil de usuario</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="date">Fecha de Nacimiento:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={userData.date}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="residence">Ciudad de Residencia:</label>
          <input
            type="text"
            id="residence"
            name="residence"
            value={userData.residence}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="languages">Lenguajes hablados:</label>
          <input
            type="text"
            id="languages"
            name="languages"
            value={userData.languages}
            onChange={handleInputChange}
            placeholder="Ingrese los idiomas separados por comas"
          />
        </div>

        <div>
          <label>
            <span>Imagen:</span>
            <input
              className="image-picker"
              name="avatar"
              type="file"
              onChange={handleFile}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="preview"
                style={{ maxWidth: "200px", maxHeight: "200px" }}
              />
            )}
          </label>
        </div>

        <button type="submit">Guardar Cambios</button>
      </form>

      <button onClick={() => setShowDeleteModal(true)}>Eliminar Cuenta</button>

      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <p style={{ color: "black" }}>
              ¿Estás seguro de que deseas eliminar tu cuenta?
            </p>
            <button onClick={() => setConfirmDelete(true)}>Sí</button>
            <button onClick={() => setShowDeleteModal(false)}>No</button>
          </div>
        </div>
      )}

      {showDeleteModal && confirmDelete && (
        <div className="modal">
          <div className="modal-content">
            <p style={{ color: "black" }}>
              ¡Es una lástima que hayas decidido abandonarnos! Esperamos
              volverte a ver :D.
            </p>
            <button onClick={handleDeleteAccount}>¡Hasta la próxima!</button>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p style={{ color: "black" }}>{modalMessage}</p>
            <button onClick={() => closeModal(true)}>Sí</button>
            <button onClick={() => closeModal(false)}>No</button>
          </div>
        </div>
      )}

      <style jsx>{`
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .modal-content {
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        }
      `}</style>
      <Link to="/account/ChangePassword">Quiero cambiar mi contraseña</Link>
    </div>
  );
};

export default MyAccount;
