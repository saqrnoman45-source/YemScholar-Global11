import { useState } from "react";
import { useGetAdminStats, useListAdminUsers, useListAdminApplications } from "@workspace/api-client-react";
import { AppLayout } from "@/components/layout/app-layout";
import { Users, BookOpen, GraduationCap, FileText } from "lucide-react";
import { format } from "date-fns";

const statusConfig: Record<string, string> = {
  pending:  "bg-amber-500/15 text-amber-400 border-amber-500/20",
  approved: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  rejected: "bg-rose-500/15 text-rose-400 border-rose-500/20",
};

export default function Admin() {
  const [tab, setTab] = useState<"users" | "applications">("users");
  const { data: stats, isLoading: loadingStats } = useGetAdminStats();
  const { data: users, isLoading: loadingUsers } = useListAdminUsers();
  const { data: apps, isLoading: loadingApps } = useListAdminApplications();

  const statCards = [
    { label: "Total Users",    value: stats?.totalUsers,        icon: Users,         color: "text-violet-400", bg: "bg-violet-500/10" },
    { label: "Active Courses", value: stats?.totalCourses,      icon: BookOpen,      color: "text-sky-400",    bg: "bg-sky-500/10" },
    { label: "Scholarships",   value: stats?.totalScholarships, icon: GraduationCap, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { label: "Applications",   value: stats?.totalApplications, icon: FileText,      color: "text-amber-400",  bg: "bg-amber-500/10" },
  ];

  return (
    <AppLayout pageTitle="Admin Console" pageSubtitle="Platform analytics and management.">
      <div className="p-6 space-y-6">
        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {statCards.map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
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
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
          <div className="flex border-b border-zinc-800">
            {(["users", "applications"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-3.5 text-sm font-medium capitalize transition-colors ${
                  tab === t
                    ? "text-white border-b-2 border-violet-500"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {t === "users" ? "Registered Users" : "Scholarship Applications"}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            {tab === "users" && (
              loadingUsers ? (
                <div className="p-5 space-y-3">
                  {[1, 2, 3].map((i) => <div key={i} className="h-10 bg-zinc-800 rounded-lg animate-pulse" />)}
                </div>
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
                    {users?.map((user) => (
                      <tr key={user.id} className="hover:bg-zinc-800/30 transition-colors">
                        <td className="px-5 py-3.5 font-medium text-white">{user.name}</td>
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
                        <td className="px-5 py-3.5 text-zinc-500">{format(new Date(user.createdAt), "MMM d, yyyy")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )
            )}

            {tab === "applications" && (
              loadingApps ? (
                <div className="p-5 space-y-3">
                  {[1, 2, 3].map((i) => <div key={i} className="h-10 bg-zinc-800 rounded-lg animate-pulse" />)}
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
                    {apps?.map((app) => (
                      <tr key={app.id} className="hover:bg-zinc-800/30 transition-colors">
                        <td className="px-5 py-3.5 text-zinc-400">#{app.userId}</td>
                        <td className="px-5 py-3.5 font-medium text-white">{app.scholarship?.title}</td>
                        <td className="px-5 py-3.5">
                          <span className={`text-[11px] px-2 py-0.5 rounded-full border font-medium capitalize ${statusConfig[app.status] ?? "bg-zinc-700 text-zinc-400 border-zinc-600"}`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-zinc-500">{format(new Date(app.appliedAt), "MMM d, yyyy")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
