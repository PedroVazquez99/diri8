import { Routes, Route } from "react-router-dom";
import AuthPage from "./components/AuthPage"; // Tu login/registro
import MainComponent from "./components/MainComponent";
import PrivateRoute from "./guards/PrivateRoute"; // Tu ruta privada
import RegisterPage from "./components/RegisterPage";

function App() {

  return (
    <Routes>
      <Route path="/diri8" element={<AuthPage />} />
      <Route path="/registro" element={<RegisterPage />} />
      <Route path="/compracomida" element={<PrivateRoute><MainComponent /></PrivateRoute>} />
      {/* <Route
        path="/admin"
        element={role === "admin" ? <AdminPage /> : <Navigate to="/" />}
      />
      <Route
        path="/usuario"
        element={role === "usuario" ? <UserPage /> : <Navigate to="/" />}
      /> */}
    </Routes>
  );
}

export default App;