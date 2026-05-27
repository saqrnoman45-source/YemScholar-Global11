import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const links = [
    { name: "الرئيسية", icon: "🏠", path: "/" },
    { name: "استكشف", icon: "🔍", path: "/explore" },
    { name: "الدورات", icon: "📚", path: "/courses" },
    { name: "لوحة التحكم", icon: "📊", path: "/dashboard" },
    {
  name: "التقدم",
  icon: "📊",
  path: "/progress"
    } ,
    { name: "الملف الشخصي", icon: "👤", path: "/profile" },
    { name: "تسجيل الدخول", icon: "🔐", path: "/login" },
  ];

  return (
    <div
  className="
  w-20 md:w-64
  h-screen
  fixed
  right-0
  top-0
  bg-slate-900
  text-white
  shadow-lg
  border-l
  border-white/10
  transition-all
  duration-300
  "
>
      {/* Logo */}
      <div className="p-5 text-center text-xl md:text-2xl font-bold border-b border-white/10">
        🚀
        <span className="hidden md:inline ml-2">
          NexPath
        </span>
      </div>

      {/* Links */}
      <div className="mt-6 flex flex-col gap-2 px-2 md:px-3">
        {links.map((link, i) => (
          <NavLink
            key={i}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center justify-center md:justify-start gap-3 px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-sky-500 text-white"
                  : "hover:bg-slate-800 text-slate-300"
              }`
            }
          >
            <span className="text-xl">
              {link.icon}
            </span>
            <span className="hidden md:inline">
  {link.name}
</span>

            <span className="hidden md:inline">
              {link.name}
            </span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
