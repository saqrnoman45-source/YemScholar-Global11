import { useState } from "react";
import { useGetAdminStats, useListAdminUsers, useListAdminApplications, useListCourses } from "@workspace/api-client-react";
import { AppLayout } from "@/components/layout/app-layout";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { Users, BookOpen, GraduationCap, FileText, TrendingUp, TrendingDown, Clock, Search } from "lucide-react";
import { format } from "date-fns";

const signupData = [
  { week: "W1", signups: 4 },
  { week: "W2", signups: 7 },
  { week: "W3", signups: 5 },
  { week: "W4", signups: 12 },
  { week: "W5", signups: 9 },
  { week: "W6", signups: 15 },
  { week: "W7", signups: 11 },
  { week: "W8", signups: 18 },
];

const categoryData = [
  { name: "AI",       enrollments: 340, color: "#8b5cf6" },
  { name: "Web Dev",  enrollments: 280, color: "#38bdf8" },
  { name: "CS",       enrollments: 190, color: "#34d399" },
  { name: "Data",     enrollments: 220, color: "#fbbf24" },
  { name: "Security", enrollments: 130, color: "#f87171" },
];

const completionData = [
  { month: "Jan", rate: 62 },
  { month: "Feb", rate: 71 },
  { month: "Mar", rate: 58 },
  { month: "Apr", rate: 78 },
  { month: "May", rate: 82 },
  { month: "Jun", rate: 75 },
  { month: "Jul", rate: 88 },
];

const statusConfig: Record<string, string> = {
  pending:  "bg-amber-500/15 text-amber-400 border-amber-500/20",
  approved: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  rejected: "bg-rose-500/15 text-rose-400 border-rose-500/20",
};

const levelConfig: Record<string, string> = {
  beginner:     "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  intermediate: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  advanced:     "bg-rose-500/15 text-rose-400 border-rose-500/20",
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-xs shadow-xl">
        <p className="text-zinc-400 mb-1 font-medium">{label}</p>
        {payload.map((p: any) => (
          <p key={p.dataKey} style={{ color: p.color || "#a78bfa" }}>{p.name}: <span className="font-semibold text-white">{p.value}</span></p>
        ))}
      </div>
    );
  }
  return null;
};

type Tab = "users" | "courses" | "applications";

