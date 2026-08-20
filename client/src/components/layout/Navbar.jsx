import { Search, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Navbar() {

    const navigate = useNavigate();

    const { logout } = useAuth();

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4">
        
      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2">

        <Search size={18} />

        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none"
        />

      </div>

      <div className="flex items-center gap-3">

        <UserCircle size={36} />

        <div>

          <p className="font-semibold">
            Rahul
          </p>

          <p className="text-sm text-slate-500">
            Welcome Back
          </p>

        </div>
        <button
            onClick={()=>{
                logout();
                navigate("/login");
            }}
            className="rounded-lg bg-red-500 px-3 py-2 text-white"
        >

        Logout

        </button>
      </div>

    </header>
  );
}