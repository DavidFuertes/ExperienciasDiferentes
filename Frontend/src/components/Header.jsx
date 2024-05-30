import { useNavigate } from "react-router-dom";
import { UserAuth } from "./UserAuth.jsx";
import styles from "./Header.module.css";
export const Header = () => {
  const navigate = useNavigate();
  return (
    <header className={styles.headerEd}>

          <img
            className={styles.logoHeader}
            src="https://res.cloudinary.com/dgokuinpf/image/upload/v1717031618/l1mt3pzuolq9uo5msfhn.png"
            alt="Logo experiencias diferentes"
            onClick={() => navigate("/")}
          />

      <nav>
        <UserAuth />
      </nav>
    </header>
  );
};
