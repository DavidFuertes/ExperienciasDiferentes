import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header.jsx";
import { Home } from "./pages/Home.jsx";
import { PrivateRoute } from "./components/PrivateRoute.jsx";
import { MyReservations } from "./pages/experiencePages/MyReservations.jsx";
import { BookMarks } from "./pages/experiencePages/BookMarks.jsx";
import { MyAccount } from "./pages/userPages/MyAccount.jsx";
import { PublicRoute } from "./components/PublicRoute.jsx";
import { LogIn } from "./pages/userPages/LogIn.jsx";
import { SignUp } from "./pages/userPages/SignUp.jsx";
import { RecoverPassword } from "./pages/userPages/RecoverPassword.jsx";
import { UserValidation } from "./pages/userPages/UserValidation.jsx";
import { CreateExperience } from "./pages/experiencePages/CreateExperience.jsx";
import { AdminRoute } from "./components/AdminRoute.jsx";
import { NotFound } from "./pages/NotFound.jsx";
import { Experience } from "./pages/experiencePages/Experience.jsx";
//import { AuthContextProvider } from "./context/auth-context.jsx";
import { ForgetPassword } from "./pages/userPages/ForgetPassword.jsx";

import ExperienceAdministration from "./pages/experiencePages/ExperienceAdministration.jsx";

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          {/* Rutas abiertas */}
          <Route path="/" element={<Home />} />
          <Route path="/experience/:experienceId" element={<Experience />} />

          {/* Rutas para administradores */}
          <Route element={<AdminRoute />}>
            <Route
              path="/experienceadministration"
              element={<ExperienceAdministration />}
            />
            <Route path="/create_experience" element={<CreateExperience />} />
          </Route>

          {/* Rutas privadas */}
          <Route element={<PrivateRoute />}>
            <Route path="/reservations" element={<MyReservations />} />
            <Route path="/bookmarks" element={<BookMarks />} />
            <Route path="/account" element={<MyAccount />} />
          </Route>

          {/* Rutas publicas */}
          <Route element={<PublicRoute />}>
            <Route
              path="/validate/:registrationCode"
              element={<UserValidation />}
            />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forget_password" element={<ForgetPassword />} />
            <Route
              path="/recover_password/:recoverCode"
              element={<RecoverPassword />}
            />
          </Route>

          {/* Ruta de error 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
