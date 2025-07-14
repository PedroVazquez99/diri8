import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { auth } from "../firebase";
import "../styles/RegisterForm.css";

const db = getFirestore();

const RegisterForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<"admin" | "usuario">("usuario");
    const [error, setError] = useState<string | null>(null);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // 1. Registrar usuario en Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // 2. Guardar en Firestore (colección "users", doc ID = UID)
            await setDoc(doc(db, "users", userCredential.user.uid), {
                email,
                role,
                createdAt: new Date().toISOString()
            });

            // 3. Limpiar formulario
            setEmail("");
            setPassword("");
            setRole("usuario");
            setError(null);
            // alert("Registro exitoso"); // O redirigir a otra página

        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="login-page">
            <form onSubmit={handleRegister} className="login-form">
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

                <button type="submit" className="btn-login">Registrarse</button>
            </form>
        </div>
    );
};

export default RegisterForm;
