import { Link } from "wouter";
import { AppLayout } from "@/components/layout/app-layout";
import {
  BookOpen,
  GraduationCap,
  FlaskConical,
  Award,
  TrendingUp,
  Clock,
  FileText,
  ArrowUpRight,
  ChevronRight,
  Target,
  Users,
} from "lucide-react";

const stats = [
  {
    label: "Active Courses",
    value: "12",
    delta: "+3 this month",
    icon: BookOpen,
    bg: "bg-violet-500/10",
    text: "text-violet-400",
    border: "border-violet-500/20",
  },
  {
    label: "Scholarships",
    value: "4",
    delta: "2 deadlines soon",
    icon: GraduationCap,
    bg: "bg-sky-500/10",
    text: "text-sky-400",
    border: "border-sky-500/20",
  },
  {
    label: "Tests Taken",
    value: "27",
    delta: "+5 this week",
    icon: FlaskConical,
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/20",
  },
  {
    label: "Skills Earned",
    value: "9",
    delta: "+1 new badge",
    icon: Award,
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/20",
  },
];

const recentCourses = [
  { title: "Introduction to Machine Learning", progress: 68, instructor: "Dr. Sarah Chen", category: "AI", cat_color: "bg-violet-500/20 text-violet-300" },
  { title: "Full-Stack Web Development", progress: 42, instructor: "Elena Vasquez", category: "Web Dev", cat_color: "bg-sky-500/20 text-sky-300" },
  { title: "Data Structures & Algorithms", progress: 91, instructor: "Prof. Marcus Williams", category: "CS", cat_color: "bg-emerald-500/20 text-emerald-300" },
];

const upcomingDeadlines = [
  { title: "STEM Excellence Award", date: "Aug 1, 2026", urgent: true },
  { title: "Women in Technology Grant", date: "Jul 30, 2026", urgent: true },
  { title: "Global Leaders Fellowship", date: "Sep 15, 2026", urgent: false },
];

const recentArticles = [
  { title: "The Future of AI in Education", topic: "AI", topicColor: "bg-violet-500/20 text-violet-300", readTime: 8 },
  { title: "Skills-Based Hiring Trends", topic: "Career", topicColor: "bg-rose-500/20 text-rose-300", readTime: 6 },
  { title: "Open Access Research Movement", topic: "Research", topicColor: "bg-amber-500/20 text-amber-300", readTime: 7 },
];

const quickActions = [
  { icon: BookOpen,      label: "Browse Courses",    href: "/courses",      color: "text-violet-400", bg: "bg-violet-500/10" },
  { icon: GraduationCap, label: "Find Scholarships", href: "/scholarships", color: "text-sky-400",    bg: "bg-sky-500/10" },
  { icon: FlaskConical,  label: "Take a Test",       href: "/tests",        color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { icon: Target,        label: "Track Skills",      href: "/skills",       color: "text-amber-400",  bg: "bg-amber-500/10" },
  { icon: Users,         label: "Community",         href: "#",             color: "text-rose-400",   bg: "bg-rose-500/10" },
];

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white">Good morning, Jordan 👋</h1>
          <p className="text-zinc-400 mt-1 text-sm">Here's what's happening with your learning today.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className={`bg-zinc-900 border ${s.border} rounded-2xl p-5 flex flex-col gap-3 hover:border-zinc-700 transition-colors`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${s.text}`} />
                  </div>
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
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

        {/* Middle row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Active courses */}
          <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-white text-sm">Active Courses</h2>
              <Link href="/courses" className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1">
                View all <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-4">
              {recentCourses.map((c) => (
                <div key={c.title} className="flex items-center gap-4 group">
                  <div className="w-9 h-9 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4 text-zinc-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1 gap-2">
                      <p className="text-sm font-medium text-white truncate">{c.title}</p>
                      <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium shrink-0 ${c.cat_color}`}>
                        {c.category}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 mb-2">{c.instructor}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-violet-500 to-sky-500 rounded-full"
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
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-white text-sm">Upcoming Deadlines</h2>
              <Link href="/scholarships" className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1">
                View all <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-2.5">
              {upcomingDeadlines.map((d) => (
                <div key={d.title} className="p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 hover:border-zinc-600 transition-colors">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="text-sm font-medium text-white leading-snug">{d.title}</p>
                    {d.urgent && (
                      <span className="text-[11px] bg-rose-500/20 text-rose-400 px-1.5 py-0.5 rounded-md shrink-0 font-medium">Soon</span>
                    )}
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
          {/* Recent research */}
          <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-white text-sm">Recent Research</h2>
              <Link href="/articles" className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1">
                View all <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-1">
              {recentArticles.map((a) => (
                <div key={a.title} className="flex items-center gap-4 p-3 rounded-xl hover:bg-zinc-800/50 transition-colors cursor-pointer group">
                  <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0">
                    <FileText className="w-3.5 h-3.5 text-zinc-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate group-hover:text-violet-300 transition-colors">{a.title}</p>
                    <div className="flex items-center gap-2.5 mt-1">
                      <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${a.topicColor}`}>{a.topic}</span>
                      <span className="text-xs text-zinc-500 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />{a.readTime} min
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-violet-400 transition-colors shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <h2 className="font-semibold text-white text-sm mb-4">Quick Actions</h2>
            <div className="space-y-1.5">
              {quickActions.map(({ icon: Icon, label, href, color, bg }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-zinc-800 transition-colors group"
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
      </div>
    </AppLayout>
  );
}
