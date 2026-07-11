export default function Input({

    className="",

    ...props

}){

    return(

        <input

            className={`
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-4
                py-3
                outline-none
                focus:border-blue-600
                ${className}
            `}

            {...props}

        />

    );

}