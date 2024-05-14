import { createContext, useState, useEffect } from "react";
// import useLocalStorage from "../hooks/useLocalStorage";
import { getUserDataService } from "../services/index.js";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  // const [user, setUser] = useLocalStorage("session", "");
  // return (
  //   <UserContext.Provider value={[user, setUser]}>
  //     {children}
  //   </UserContext.Provider>
  // );
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  //Este useEffect actualizará siempre el valor del token según su estado
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  //Este useEffect obtiene la información del usuario haciendo una petición al Backend a través del token,
  //si no obtiene la información del usuario mantendrá el estado del token vacío y el estado de usuario en null
  useEffect(() => {
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

  const logout = () => {
    setToken("");
    setUser(null);
  };

  const login = (token) => {
    setToken(token);
  };

  return (
    <UserContext.Provider value={{ token, user, logout, login }}>
      {children}
    </UserContext.Provider>
  );
};

// export const useUser = () => useContext(UserContext)[0];
// export const useSetUser = () => useContext(UserContext)[1];
