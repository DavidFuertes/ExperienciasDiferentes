import { useNavigate } from "react-router-dom";
import styles from "../pages/userPages/LogIn.module.css";

export const RedirectButton = ({ text, redirectUrl }) => {
  const navigate = useNavigate();
  return (
    <button
      className={styles.createButton}
      onClick={() => navigate(redirectUrl)}
    >
      {text}
    </button>
  );
};
