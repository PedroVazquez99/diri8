import React, { createContext, useContext, useState } from "react";

type Role = "admin" | "usuario" | null;

interface AuthContextType {
    isAuthenticated: boolean;
    role: Role;
    login: (role: Role) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    role: null,
    login: () => { },
    logout: () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [role, setRole] = useState<Role>(null);

    const login = (userRole: Role) => {
        setAuthenticated(true);
        setRole(userRole);
    };

    const logout = () => {
        setAuthenticated(false);
        setRole(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};