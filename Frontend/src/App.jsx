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

function App() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          {/* Rutas abiertas */}
          <Route path="/" element={<Home />} />
          <Route path="/validation" element={<UserValidation />} />

          {/* Rutas para administradores */}
          <Route element={<AdminRoute />}>
            <Route path="/create_experience" element={<CreateExperience />} />
          </Route>

          {/* Rutas privadas */}
          <Route element={<PrivateRoute />}>
            <Route path="/reservations" element={<MyReservations />} />
            <Route path="/bookmarks" element={<BookMarks />} />
            <Route path="/account" element={<MyAccount />} />
            <Route path="/experience" element={<Experience />} />
          </Route>

          {/* Rutas publicas */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/recover_password" element={<RecoverPassword />} />
          </Route>

          {/* Ruta de error 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
