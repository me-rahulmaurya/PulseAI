import { createContext, useEffect, useState } from "react";
import { getMe } from "../services/auth.service";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    const refreshUser = async () => {

        try {

            const data = await getMe();

            setUser(data);

        } catch {

            localStorage.removeItem("token");

            setUser(null);

        }

        setLoading(false);

    };

    useEffect(() => {

        if(localStorage.getItem("token")){

            refreshUser();

        }else{

            setLoading(false);

        }

    },[]);

    const logout = ()=>{

        localStorage.removeItem("token");

        setUser(null);

    };

    return(

        <AuthContext.Provider value={{
            user,
            loading,
            refreshUser,
            logout
        }}>

            {children}

        </AuthContext.Provider>

    );

}