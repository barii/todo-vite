import {Link, Outlet, createRootRoute, useNavigate} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Button } from "@/components/ui/button";
import {Moon, LogOut} from "lucide-react";
import {unpersistAuthState} from "@/authProvider.ts";
import {useAuth} from "@/contexts/AuthContext.tsx";
import {useEffect} from "react";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate({ to: "/login" });
        }
    }, [isAuthenticated, navigate]);

    return (
    <div className="justify-center items-center max-w-[960px] m-auto h-full">
        <div className="p-2 flex gap-2 text-lg ">
            <Link
                to="/"
                activeProps={{
                    className: "font-bold",
                }}
                activeOptions={{exact: true}}
            >
                Home
            </Link>{" "}
            <Link
                to="/about"
                activeProps={{
                    className: "font-bold",
                }}
            >
                About
            </Link>
            <div className="ml-auto">
                <Button className="inline-flex items-center justify-center rounded-md text-sm font-bold uppercase transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-tertiary text-tertiary-foreground shadow-sm hover:bg-tertiary/70"
                    onClick={() => {
                        const htmlElement = document.documentElement;
                        if (htmlElement.classList.contains("dark")) {
                            htmlElement.classList.remove("dark");
                            localStorage.setItem("theme", "light");
                        } else {
                            htmlElement.classList.add("dark");
                            localStorage.setItem("theme", "dark");
                        }
                    }}
                >
                    <Moon size={24} className="text-primary dark:text-gray-800"/>
                </Button>

                <Button className="inline-flex ml-1 items-center justify-center rounded-md text-sm font-bold uppercase transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-tertiary text-tertiary-foreground shadow-sm hover:bg-tertiary/70"
                    onClick={() => {
                        unpersistAuthState();
                    }}
                >
                    <LogOut size={24} className="text-primary dark:text-gray-800"/>
                </Button>
            </div>
        </div>
        <hr className="mb-2"/>
        <div className="justify-center items-center">
            <Outlet/>
        </div>
        <TanStackRouterDevtools position="bottom-right"/>
    </div>
  );
}

