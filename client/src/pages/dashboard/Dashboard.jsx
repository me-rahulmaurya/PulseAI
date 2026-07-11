import Card from "../../components/ui/Card";
import useDashboard from "../../hooks/useDashboard";

export default function Dashboard() {

    const { data, isLoading } = useDashboard();

    if(isLoading){

        return <h2>Loading Dashboard...</h2>;

    }

    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-4xl font-bold">

                    Good Morning 👋

                </h1>

                <p className="text-slate-500">

                    Welcome back to PulseAI

                </p>

            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

                <Card>

                    <h3 className="font-semibold">

                        ❤️ BMI

                    </h3>

                    <p className="mt-4 text-3xl font-bold">

                        {data?.bmi ?? "--"}

                    </p>

                </Card>

                <Card>

                    <h3 className="font-semibold">

                        💧 Water

                    </h3>

                    <p className="mt-4 text-3xl font-bold">

                        {data?.waterConsumed ?? 0} mL

                    </p>

                </Card>

                <Card>

                    <h3 className="font-semibold">

                        🔥 Calories

                    </h3>

                    <p className="mt-4 text-3xl font-bold">

                        {data?.dailyCalories ?? "--"}

                    </p>

                </Card>

                <Card>

                    <h3 className="font-semibold">

                        💊 Medicines

                    </h3>

                    <p className="mt-4 text-3xl font-bold">

                        {data?.pendingMedicines ?? 0}

                    </p>

                </Card>

            </div>

            <Card>

                <h2 className="text-xl font-semibold">

                    Today's Insight

                </h2>

                <p className="mt-3 text-slate-600">

                    {data?.todayInsight || "No insight available."}

                </p>

            </Card>

        </div>

    );

}