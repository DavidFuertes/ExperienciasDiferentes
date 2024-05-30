import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext.jsx";
import styles from "./UserAuth.module.css";

export const UserAuth = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const profile = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
</svg>

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <section>
      {user ? (
        <>
          <div className={styles.dropDown} onClick={toggleDropdown}>
            <div className={styles.spanUserName}>
              <img
                className={styles.avatarHeader}
                src={user.user.avatar}
                alt="avatar"
              />
              <p className={styles.userName}>{user.user.name}</p>
            </div>
            {dropdownOpen && (
              <div className={styles.desplegable}>
                <span onClick={() => navigate("/account")}>
                  <p >Mi cuenta</p>
                </span>
                <span onClick={() => navigate("/myexperiences")}>
                  <p>Mis Experiencias</p>
                </span>
                {user.user.role === "admin" && (
                  <>
                    <span onClick={() => navigate("/create_experience")}>
                      <p >Nueva experiencia</p>
                    </span>
                    <span onClick={() => navigate("/experienceadministration")}>
                      <p >
                        Panel de Control
                      </p>
                    </span>
                  </>
                )}
                <span onClick={() => {logout();}}>
                  <p>
                    Cerrar sesión
                  </p>
                </span>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <Link to="/signup">
            <button className={styles.headerButton}>Registrarse</button>
          </Link>

          <Link to="/login">
            <button className={styles.headerButton}>Login</button>
          </Link>
        </>
      )}
    </section>
  );
};
