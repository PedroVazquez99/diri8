import React, { useState } from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

const RegisterPage: React.FC = () => {
    const [showRegister, setShowRegister] = useState(false);

    return (
        <>
            <div>
                <button onClick={() => setShowRegister(false)}>Iniciar Sesión</button>
                <button onClick={() => setShowRegister(true)}>Registrarse</button>

            </div>
            <div>
                {showRegister ? <RegisterForm /> : <LoginForm />}
            </div>
        </>
    );
};

export default RegisterPage;