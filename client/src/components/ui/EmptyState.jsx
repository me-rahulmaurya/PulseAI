import { Inbox } from "lucide-react";

export default function EmptyState({

    title,

    description

}){

    return(

        <div className="py-16 text-center">

            <Inbox
                size={60}
                className="mx-auto text-slate-300"
            />

            <h2 className="mt-6 text-xl font-semibold">

                {title}

            </h2>

            <p className="mt-2 text-slate-500">

                {description}

            </p>

        </div>

    );

}