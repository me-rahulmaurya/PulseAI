import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import { register } from "../../services/auth.service";

export default function Register() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({

        name: "",

        email: "",

        password: "",

        confirmPassword: "",

    });

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if(form.password!==form.confirmPassword){

            return alert("Passwords do not match.");

        }

        try{

            setLoading(true);

            await register({

                name:form.name,

                email:form.email,

                password:form.password,

            });

            alert("Registration Successful!");

            navigate("/login");

        }

        catch(err){

            alert(

                err?.response?.data?.message ||

                "Registration failed."

            );

        }

        finally{

            setLoading(false);

        }

    };

    return(

        <main className="flex min-h-screen items-center justify-center bg-slate-50">

            <Card className="w-full max-w-md">

                <h1 className="mb-2 text-3xl font-bold">

                    Create Account

                </h1>

                <p className="mb-6 text-slate-500">

                    Join PulseAI

                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <Input
                        placeholder="Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                    />

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

                    <Input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                    />

                    <Button
                        className="w-full"
                        disabled={loading}
                    >

                        {loading
                            ? "Creating..."
                            : "Create Account"}

                    </Button>

                </form>

                <p className="mt-6 text-center">

                    Already have an account?{" "}

                    <Link
                        className="text-blue-600"
                        to="/login"
                    >

                        Login

                    </Link>

                </p>

            </Card>

        </main>

    );

}