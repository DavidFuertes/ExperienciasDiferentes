import { Link } from "react-router-dom";
import { UserAuth } from "./UserAuth.jsx";
import { SearchBar } from "./SearchBar.jsx";
import { useExperiences } from "../hooks/useExperiences.js";
import styles from "./Header.module.css";
export const Header = () => {
  const { experiences } = useExperiences();
  return (
    <header className={styles.headerEd}>
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
