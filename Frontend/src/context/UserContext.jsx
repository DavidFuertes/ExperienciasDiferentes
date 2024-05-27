import { createContext, useState, useEffect } from "react";
import { getUserDataService } from "../services/index.js";

export const UserContext = createContext(null);

const ConfirmLogoutModal = ({ showModal, closeModal }) => {
  if (!showModal) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <p style={{ color: "black" }}>
          ¿Estás seguro de que te quieres deslogar de la web?
        </p>
        <button onClick={() => closeModal(true)}>Sí</button>
        <button onClick={() => closeModal(false)}>No</button>
      </div>
    </div>
  );
};

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [reloadPage, setReloadPage] = useState(false);

  //Este useEffect actualizará siempre el valor del token según su estado
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  //Este useEffect obtiene la información del usuario haciendo una petición al Backend a través del token,
  //si no obtiene la información del usuario mantendrá el estado del token vacío y el estado de usuario en null
  useEffect(() => {
    const logout = () => {
      if (typeof setToken === "function") {
        setToken("");
      }
      if (typeof setUser === "function") {
        setUser(null);
      }
    };
    const getUserData = async () => {
      try {
        const data = await getUserDataService(token);
        setUser(data);
      } catch (error) {
        setToken("");
        setUser(null);
      }
    };

    if (token) getUserData();
  }, [token, setToken]);

  // Efecto para recargar la página si se establece el estado reloadPage a true
  useEffect(() => {
    if (reloadPage) {
      window.location.reload();
    }
  }, [reloadPage]);

  const logout = () => {
    setToken("");
    setUser(null);
  };

  const login = (token) => {
    setToken(token);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = (confirm) => {
    setShowModal(false);
    if (confirm) {
      logout();
      setReloadPage(true);
    }
  };

  return (
    <UserContext.Provider
      value={{ token, user, logout: openModal, login, setToken, setUser }}
    >
      {children}
      <ConfirmLogoutModal showModal={showModal} closeModal={closeModal} />
    </UserContext.Provider>
  );
};

// export const useUser = () => useContext(UserContext)[0];
// export const useSetUser = () => useContext(UserContext)[1];
