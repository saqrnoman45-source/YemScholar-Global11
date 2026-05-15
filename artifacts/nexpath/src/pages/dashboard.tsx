import { Link } from "wouter";
import { AppLayout } from "@/components/layout/app-layout";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  BookOpen, GraduationCap, FlaskConical, Award, TrendingUp,
  Clock, FileText, ArrowUpRight, ChevronRight, Target, Users,
  CheckCircle2, Star, Zap, MessageSquare,
} from "lucide-react";

const stats = [
  { label: "Active Courses",  value: "12", delta: "+3 this month",   icon: BookOpen,      bg: "bg-violet-500/10", text: "text-violet-400", border: "border-violet-500/20" },
  { label: "Scholarships",    value: "4",  delta: "2 deadlines soon", icon: GraduationCap, bg: "bg-sky-500/10",    text: "text-sky-400",    border: "border-sky-500/20" },
  { label: "Tests Taken",     value: "27", delta: "+5 this week",     icon: FlaskConical,  bg: "bg-emerald-500/10",text: "text-emerald-400",border: "border-emerald-500/20" },
  { label: "Skills Earned",   value: "9",  delta: "+1 new badge",     icon: Award,         bg: "bg-amber-500/10",  text: "text-amber-400",  border: "border-amber-500/20" },
];

const enrollmentData = [
  { month: "Jan", hours: 18, completed: 2 },
  { month: "Feb", hours: 24, completed: 3 },
  { month: "Mar", hours: 15, completed: 1 },
  { month: "Apr", hours: 32, completed: 4 },
  { month: "May", hours: 28, completed: 3 },
  { month: "Jun", hours: 41, completed: 5 },
  { month: "Jul", hours: 38, completed: 4 },
];

const skillProgressData = [
  { skill: "Python",     level: 85 },
  { skill: "ML",         level: 68 },
  { skill: "React",      level: 92 },
  { skill: "SQL",        level: 74 },
  { skill: "TypeScript", level: 80 },
];

const recentCourses = [
  { title: "Introduction to Machine Learning", progress: 68, instructor: "Dr. Sarah Chen",      category: "AI",      cat_color: "bg-violet-500/20 text-violet-300" },
  { title: "Full-Stack Web Development",       progress: 42, instructor: "Elena Vasquez",       category: "Web Dev", cat_color: "bg-sky-500/20 text-sky-300" },
  { title: "Data Structures & Algorithms",     progress: 91, instructor: "Prof. Marcus Williams",category: "CS",      cat_color: "bg-emerald-500/20 text-emerald-300" },
];

const upcomingDeadlines = [
  { title: "STEM Excellence Award",    date: "Aug 1, 2026",  urgent: true },
  { title: "Women in Technology Grant",date: "Jul 30, 2026", urgent: true },
  { title: "Global Leaders Fellowship",date: "Sep 15, 2026", urgent: false },
];

