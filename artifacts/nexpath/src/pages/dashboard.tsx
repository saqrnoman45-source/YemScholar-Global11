import { useState } from "react";
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
  TrendingUp,
  Users,
  Award,
  Clock,
  Menu,
  X,
  ArrowUpRight,
  Target,
  Zap,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", active: true },
  { icon: BookOpen, label: "Courses", href: "/courses" },
  { icon: GraduationCap, label: "Scholarships", href: "/scholarships" },
  { icon: FlaskConical, label: "Tests", href: "#" },
  { icon: FileText, label: "Research", href: "/articles" },
  { icon: Sparkles, label: "Skills", href: "/skills" },
];

const stats = [
  {
    label: "Active Courses",
    value: "12",
    delta: "+3 this month",
    up: true,
    icon: BookOpen,
    color: "from-violet-500 to-violet-700",
    bg: "bg-violet-500/10",
    text: "text-violet-400",
  },
  {
    label: "Scholarships",
    value: "4",
    delta: "2 deadlines soon",
    up: null,
    icon: GraduationCap,
    color: "from-sky-500 to-sky-700",
    bg: "bg-sky-500/10",
    text: "text-sky-400",
  },
  {
    label: "Tests Taken",
    value: "27",
    delta: "+5 this week",
    up: true,
    icon: FlaskConical,
    color: "from-emerald-500 to-emerald-700",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
  },
  {
    label: "Skills Earned",
    value: "9",
    delta: "+1 new badge",
    up: true,
    icon: Award,
    color: "from-amber-500 to-amber-700",
    bg: "bg-amber-500/10",
    text: "text-amber-400",
  },
];

const recentCourses = [
  { title: "Introduction to Machine Learning", progress: 68, instructor: "Dr. Sarah Chen", category: "AI" },
  { title: "Full-Stack Web Development", progress: 42, instructor: "Elena Vasquez", category: "Web Dev" },
  { title: "Data Structures & Algorithms", progress: 91, instructor: "Prof. Marcus Williams", category: "CS" },
];

const upcomingDeadlines = [
  { title: "STEM Excellence Award", date: "Aug 1, 2026", type: "Scholarship", urgent: true },
  { title: "Women in Technology Grant", date: "Jul 30, 2026", type: "Scholarship", urgent: true },
  { title: "Global Leaders Fellowship", date: "Sep 15, 2026", type: "Scholarship", urgent: false },
];

const recentArticles = [
  { title: "The Future of AI in Education", topic: "AI", readTime: 8 },
  { title: "Skills-Based Hiring Trends", topic: "Career", readTime: 6 },
  { title: "Open Access Research Movement", topic: "Research", readTime: 7 },
];

