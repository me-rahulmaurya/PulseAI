import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import { login } from "../../services/auth.service";
import useAuth from "../../hooks/useAuth";

export default function Login() {

    const navigate = useNavigate();

    const { refreshUser } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const data = await login(form);

            localStorage.setItem(
                "token",
                data.accessToken
            );

            await refreshUser();

            navigate("/");

        } catch (err) {

            alert(
                err?.response?.data?.message ||
                "Login failed."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <main className="flex min-h-screen items-center justify-center bg-slate-50">

            <Card className="w-full max-w-md">

                <h1 className="mb-2 text-3xl font-bold">

                    Welcome Back 👋

                </h1>

                <p className="mb-6 text-slate-500">

                    Sign in to PulseAI

                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <Input
                        placeholder="Email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                    />

                    <Input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                    />

                    <Button
                        className="w-full"
                        disabled={loading}
                    >

                        {loading
                            ? "Signing In..."
                            : "Sign In"}

                    </Button>

                </form>

                <p className="mt-6 text-center">

                    Don't have an account?{" "}

                    <Link
                        className="text-blue-600"
                        to="/register"
                    >

                        Register

                    </Link>

                </p>

            </Card>

        </main>

    );

}