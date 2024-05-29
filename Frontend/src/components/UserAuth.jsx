import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext.jsx";
import styles from "./UserAuth.module.css"

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
            <span className={styles.spanUserName}>
               Bienvenido, {user.user.name} {/* <i className="fas fa-caret-down"></i> */}
            </span>
          <div onClick={toggleDropdown}>
            <img
              className={styles.avatarHeader}
              src={user.user.avatar}
              alt="avatar"
            />
          {dropdownOpen && (

            <div className = {styles.desplegable}>
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
        <ul>
          <li>
            <Link to="/signup">Registrarse</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </section>
  );
};