export default function Admin() {
  const [tab, setTab] = useState<Tab>("users");
  const [userSearch, setUserSearch] = useState("");
  const [courseSearch, setCourseSearch] = useState("");

  const { data: stats, isLoading: loadingStats } = useGetAdminStats();
  const { data: users,  isLoading: loadingUsers  } = useListAdminUsers();
  const { data: apps,   isLoading: loadingApps   } = useListAdminApplications();
  const { data: courses,isLoading: loadingCourses } = useListCourses({});

  const filteredUsers   = users?.filter(u  => u.name.toLowerCase().includes(userSearch.toLowerCase())   || u.email.toLowerCase().includes(userSearch.toLowerCase()));
  const filteredCourses = courses?.filter(c => c.title.toLowerCase().includes(courseSearch.toLowerCase()) || c.instructorName.toLowerCase().includes(courseSearch.toLowerCase()));

  const statCards = [
    {
      label: "Total Users",    value: stats?.totalUsers,        delta: `+${stats?.recentSignups ?? 0} this week`,
      up: true,  icon: Users,         color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20",
    },
    {
      label: "Active Courses", value: stats?.totalCourses,      delta: `${stats?.totalEnrollments ?? 0} enrollments`,
      up: true,  icon: BookOpen,      color: "text-sky-400",    bg: "bg-sky-500/10",    border: "border-sky-500/20",
    },
    {
      label: "Scholarships",   value: stats?.totalScholarships, delta: `${stats?.totalApplications ?? 0} applications`,
      up: null,  icon: GraduationCap, color: "text-emerald-400",bg: "bg-emerald-500/10",border: "border-emerald-500/20",
    },
    {
      label: "Completion Rate",value: stats ? `${Math.round((stats.completionRate ?? 0) * 100)}%` : "—", delta: "+6% vs last month",
      up: true,  icon: FileText,      color: "text-amber-400",  bg: "bg-amber-500/10",  border: "border-amber-500/20",
    },
  ];

  const tabs: { key: Tab; label: string }[] = [
    { key: "users",        label: "Registered Users" },
    { key: "courses",      label: "Courses" },
    { key: "applications", label: "Applications" },
  ];

  return (
    <AppLayout pageTitle="Admin Console" pageSubtitle="Platform analytics and management.">
      <div className="p-6 space-y-6">

        {/* Stat cards */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {statCards.map(({ label, value, delta, up, icon: Icon, color, bg, border }) => (
            <div key={label} className={`bg-zinc-900 border ${border} rounded-2xl p-4 xl:p-5`}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-zinc-500 font-medium">{label}</p>
                <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${color}`} />
                </div>
              </div>
              {loadingStats ? (
                <div className="h-7 w-16 bg-zinc-800 rounded animate-pulse" />
              ) : (
                <p className="text-2xl font-bold text-white">{value ?? 0}</p>
              )}
              {delta && (
                <div className="flex items-center gap-1 mt-2">
                  {up === true  && <TrendingUp   className="w-3 h-3 text-emerald-500" />}
                  {up === false && <TrendingDown  className="w-3 h-3 text-rose-500" />}
                  <p className="text-xs text-zinc-500">{delta}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Signup trend */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <div className="mb-4">
              <h2 className="font-semibold text-white text-sm">Weekly Signups</h2>
              <p className="text-xs text-zinc-500 mt-0.5">New user registrations</p>
            </div>
            <ResponsiveContainer width="100%" height={150}>
              <AreaChart data={signupData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="signupGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="week" tick={{ fill: "#71717a", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#71717a", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="signups" name="Signups" stroke="#8b5cf6" strokeWidth={2} fill="url(#signupGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Category enrollments */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <div className="mb-4">
              <h2 className="font-semibold text-white text-sm">Enrollments by Category</h2>
              <p className="text-xs text-zinc-500 mt-0.5">Course category breakdown</p>
            </div>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={categoryData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: "#71717a", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#71717a", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="enrollments" name="Enrollments" radius={[4, 4, 0, 0]}>
                  {categoryData.map((entry, i) => <Cell key={i} fill={entry.color} fillOpacity={0.85} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Completion rate */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <div className="mb-4">
              <h2 className="font-semibold text-white text-sm">Completion Rate</h2>
              <p className="text-xs text-zinc-500 mt-0.5">Monthly course completions %</p>
            </div>
            <ResponsiveContainer width="100%" height={150}>
              <AreaChart data={completionData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="compGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#34d399" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: "#71717a", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#71717a", fontSize: 10 }} axisLine={false} tickLine={false} unit="%" />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="rate" name="Rate" stroke="#34d399" strokeWidth={2} fill="url(#compGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Data tables */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
          {/* Tab bar */}
          <div className="flex items-center border-b border-zinc-800 px-1">
            {tabs.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`px-5 py-3.5 text-sm font-medium transition-colors whitespace-nowrap ${
                  tab === key ? "text-white border-b-2 border-violet-500" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="p-4 border-b border-zinc-800/60">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
              <input
                type="search"
                placeholder={tab === "courses" ? "Search courses..." : "Search users..."}
                value={tab === "courses" ? courseSearch : userSearch}
                onChange={(e) => tab === "courses" ? setCourseSearch(e.target.value) : setUserSearch(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl pl-9 pr-3 py-2 text-sm text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/60 transition-colors"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            {/* Users tab */}
            {tab === "users" && (
              loadingUsers ? (
                <div className="p-5 space-y-3">{[1,2,3].map(i => <div key={i} className="h-10 bg-zinc-800 rounded-lg animate-pulse" />)}</div>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-zinc-800">
                      <th className="px-5 py-3 text-left text-xs font-medium text-zinc-500">Name</th>
                      <th className="px-5 py-3 text-left text-xs font-medium text-zinc-500">Email</th>
                      <th className="px-5 py-3 text-left text-xs font-medium text-zinc-500">Role</th>
                      <th className="px-5 py-3 text-left text-xs font-medium text-zinc-500">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/50">
                    {filteredUsers?.map(user => (
                      <tr key={user.id} className="hover:bg-zinc-800/30 transition-colors">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-sky-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                              {user.name.charAt(0)}
                            </div>
                            <span className="font-medium text-white">{user.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-zinc-400">{user.email}</td>
                        <td className="px-5 py-3.5">
                          <span className={`text-[11px] px-2 py-0.5 rounded-full border font-medium capitalize ${
                            user.role === "admin"
                              ? "bg-violet-500/15 text-violet-400 border-violet-500/20"
                              : "bg-zinc-700/50 text-zinc-400 border-zinc-600/20"
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-zinc-500 text-xs">{format(new Date(user.createdAt), "MMM d, yyyy")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )
            )}

            {/* Courses tab */}
            {tab === "courses" && (
              loadingCourses ? (
                <div className="p-5 space-y-3">{[1,2,3,4,5].map(i => <div key={i} className="h-10 bg-zinc-800 rounded-lg animate-pulse" />)}</div>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-zinc-800">
                      <th className="px-5 py-3 text-left text-xs font-medium text-zinc-500">Course</th>
                      <th className="px-5 py-3 text-left text-xs font-medium text-zinc-500">Instructor</th>
                      <th className="px-5 py-3 text-left text-xs font-medium text-zinc-500">Level</th>
                      <th className="px-5 py-3 text-left text-xs font-medium text-zinc-500">Category</th>
                      <th className="px-5 py-3 text-left text-xs font-medium text-zinc-500">Enrolled</th>
                      <th className="px-5 py-3 text-left text-xs font-medium text-zinc-500">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/50">
                    {filteredCourses?.map(course => (
                      <tr key={course.id} className="hover:bg-zinc-800/30 transition-colors">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0">
                              <BookOpen className="w-3.5 h-3.5 text-zinc-500" />
                            </div>
                            <span className="font-medium text-white max-w-[180px] truncate">{course.title}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-zinc-400">{course.instructorName}</td>
                        <td className="px-5 py-3.5">
                          <span className={`text-[11px] px-2 py-0.5 rounded-full border font-medium capitalize ${levelConfig[course.level] ?? "bg-zinc-700 text-zinc-400 border-zinc-600"}`}>
                            {course.level}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-zinc-400">{course.category}</td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium">{course.enrollmentCount.toLocaleString()}</span>
                            <div className="w-12 h-1 bg-zinc-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-violet-500 rounded-full"
                                style={{ width: `${Math.min(100, (course.enrollmentCount / 2500) * 100)}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-zinc-500 text-xs">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {course.duration}h
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )
            )}

            {/* Applications tab */}
            {tab === "applications" && (
              loadingApps ? (
                <div className="p-5 space-y-3">{[1,2,3].map(i => <div key={i} className="h-10 bg-zinc-800 rounded-lg animate-pulse" />)}</div>
              ) : apps?.length === 0 ? (
                <div className="text-center py-16 text-zinc-500">
                  <FileText className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">No scholarship applications yet.</p>
                </div>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-zinc-800">
                      <th className="px-5 py-3 text-left text-xs font-medium text-zinc-500">Applicant ID</th>
                      <th className="px-5 py-3 text-left text-xs font-medium text-zinc-500">Scholarship</th>
                      <th className="px-5 py-3 text-left text-xs font-medium text-zinc-500">Status</th>
                      <th className="px-5 py-3 text-left text-xs font-medium text-zinc-500">Applied</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/50">
                    {apps?.map(app => (
                      <tr key={app.id} className="hover:bg-zinc-800/30 transition-colors">
                        <td className="px-5 py-3.5 text-zinc-400">#{app.userId}</td>
                        <td className="px-5 py-3.5 font-medium text-white">{app.scholarship?.title}</td>
                        <td className="px-5 py-3.5">
                          <span className={`text-[11px] px-2 py-0.5 rounded-full border font-medium capitalize ${statusConfig[app.status] ?? "bg-zinc-700 text-zinc-400 border-zinc-600"}`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-zinc-500 text-xs">{format(new Date(app.appliedAt), "MMM d, yyyy")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )
            )}
          </div>

          {/* Table footer */}
          <div className="px-5 py-3 border-t border-zinc-800/60 flex items-center justify-between">
            <p className="text-xs text-zinc-600">
              {tab === "users" ? `${filteredUsers?.length ?? 0} users` : tab === "courses" ? `${filteredCourses?.length ?? 0} courses` : `${apps?.length ?? 0} applications`}
            </p>
            <p className="text-xs text-zinc-600">NexPath Admin v1.0</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
