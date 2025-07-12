import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/LoginForm.css"; // Asegúrate de tener un archivo CSS para estilos

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setError(null);
            const userRole = "usuario";
            login(userRole);
            navigate("/compracomida");
        } catch (err: any) {
            setError(err.message);
        }
    };

    const goToRegister = () => {
        navigate("/registro");
    };

    return (
        <div className="login-page">
            <form onSubmit={handleLogin} className="login-form">
                <h2>Iniciar Sesión</h2>
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="btn-login">Entrar</button>
                <button type="button" className="btn-register" onClick={goToRegister}>
                    ¿No tienes cuenta? Regístrate
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
