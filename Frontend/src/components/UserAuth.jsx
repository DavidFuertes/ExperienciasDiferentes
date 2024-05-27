import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext.jsx";

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
          <div onClick={toggleDropdown} style={{ cursor: "pointer" }}>
            <img
              src={user.user.avatar}
              alt="avatar"
              style={{
                borderRadius: "50%",
                maxWidth: "40px",
                maxHeight: "40px",
              }}
            />
            <span>
              Bienvenido, {user.user.name} <i className="fas fa-caret-down"></i>
            </span>
          </div>
          {dropdownOpen && (
            <ul>
              <li>
                <Link to={`/myexperiences`}>Mis Experiencias</Link>
              </li>
              <li>
                <Link to={`/account`}>Mi cuenta</Link>
              </li>
              {user.user.role === "admin" && (
                <>
                  <li>
                    <Link to={`/experienceadministration`}>
                      Panel de Control
                    </Link>
                  </li>
                  <li>
                    <Link to={`/create_experience`}>Nueva experiencia</Link>
                  </li>
                </>
              )}
              <li>
                <button
                  onClick={() => {
                    logout();
                  }}
                >
                  Deslogarse
                </button>
              </li>
            </ul>
          )}
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
