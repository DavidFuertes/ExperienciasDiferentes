import { Link } from "react-router-dom";
import { UserAuth } from "./UserAuth.jsx";
import { SearchBar } from "./SearchBar.jsx";
import { useExperiences } from "../hooks/useExperiences.js";
import styles from "./Header.module.css";
export const Header = () => {
  const { experiences } = useExperiences();
  return (
    <header className={styles.headerEd}>
      <span>
        <Link to={"/"}> <img className={styles.logoHeader} src="https://res.cloudinary.com/dgokuinpf/image/upload/v1716744927/jmfblcuarh02e4br5088.png" alt="Logo experiencias diferentes" /> </Link>
      </span>

      <SearchBar experiences={experiences} />

      <nav>
        <UserAuth />
      </nav>
    </header>
  );
};
