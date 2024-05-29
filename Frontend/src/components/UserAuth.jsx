import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext.jsx";
import styles from "./UserAuth.module.css";

export const UserAuth = () => {
  const { user, logout } = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
                <span>
                  <Link to={`/myexperiences`}>Mis Experiencias</Link>
                </span>
                <span>
                  <Link to={`/account`}>Mi cuenta</Link>
                </span>
                {user.user.role === "admin" && (
                  <>
                    <span>
                      <Link to={`/experienceadministration`}>
                        Panel de Control
                      </Link>
                    </span>
                    <span>
                      <Link to={`/create_experience`}>Nueva experiencia</Link>
                    </span>
                  </>
                )}
                <span>
                  <button
                    onClick={() => {
                      logout();
                    }}
                  >
                    Deslogarse
                  </button>
                </span>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <Link to="/signup">
            <button>Registrarse</button>
          </Link>

          <Link to="/login">
            <button>Login</button>
          </Link>
        </>
      )}
    </section>
  );
};