const recentActivity = [
  { icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10", text: "Completed Module 7 in Machine Learning", time: "2h ago" },
  { icon: Star,         color: "text-amber-400",   bg: "bg-amber-500/10",   text: "Earned 'Data Analyst' skill badge",     time: "5h ago" },
  { icon: Zap,          color: "text-violet-400",  bg: "bg-violet-500/10",  text: "Started Full-Stack Web Development",   time: "Yesterday" },
  { icon: MessageSquare,color: "text-sky-400",     bg: "bg-sky-500/10",     text: "Left a review on AI Fundamentals quiz",time: "Yesterday" },
  { icon: GraduationCap,color: "text-rose-400",    bg: "bg-rose-500/10",    text: "Applied to STEM Excellence Award",     time: "2 days ago" },
];

const quickActions = [
  { icon: BookOpen,      label: "Browse Courses",    href: "/courses",      color: "text-violet-400", bg: "bg-violet-500/10" },
  { icon: GraduationCap, label: "Find Scholarships", href: "/scholarships", color: "text-sky-400",    bg: "bg-sky-500/10" },
  { icon: FlaskConical,  label: "Take a Test",       href: "/tests",        color: "text-emerald-400",bg: "bg-emerald-500/10" },
  { icon: Target,        label: "Track Skills",      href: "/skills",       color: "text-amber-400",  bg: "bg-amber-500/10" },
  { icon: Users,         label: "Community",         href: "#",             color: "text-rose-400",   bg: "bg-rose-500/10" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-xs shadow-xl">
        <p className="text-zinc-400 mb-1 font-medium">{label}</p>
        {payload.map((p: any) => (
          <p key={p.dataKey} style={{ color: p.color }}>{p.name}: <span className="font-semibold">{p.value}</span></p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Good morning, Jordan 👋</h1>
            <p className="text-zinc-400 mt-1 text-sm">Here's what's happening with your learning today.</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-500 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2">
            <Clock className="w-3.5 h-3.5" />
            <span>May 15, 2026</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className={`bg-zinc-900 border ${s.border} rounded-2xl p-4 xl:p-5 flex flex-col gap-3 hover:border-zinc-600 transition-colors`}>
                <div className="flex items-center justify-between">
                  <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 ${s.text}`} />
                  </div>
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-2xl xl:text-3xl font-bold text-white">{s.value}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">{s.label}</p>
                </div>
                <p className="text-xs text-zinc-400 border-t border-zinc-800 pt-2">{s.delta}</p>
              </div>
            );
          })}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Enrollment trend */}
          <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-semibold text-white text-sm">Learning Hours</h2>
                <p className="text-xs text-zinc-500 mt-0.5">Monthly study time & completions</p>
              </div>
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-violet-500/15 text-violet-400 font-medium">Last 7 months</span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={enrollmentData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="hoursGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="completedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#38bdf8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: "#71717a", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#71717a", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="hours"     name="Hours"      stroke="#8b5cf6" strokeWidth={2} fill="url(#hoursGrad)" />
                <Area type="monotone" dataKey="completed" name="Completed"  stroke="#38bdf8" strokeWidth={2} fill="url(#completedGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Skill progress */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-semibold text-white text-sm">Skill Levels</h2>
                <p className="text-xs text-zinc-500 mt-0.5">Top 5 competencies</p>
              </div>
            </div>
            <div className="space-y-3.5">
              {skillProgressData.map((s) => (
                <div key={s.skill}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-zinc-300 font-medium">{s.skill}</span>
                    <span className="text-zinc-500">{s.level}%</span>
                  </div>
                  <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet-500 to-sky-400 rounded-full transition-all duration-700"
                      style={{ width: `${s.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Middle row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Active courses */}
          <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-white text-sm">Active Courses</h2>
              <Link href="/courses" className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors">
                View all <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-4">
              {recentCourses.map((c) => (
                <div key={c.title} className="flex items-center gap-4 group">
                  <div className="w-9 h-9 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0 group-hover:border-zinc-600 transition-colors">
                    <BookOpen className="w-4 h-4 text-zinc-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1 gap-2">
                      <p className="text-sm font-medium text-white truncate">{c.title}</p>
                      <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium shrink-0 ${c.cat_color}`}>{c.category}</span>
                    </div>
                    <p className="text-xs text-zinc-500 mb-1.5">{c.instructor}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-violet-500 to-sky-500 rounded-full" style={{ width: `${c.progress}%` }} />
                      </div>
                      <span className="text-xs text-zinc-400 shrink-0 font-medium">{c.progress}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming deadlines */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-white text-sm">Upcoming Deadlines</h2>
              <Link href="/scholarships" className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors">
                View all <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-2.5">
              {upcomingDeadlines.map((d) => (
                <div key={d.title} className="p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 hover:border-zinc-600 transition-colors">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="text-sm font-medium text-white leading-snug">{d.title}</p>
                    {d.urgent && <span className="text-[11px] bg-rose-500/20 text-rose-400 px-1.5 py-0.5 rounded-md shrink-0 font-medium">Soon</span>}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-zinc-500" />
                    <span className="text-xs text-zinc-500">{d.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Recent activity */}
          <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-white text-sm">Recent Activity</h2>
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-400 font-medium">This week</span>
            </div>
            <div className="space-y-1">
              {recentActivity.map((a, i) => {
                const Icon = a.icon;
                return (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-800/50 transition-colors group">
                    <div className={`w-8 h-8 rounded-lg ${a.bg} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-4 h-4 ${a.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-zinc-200 group-hover:text-white transition-colors">{a.text}</p>
                    </div>
                    <span className="text-xs text-zinc-600 shrink-0">{a.time}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <h2 className="font-semibold text-white text-sm mb-4">Quick Actions</h2>
            <div className="space-y-1.5">
              {quickActions.map(({ icon: Icon, label, href, color, bg }) => (
                <Link key={label} href={href} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-zinc-800 transition-colors group">
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
      </div>
    </AppLayout>
  );
}
