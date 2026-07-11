import Button from "./components/ui/Button";
import Card from "./components/ui/Card";
import Input from "./components/ui/Input";

export default function App(){

    return(

        <main className="min-h-screen bg-slate-50 p-10">

            <div className="mx-auto max-w-md space-y-6">

                <Card>

                    <h1 className="mb-5 text-3xl font-bold">

                        PulseAI

                    </h1>

                    <Input
                        placeholder="Email"
                    />

                    <Input
                        className="mt-4"
                        placeholder="Password"
                    />

                    <Button
                        className="mt-5 w-full"
                    >

                        Sign In

                    </Button>

                </Card>

            </div>

        </main>

    );

}