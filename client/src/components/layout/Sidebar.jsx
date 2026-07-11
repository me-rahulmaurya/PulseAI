import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Heart,
  Droplets,
  Pill,
  Bot,
  Apple,
  ScanFace,
  FileText,
  Settings,
} from "lucide-react";

const links = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Health",
    path: "/health",
    icon: Heart,
  },
  {
    name: "Water",
    path: "/water",
    icon: Droplets,
  },
  {
    name: "Medication",
    path: "/medication",
    icon: Pill,
  },
  {
    name: "AI Assistant",
    path: "/ai",
    icon: Bot,
  },
  {
    name: "Nutrition",
    path: "/nutrition",
    icon: Apple,
  },
  {
    name: "Skin Analysis",
    path: "/skin",
    icon: ScanFace,
  },
  {
    name: "Reports",
    path: "/reports",
    icon: FileText,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 border-r border-slate-200 bg-white">

      <div className="border-b border-slate-200 p-6">

        <h1 className="text-3xl font-bold text-blue-600">
          PulseAI
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Your Personal AI Health Companion
        </p>

      </div>

      <nav className="space-y-2 p-4">

        {links.map((item) => {

          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`
              }
            >
              <Icon size={20} />

              {item.name}
            </NavLink>
          );
        })}

      </nav>

    </aside>
  );
}