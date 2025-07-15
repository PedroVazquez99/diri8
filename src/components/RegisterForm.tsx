import React, { useState } from "react";
import "../styles/RegisterForm.css";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/AuthService";
import { getDatabase, ref, set } from "firebase/database";

const realtimeDb = getDatabase();

const RegisterForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<"admin" | "usuario">("usuario");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string>('');
    const navigate = useNavigate();
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            // 1. Registrar usuario en Firebase Auth
            const userCredential = await authService.signUp(email, password);
            console.log("Usuario registrado en Firestore:", e);

            await set(ref(realtimeDb, 'users/' + userCredential.user.uid), {
                email: userCredential.user.email,
                roles: { admin: role === "admin" }
            });

            setSuccess('Registro exitoso. Inicie sesión');
            console.log("Refgistro OK");

            // 3. Limpiar formulario
            setEmail("");
            setPassword("");
            setRole("usuario");
            setError(null);
            // alert("Registro exitoso"); // O redirigir a otra página

            setTimeout(() => {
                navigate('/diri8/');
            }, 2000);

        } catch (err: any) {
            setError('Este email ya existe.');
        }
    };

    return (
        <div className="login-page">
            <form className="login-form">
                <h2>Registro</h2>

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

                <select
                    value={role}
                    onChange={e => setRole(e.target.value as "admin" | "usuario")}
                    className="role-select"
                >
                    <option value="usuario">Usuario</option>
                    <option value="admin">Administrador</option>
                </select>

                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <button type="submit" className="btn-login" onClick={handleRegister}>Registrarse</button>
            </form>
        </div>
    );
};

export default RegisterForm;
