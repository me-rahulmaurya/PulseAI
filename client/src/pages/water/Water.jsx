import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

import useWater from "../../hooks/useWater";
import { addWater } from "../../services/water.service";

export default function Water(){

    const {data,isLoading}=useWater();

    const queryClient=useQueryClient();

    const [loading,setLoading]=useState(false);
    const [customAmount, setCustomAmount] = useState("");
    const add=async(amount)=>{

        try{

            setLoading(true);

            await addWater(amount);

            queryClient.invalidateQueries({

                queryKey:["water"]

            });

        }

        catch(err){

            alert(

                err.response?.data?.message ||

                "Failed."

            );

        }

        finally{

            setLoading(false);

        }

    };

    if(isLoading){

        return <h2>Loading...</h2>;

    }

    return(

        <div className="space-y-8">

            <Card>

                <h1 className="text-3xl font-bold">

                    Water Tracker 💧

                </h1>

                <p className="mt-2 text-slate-500">

                    Today's Intake

                </p>

                <p className="mt-5 text-5xl font-bold">

                    {data.total} mL

                </p>

            </Card>

            <div className="flex gap-4">

                <Button
                    disabled={loading}
                    onClick={()=>add(250)}
                >

                    +250 mL

                </Button>

                <Button
                    disabled={loading}
                    onClick={()=>add(500)}
                >

                    +500 mL

                </Button>

                <Button
                    disabled={loading}
                    onClick={()=>add(1000)}
                >

                    +1000 mL

                </Button>

            </div>
            
            <div className="mt-6 flex gap-3">
                <input
                    type="number"
                    placeholder="Amount (mL)"
                    value={customAmount}
                    onChange={(e)=>setCustomAmount(e.target.value)}
                    className="rounded-xl border border-slate-300 px-4 py-2"
                />

                <Button
                    onClick={()=>{
                        if(!customAmount) return;
                        add(Number(customAmount));
                        setCustomAmount("");
                    }}
                >
                    Add
                </Button>

            </div>
            <Card>

                <h2 className="mb-4 text-xl font-semibold">

                    Today's Entries

                </h2>

                {

                    data.entries.length===0

                    ?

                    <p>No water logged today.</p>

                    :

                    data.entries.map((item)=>(

                        <div

                            key={item._id}

                            className="flex justify-between border-b py-3"

                        >

                            <span>

                                {item.amount} mL

                            </span>

                            <span>

                                {

                                    new Date(

                                        item.consumedAt

                                    ).toLocaleTimeString()

                                }

                            </span>

                        </div>

                    ))

                }

            </Card>

        </div>

    );

}