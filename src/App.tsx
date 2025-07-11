import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import AuthPage from "./components/AuthPage"; // Tu login/registro
import MainComponent from "./components/MainComponent";

function App() {
  const { role } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/compracomida" element={<MainComponent />} />
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