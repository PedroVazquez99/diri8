import React, {
    createContext, useEffect, useState,
    ReactNode,
    useContext
} from 'react';
import { authService } from '../services/AuthService';
import { Role } from '../services/IAuthService';

interface AuthContextProps {
    user: any | null;
    roles: Role[] | null;
    isAuthenticated: boolean;
}
export const AuthContext = createContext<AuthContextProps>({ user: null, roles: null, isAuthenticated: false });

interface AuthProviderProps {
    children: ReactNode;
}

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<any | null>(null);
    const [roles, setRoles] = useState<Role[] | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        const unsubscribe = authService.onAuthStateChanged(async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                try {
                    const userRoles = await authService.getUserRoles(currentUser);
                    setRoles(userRoles);
                    if (userRoles.length > 0) {
                        setIsAuthenticated(true);
                    }
                }
                catch (error) {
                    console.error('Error al obtener los roles:', error);
                    setRoles(null);
                }
            } else {
                setRoles(null);
            }
        });
        return unsubscribe;
    }, []);
    return (
        <AuthContext.Provider value={{ user, roles, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}