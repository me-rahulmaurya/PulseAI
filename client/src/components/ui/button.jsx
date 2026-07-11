import clsx from "clsx";

const variants = {

    primary:
        "bg-blue-600 text-white hover:bg-blue-700",

    secondary:
        "bg-white border border-slate-200 hover:bg-slate-50",

    danger:
        "bg-red-500 text-white hover:bg-red-600",

    ghost:
        "hover:bg-slate-100"

};

export default function Button({

    children,

    variant="primary",

    className="",

    ...props

}){

    return(

        <button

            className={clsx(

                "rounded-2xl px-5 py-3 font-semibold transition-all duration-200",

                variants[variant],

                className

            )}

            {...props}

        >

            {children}

        </button>

    );

}