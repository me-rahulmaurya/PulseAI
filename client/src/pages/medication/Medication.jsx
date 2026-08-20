import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import useMedication from "../../hooks/useMedication";
import {
    addMedication,
    markTaken,
} from "../../services/medication.service";

export default function Medication() {

    const { data, isLoading } = useMedication();

    const queryClient = useQueryClient();

    const [form, setForm] = useState({
        name: "",
        time: "",
        frequency: "once",
    });

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value,

        });

    };

    const handleAdd = async () => {

        try{

            await addMedication(form);

            setForm({
                name: "",
                time: "",
                frequency: "once",
            });

            queryClient.invalidateQueries({
                queryKey:["medications"]
            });

        }

        catch(err){

            alert(

                err.response?.data?.message ||

                "Failed"

            );

        }

    };

    const handleTaken = async (id) => {

    console.log("Clicked", id);

    try {

        await markTaken(id);

        console.log("PATCH Success");

        queryClient.invalidateQueries({
            queryKey: ["medications"],
        });

    } catch (err) {

        console.log(err.response?.data || err);

    }

};

    if(isLoading){

        return <h2>Loading...</h2>;

    }

    return(

        <div className="space-y-8">

            <Card>

                <h1 className="text-3xl font-bold">

                    Medication 💊

                </h1>

                <div className="mt-6 grid grid-cols-3 gap-4">

                    <Input
                        name="name"
                        placeholder="Medicine"
                        value={form.name}
                        onChange={handleChange}
                    />

                    <select
                        name="frequency"
                        value={form.frequency}
                        onChange={handleChange}
                        className="rounded-2xl border border-slate-200 bg-white px-4 py-3"
                    >

                        <option value="once">Once</option>

                        <option value="twice">Twice</option>

                        <option value="thrice">Thrice</option>

                    </select>

                    <Input
                        type="time"
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                    />

                </div>

                <Button
                    className="mt-4"
                    onClick={handleAdd}
                >

                    Add Medication

                </Button>

            </Card>

            <Card>

                <h2 className="mb-4 text-xl font-semibold">

                    Your Medicines

                </h2>

                {

                    (data ?? []).length === 0

                    ?

                    <p>No medication added.</p>

                    :

                    (data ?? []).map((item)=>(

                        <div
                            key={item._id}
                            className="mb-3 flex items-center justify-between rounded-xl border p-4"
                        >

                            <div>

                                <h3 className="font-semibold">

                                    {item.name}

                                </h3>

                                <p className="text-sm text-slate-500">
                                    {item.frequency}
                                </p>

                                <p className="text-sm text-slate-500">

                                    {item.time}

                                </p>

                                {item.lastTakenAt ? (
                                    <p className="text-sm text-green-600">
                                        Last taken: {new Date(item.lastTakenAt).toLocaleString()}
                                    </p>
                                ) : (
                                    <p className="text-sm text-amber-600">
                                        Not taken yet
                                    </p>
)}

                            </div>

                            <Button
                                onClick={()=>{
                                    console.log(item);
                                    console.log(item._id);
                                    handleTaken(item._id);
                                }}
                            >

                                Mark Taken

                            </Button>

                        </div>

                    ))

                }

            </Card>

        </div>

    );

}