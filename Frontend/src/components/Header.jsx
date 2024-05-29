import { Link } from "react-router-dom";
import { UserAuth } from "./UserAuth.jsx";
import styles from "./Header.module.css";
export const Header = () => {
  return (
    <header className={styles.headerEd}>
      <span>
        <Link to={"/"}>
          {" "}
          <img
            className={styles.logoHeader}
            src="https://res.cloudinary.com/dgokuinpf/image/upload/v1716744927/jmfblcuarh02e4br5088.png"
            alt="Logo experiencias diferentes"
          />{" "}
        </Link>
      </span>

      <nav>
        <UserAuth />
      </nav>
    </header>
  );
};
