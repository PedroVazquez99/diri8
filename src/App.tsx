import { Routes, Route } from "react-router-dom";
import AuthPage from "./components/AuthPage"; // Tu login/registro
import MainComponent from "./components/MainComponent";
import PrivateRoute from "./guards/PrivateRoute"; // Tu ruta privada

function App() {

  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
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