import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import "./index.css";
// import { AuthContextProvider } from "./context/auth-context.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { GlobalErrorComponent } from "./components/GlobalErrorComponent.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ErrorBoundary FallbackComponent={GlobalErrorComponent}>
      <UserProvider>
        <App />
      </UserProvider>
    </ErrorBoundary>
  </BrowserRouter>
);