function CategoryBadge({ label }: { label: string }) {
  const colors: Record<string, string> = {
    AI: "bg-violet-500/20 text-violet-300",
    "Web Dev": "bg-sky-500/20 text-sky-300",
    CS: "bg-emerald-500/20 text-emerald-300",
    Research: "bg-amber-500/20 text-amber-300",
    Career: "bg-rose-500/20 text-rose-300",
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors[label] ?? "bg-zinc-700 text-zinc-300"}`}>
      {label}
    </span>
  );
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex">

      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:z-auto`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-6 border-b border-zinc-800 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-sky-500 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">NexPath</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto lg:hidden text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider px-3 mb-3">Menu</p>
          {navItems.map(({ icon: Icon, label, href, active }) => (
            <Link
              key={label}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                ${active
                  ? "bg-gradient-to-r from-violet-600/30 to-sky-600/20 text-white border border-violet-500/30"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
              {active && <ChevronRight className="w-3 h-3 ml-auto text-violet-400" />}
            </Link>
          ))}

          <div className="pt-4 mt-4 border-t border-zinc-800">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider px-3 mb-3">Account</p>
            <Link
              href="#"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
            >
              <Settings className="w-4 h-4 shrink-0" />
              Settings
            </Link>
          </div>
        </nav>

        {/* User profile */}
        <div className="p-4 border-t border-zinc-800">
          <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-zinc-800 cursor-pointer transition-all">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-sky-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
              JL
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Jordan Lee</p>
              <p className="text-xs text-zinc-500 truncate">student@nexpath.io</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <header className="h-16 bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-800 flex items-center gap-4 px-6 shrink-0 sticky top-0 z-10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-zinc-400 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search */}
          <div className="flex-1 max-w-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="search"
                placeholder="Search courses, scholarships..."
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl pl-9 pr-4 py-2 text-sm text-zinc-300 placeholder:text-zinc-500 focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <button className="relative p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-violet-500 rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-sky-500 flex items-center justify-center text-white text-xs font-bold cursor-pointer">
              JL
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto">

          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">Good morning, Jordan 👋</h1>
            <p className="text-zinc-400 mt-1 text-sm">Here's what's happening with your learning today.</p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col gap-3 hover:border-zinc-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${s.text}`} />
                    </div>
                    {s.up !== null && (
                      <span className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
                        <TrendingUp className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white">{s.value}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">{s.label}</p>
                  </div>
                  <p className="text-xs text-zinc-400 border-t border-zinc-800 pt-2">{s.delta}</p>
                </div>
              );
            })}
          </div>

          {/* Two-column section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

            {/* Active courses */}
            <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-white">Active Courses</h2>
                <Link href="/courses" className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors">
                  View all <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="space-y-4">
                {recentCourses.map((c) => (
                  <div key={c.title} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0 group-hover:border-zinc-600 transition-colors">
                      <BookOpen className="w-4 h-4 text-zinc-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-white truncate pr-4">{c.title}</p>
                        <CategoryBadge label={c.category} />
                      </div>
                      <p className="text-xs text-zinc-500 mb-2">{c.instructor}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-violet-500 to-sky-500 rounded-full transition-all"
                            style={{ width: `${c.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-zinc-400 shrink-0">{c.progress}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming deadlines */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-white">Upcoming Deadlines</h2>
                <Link href="/scholarships" className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors">
                  View all <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="space-y-3">
                {upcomingDeadlines.map((d) => (
                  <div key={d.title} className="p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 hover:border-zinc-600 transition-colors">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-sm font-medium text-white leading-snug">{d.title}</p>
                      {d.urgent && (
                        <span className="text-xs bg-rose-500/20 text-rose-400 px-1.5 py-0.5 rounded-md shrink-0 font-medium">Soon</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Clock className="w-3 h-3 text-zinc-500" />
                      <span className="text-xs text-zinc-500">{d.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Recent articles */}
            <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-white">Recent Research</h2>
                <Link href="/articles" className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors">
                  View all <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="space-y-3">
                {recentArticles.map((a) => (
                  <div key={a.title} className="flex items-center gap-4 p-3 rounded-xl hover:bg-zinc-800/50 transition-colors cursor-pointer group">
                    <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4 text-zinc-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate group-hover:text-violet-300 transition-colors">{a.title}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <CategoryBadge label={a.topic} />
                        <span className="text-xs text-zinc-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />{a.readTime} min read
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-violet-400 transition-colors shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h2 className="font-semibold text-white mb-5">Quick Actions</h2>
              <div className="space-y-2.5">
                {[
                  { icon: BookOpen, label: "Browse Courses", href: "/courses", color: "text-violet-400", bg: "bg-violet-500/10" },
                  { icon: GraduationCap, label: "Find Scholarships", href: "/scholarships", color: "text-sky-400", bg: "bg-sky-500/10" },
                  { icon: FlaskConical, label: "Take a Test", href: "#", color: "text-emerald-400", bg: "bg-emerald-500/10" },
                  { icon: Target, label: "Track Skills", href: "/skills", color: "text-amber-400", bg: "bg-amber-500/10" },
                  { icon: Users, label: "Community", href: "#", color: "text-rose-400", bg: "bg-rose-500/10" },
                ].map(({ icon: Icon, label, href, color, bg }) => (
                  <Link
                    key={label}
                    href={href}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-800 transition-colors group"
                  >
                    <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-4 h-4 ${color}`} />
                    </div>
                    <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">{label}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-400 ml-auto transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
