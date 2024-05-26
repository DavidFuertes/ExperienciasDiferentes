import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext.jsx";

export const UserAuth = () => {
  const { user, logout } = useContext(UserContext);

  return user ? (
    <section>
      Bienvenido <Link to={`/account`}>{user.user.name}</Link>
      {user.user.role === "admin" && (
        <>
          <Link to={`/experienceadministration`}>
            <button>Control Panel</button>
          </Link>
          <Link to={`/create_experience`}>
            <button>New Experience</button>
          </Link>
        </>
      )}
      <Link to={`/`}>
        <button onClick={() => logout()}>Logout</button>
      </Link>
    </section>
  ) : (
    <ul>
      <li>
        <Link to={"/signup"}>Register</Link>
      </li>
      <li>
        <Link to={"/login"}>Login</Link>
      </li>
    </ul>
  );
};
