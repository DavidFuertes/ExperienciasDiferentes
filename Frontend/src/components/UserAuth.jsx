import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext.jsx";

export const UserAuth = () => {
  const { user, logout } = useContext(UserContext);
  console.log("user", user);

  const renderAvatar = () => {
    if (user && user.user.avatar.data) {
      const byteArray = user.user.avatar.data;
      const base64String = btoa(
        String.fromCharCode(...new Uint8Array(byteArray))
      );
      const avatarUrl = `data:image/jpeg;base64,${base64String}`;
      console.log("avatarUrl", avatarUrl);
      return (
        <img
          src={avatarUrl}
          alt="avatar"
          style={{ maxWidth: "200px", maxHeight: "200px" }}
        />
      );
    }
    return null;
  };

  return user ? (
    <section>
      Bienvenido <Link to={`/account`}>{user.user.name}</Link>
      {renderAvatar()}
      {user.user.role === "admin" && (
        <Link to={`/experienceadministration`}>
          <button>Control Panel</button>
        </Link>
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
