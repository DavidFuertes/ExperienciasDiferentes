import { useNavigate } from "react-router-dom";

export const RedirectButton = ({ text, redirectUrl }) => {
  const navigate = useNavigate();
  return <button onClick={() => navigate(redirectUrl)}>{text}</button>;
};
