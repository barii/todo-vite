import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate({ to: "/login" });
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) {
        return <p>Redirecting to login...</p>;
    }

    return <>{children}</>;
}