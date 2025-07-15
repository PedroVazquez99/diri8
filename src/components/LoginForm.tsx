import React, { useState } from "react";
import { authService } from '../services/AuthService';
import { useNavigate } from "react-router-dom";
import "../styles/LoginForm.css"; // Asegúrate de tener un archivo CSS para estilos

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        try {
            const userCredential = await authService.signIn(email, password);
            console.log("Usuario autenticado:", userCredential.user);
            navigate('/compracomida');
        } catch (error: any) {
            console.error("Error al iniciar sesión:", error);
            setError(error.message);
        }
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
                {error && <p className="error-message">Credenciales incorrectas</p>}
                <button type="submit" className="btn-login">Entrar</button>
            </form>
        </div>
    );
};

export default LoginForm;
