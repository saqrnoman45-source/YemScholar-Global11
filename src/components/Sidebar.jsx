import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const links = [
    { name: "لوحة التحكم", icon: "🏠", path: "/" },
    { name: "استكشف", icon: "🔍", path: "/explore" },
    { name: "دورات", icon: "📚", path: "/courses" },
    { name: "لوحة التحكم", icon: "📊", path: "/dashboard" },
    { name: "الملف الشخصي", icon: "👤", path: "/profile" },
    { name: "تسجيل الدخول", icon: "🔐", path: "/login" },
  ];

  return (
    <div className="w-64 h-screen bg-slate-900 text-white fixed right-0 top-0 shadow-lg border-l border-white/10">
      {/* Logo */}
      <div className="p-5 text-center text-2xl font-bold border-b border-white/10">
        🚀 NexPath
      </div>

      {/* Links */}
      <div className="mt-6 flex flex-col gap-2 px-3">
        {links.map((link, i) => (
          <NavLink
            key={i}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition
              ${
                isActive
                  ? "bg-sky-500 text-white"
                  : "hover:bg-slate-800 text-slate-300"
              }`
            }
          >
            <span className="text-xl">{link.icon}</span>
            <span>{link.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
