import { createContext, useContext, useState } from "react";
import {getAuthState} from "@/authProvider.ts";

export interface AuthContext {
    isAuthenticated: boolean;
    setAuthState: (isAuthenticated: boolean) => void;
}

export const createDefaultAuthContext = (): AuthContext => ({
    isAuthenticated: false,
    setAuthState: () => {},
});

// Define AuthContext
export const AuthContext = createContext<AuthContext>(createDefaultAuthContext());

// Custom hook to use auth state
export function useAuth() {
    return useContext(AuthContext);
}

// Auth Provider Component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const auth = getAuthState();
    const [isAuthenticated, setAuthState] = useState(auth);

    // useEffect(() => {
    //     // Check if user has a valid token
    //     const token = localStorage.getItem("token");
    //     setAuthState(!!token);
    // }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setAuthState }}>
            {children}
        </AuthContext.Provider>
    );
}