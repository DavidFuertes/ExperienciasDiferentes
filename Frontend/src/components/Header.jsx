import { Link } from "react-router-dom";
import { UserAuth } from "./UserAuth.jsx";
import { SearchBar } from "./SearchBar.jsx";
import { useExperiences } from "../hooks/useExperiences.js";
export const Header = () => {
  const { experiences } = useExperiences();
  return (
    <header>
      <h1>
        <Link to={"/"}>Experiencias Diferentes</Link>
      </h1>

      <SearchBar experiences={experiences} />

      <nav>
        <UserAuth />
      </nav>
    </header>
  );
};
