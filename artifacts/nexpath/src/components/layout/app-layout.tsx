import { useState, ReactNode } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  FlaskConical,
  FileText,
  Sparkles,
  Settings,
  Bell,
  Search,
  ChevronRight,
  Menu,
  X,
  Zap,
  ShieldCheck,
  LogIn,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: BookOpen,         label: "Courses",     href: "/courses" },
  { icon: GraduationCap,   label: "Scholarships", href: "/scholarships" },
  { icon: FlaskConical,    label: "Tests",        href: "/tests" },
  { icon: FileText,        label: "Research",     href: "/articles" },
  { icon: Sparkles,        label: "Skills",       href: "/skills" },
];

const bottomItems = [
  { icon: ShieldCheck, label: "Admin",    href: "/admin" },
  { icon: Settings,    label: "Settings", href: "#" },
  { icon: LogIn,       label: "Login",    href: "/login" },
];

function SidebarContent({ current, onClose }: { current: string; onClose?: () => void }) {
  const isActive = (href: string) => href !== "#" && current.startsWith(href);

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="h-16 flex items-center gap-3 px-5 border-b border-zinc-800 shrink-0">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-sky-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
          <Zap className="w-4 h-4 text-white" />
        </div>
        <span className="text-base font-bold tracking-tight text-white">NexPath</span>
        {onClose && (
          <button onClick={onClose} className="ml-auto text-zinc-500 hover:text-white transition-colors lg:hidden">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider px-3 mb-2">Main Menu</p>
        {navItems.map(({ icon: Icon, label, href }) => {
          const active = isActive(href);
          return (
            <Link
              key={label}
              href={href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group
                ${active
                  ? "bg-violet-600/20 text-white border border-violet-500/30 shadow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/70"
                }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${active ? "text-violet-400" : "text-zinc-500 group-hover:text-zinc-300"}`} />
              <span>{label}</span>
              {active && <ChevronRight className="w-3 h-3 ml-auto text-violet-400" />}
            </Link>
          );
        })}

        <div className="pt-4 mt-3 border-t border-zinc-800/70">
          <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider px-3 mb-2">System</p>
          {bottomItems.map(({ icon: Icon, label, href }) => {
            const active = isActive(href);
            return (
              <Link
                key={label}
                href={href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group
                  ${active
                    ? "bg-violet-600/20 text-white border border-violet-500/30"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/70"
                  }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${active ? "text-violet-400" : "text-zinc-500 group-hover:text-zinc-300"}`} />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User profile */}
      <div className="p-3 border-t border-zinc-800">
        <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-zinc-800/70 cursor-pointer transition-all">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-sky-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
            JL
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Jordan Lee</p>
            <p className="text-xs text-zinc-500 truncate">student@nexpath.io</p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface AppLayoutProps {
  children: ReactNode;
  pageTitle?: string;
  pageSubtitle?: string;
}

export function AppLayout({ children, pageTitle, pageSubtitle }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-60 bg-zinc-900 border-r border-zinc-800/80 flex flex-col
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:z-auto`}
      >
        <SidebarContent current={location} onClose={() => setSidebarOpen(false)} />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <header className="h-14 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800/80 flex items-center gap-3 px-5 shrink-0 sticky top-0 z-10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-zinc-400 hover:text-white transition-colors p-1"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search */}
          <div className="flex-1 max-w-sm hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
              <input
                type="search"
                placeholder="Search anything..."
                className="w-full bg-zinc-800/60 border border-zinc-700/60 rounded-lg pl-8 pr-3 py-1.5 text-sm text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/60 transition-colors"
              />
            </div>
          </div>

          {/* Page title (mobile) */}
          {pageTitle && (
            <h1 className="sm:hidden font-semibold text-white text-sm truncate">{pageTitle}</h1>
          )}

          <div className="ml-auto flex items-center gap-2">
            <button className="relative p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-violet-500 rounded-full" />
            </button>
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-sky-500 flex items-center justify-center text-white text-xs font-bold cursor-pointer">
              JL
            </div>
          </div>
        </header>

        {/* Page body */}
        <main className="flex-1 overflow-y-auto">
          {(pageTitle || pageSubtitle) && (
            <div className="px-6 pt-6 pb-2">
              {pageTitle && <h1 className="text-xl font-bold text-white">{pageTitle}</h1>}
              {pageSubtitle && <p className="text-zinc-400 mt-0.5 text-sm">{pageSubtitle}</p>}
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
