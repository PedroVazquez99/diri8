import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore();

const RegisterForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<"admin" | "usuario">("usuario");
    const [error, setError] = useState<string | null>(null);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setError(null);
            // Guarda el rol en Firestore
            await setDoc(doc(db, "users", userCredential.user.uid), {
                email,
                role,
            });
            // alert("Registro exitoso");
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleRegister}>
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
            <select value={role} onChange={e => setRole(e.target.value as "admin" | "usuario")}>
                <option value="usuario">Usuario</option>
                <option value="admin">Administrador</option>
            </select>
            <button type="submit">Registrarse</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    );
};

export default RegisterForm;