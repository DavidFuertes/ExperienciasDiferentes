import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext.jsx";

export const UserAuth = () => {
  const { user, logout } = useContext(UserContext);

  return (
    <section>
      {user ? (
        <>
          <p>
            Bienvenido <Link to={`/account`}>{user.user.name}</Link>
          </p>
          <img
            src={user.user.avatar}
            alt="avatar"
            style={{ borderRadius: "50%", maxWidth: "40px", maxHeight: "40px" }}
          />
          {user.user.role === "admin" && (
            <>
              <Link to={`/experienceadministration`}>
                <button>Panel de Control</button>
              </Link>
              <Link to={`/create_experience`}>
                <button>Nueva experiencia</button>
              </Link>
            </>
          )}
          <button
            onClick={() => {
              logout();
              window.location.href = "/";
            }}
          >
            Deslogarse
          </button>
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
