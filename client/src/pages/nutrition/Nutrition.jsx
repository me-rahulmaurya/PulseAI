import { useState } from "react";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

import { generateNutrition } from "../../services/ai.service";

export default function Nutrition() {

    const [preference, setPreference] = useState("vegetarian");

    const [plan, setPlan] = useState(null);

    const [loading, setLoading] = useState(false);

    const generate = async () => {

        try {

            setLoading(true);

            const data = await generateNutrition(preference);

            setPlan(data);

        }

        catch (err) {

            alert(
                err.response?.data?.message ||
                "Failed to generate nutrition plan."
            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="space-y-8">

            <Card>

                <h1 className="text-3xl font-bold">

                    AI Nutrition Planner 🥗

                </h1>

                <p className="mt-2 text-slate-500">

                    Generate a personalized nutrition plan based on your health profile.

                </p>

                <div className="mt-6 flex gap-4">

                    <select
                        value={preference}
                        onChange={(e)=>setPreference(e.target.value)}
                        className="rounded-xl border px-4 py-3"
                    >

                        <option value="vegetarian">Vegetarian</option>

                        <option value="vegan">Vegan</option>

                        <option value="high_protein">High Protein</option>

                        <option value="keto">Keto</option>

                    </select>

                    <Button
                        onClick={generate}
                        disabled={loading}
                    >
                        {loading ? "Generating..." : "Generate Plan"}
                    </Button>

                </div>

            </Card>

            {plan && (

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                    <MealCard title="🍳 Breakfast" meal={plan.breakfast} />

                    <MealCard title="🍛 Lunch" meal={plan.lunch} />

                    <MealCard title="🥘 Dinner" meal={plan.dinner} />

                    <MealCard title="🥜 Snacks" meal={plan.snacks} />

                </div>

            )}

        </div>

    );

}

function MealCard({ title, meal }) {

    return (

        <Card>

            <h2 className="text-xl font-semibold">

                {title}

            </h2>

            <p className="mt-4">

                {meal}

            </p>

        </Card>

    );

}