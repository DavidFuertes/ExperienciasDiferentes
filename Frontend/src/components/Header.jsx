import { Link } from "react-router-dom";
import { UserAuth } from "./UserAuth.jsx";
export const Header = () => {
  return (
    <header>
      <h1>
        <Link to={"/"}>Experiencias Diferentes</Link>
      </h1>

      <nav>
        <UserAuth />
      </nav>
    </header>
  );
};
