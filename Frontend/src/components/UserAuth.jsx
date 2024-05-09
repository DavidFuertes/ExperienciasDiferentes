import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext.jsx";

export const UserAuth = () => {
  const { user, logout } = useContext(UserContext);

  return user ? (
    <section>
      Logged in as <Link to={`/account`}>{user.user.name}</Link>{" "}
      {user.user.role === "admin" && (
        <Link to={`/experienceadministration`}>
          <button>Control Panel</button>
        </Link>
      )}
      <button onClick={() => logout()}>Logout</button>
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
