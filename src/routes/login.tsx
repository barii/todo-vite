import { useContext, useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {useForm} from "react-hook-form";

import {login} from "@/api/auth.ts";
import {persistAuthState} from "@/authProvider.ts";
import {AuthContext} from "@/contexts/AuthContext.tsx";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import {Form} from "@/components/ui/form.tsx";
import LogoSvg from "@/assets/react.svg";
import { InputField } from "@/components/ui/input-field.tsx";

interface FormData {
    email: string;
    password: string;
}

export const Route = createFileRoute("/login")({
  component: LoginComponent,
});

function LoginComponent() {
    const { isAuthenticated, setAuthState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");

    const form = useForm<FormData>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { handleSubmit } = form;

    const navigate = useNavigate();

    async function handleLogin(data: FormData) {
        try {
            setLoading(true);
            setServerError("");

            const response = await login(data.email, data.password);
            const token = response.data.token;
            setAuthState(true);
            persistAuthState(token);
        } catch (e) {
            setServerError("Invalid login credentials. Please try again.");
        } finally {
            setLoading(false);
        }
    }
    // after a successful login we need to wait until the root component's state gets updated
    // otherwise the navigate() method will navigate when
    // the auth guard will be still activated due to stale state of the AuthProvider
    useEffect(() => {
        if (isAuthenticated) {
            navigate({ to: "/" });
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="flex min-h-full flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8">
            <div className="">
                <img src={LogoSvg} className="mx-auto h-10 w-auto" alt="logo"/>
                <CardTitle className="mt-8 text-center text-2xl">Login</CardTitle>
                <CardDescription className="mb-8">
                    Enter your credentials to login to your account.
                </CardDescription>
            </div>
            <Form {...form}>
                <Card className="w-full max-w-sm pt-8">
                    <CardContent className="grid gap-4">
                        <form>
                            <div className="grid gap-2">
                                <InputField
                                    name="email"
                                    label="Email"
                                    placeholder="m@example.com"
                                    type="email"

                                    rules={{ required: "Email is required" }}
                                />
                            </div>
                            <div className="grid gap-2">
                                <InputField
                                    name="password"
                                    label="Password"
                                    type="password"
                                    autoComplete="on"

                                    rules={{ required: "Password is required" }}
                                />
                            </div>
                            {serverError && (
                                <div className="rounded-md bg-destructive px-3 py-2 text-white">{serverError}</div>
                            )}
                        </form>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" disabled={loading} onClick={handleSubmit(handleLogin)}>
                            Sign in
                        </Button>
                    </CardFooter>
                </Card>
            </Form>
        </div>
    );
}

