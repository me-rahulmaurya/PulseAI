import { useEffect, useState } from "react";

import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import useHealth from "../../hooks/useHealth";
import {
    createProfile,
    updateProfile,
} from "../../services/health.service";

export default function Health() {

    const { data, refetch } = useHealth();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        age: "",
        gender: "",
        height: "",
        weight: "",
        activityLevel: "",
        goal: "",
    });

    useEffect(() => {

    if(data){

        const p = data.profile;

        setForm({

            age: p.age || "",

            gender: p.gender || "",

            height: p.height || "",

            weight: p.weight || "",

            activityLevel: p.activityLevel || "",

            goal: p.goal || "",

        });

    }

},[data]);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

    e.preventDefault();

    try{

        setLoading(true);

        if(data){

            await updateProfile(form);

            alert("Profile updated!");

        }else{

            await createProfile(form);

            alert("Profile created!");

        }

        refetch();

    }

    catch(err){

        alert(
            err.response?.data?.message ||
            "Something went wrong."
        );

    }

    finally{

        setLoading(false);

    }

};

    return(

        <Card className="max-w-3xl">

            <h1 className="mb-6 text-3xl font-bold">

                Health Profile

            </h1>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-2 gap-4"
            >

                <Input
                    name="age"
                    placeholder="Age"
                    value={form.age}
                    onChange={handleChange}
                />

                <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="rounded-2xl border border-slate-200 p-3"
                >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>

                <Input
                    name="height"
                    placeholder="Height (cm)"
                    value={form.height}
                    onChange={handleChange}
                />

                <Input
                    name="weight"
                    placeholder="Weight (kg)"
                    value={form.weight}
                    onChange={handleChange}
                />

                <select
                    name="activityLevel"
                    value={form.activityLevel}
                    onChange={handleChange}
                    className="rounded-2xl border border-slate-200 p-3"
                >
                    <option value="">Select</option>

                    <option value="sedentary">Sedentary</option>

                    <option value="light">Light</option>

                    <option value="moderate">Moderate</option>

                    <option value="active">Active</option>

                    <option value="very_active">Very Active</option>

                </select>

                <select
                    name="goal"
                    value={form.goal}
                    onChange={handleChange}
                    className="rounded-2xl border border-slate-200 p-3"
                >
                    <option value="">Select Goal</option>

                    <option value="lose_weight">Lose Weight</option>

                    <option value="maintain">Maintain</option>

                    <option value="gain_weight">Gain Weight</option>

                </select>

                <Button
                    className="col-span-2"
                    disabled={loading}
                >

                    {loading
                        ? "Saving..."
                        : "Save Profile"}

                </Button>

            </form>

        </Card>

    );

}