import { AppLayout } from "@/components/layout/app-layout";
import { useAuth } from "@/contexts/auth-context";
import { Award, Download, ExternalLink, Calendar, BookOpen, Shield } from "lucide-react";

const mockCertificates = [
  {
    id: 1, code: "NP-2026-ML-001", course: "Introduction to Machine Learning",
    instructor: "Dr. Sarah Chen", issuedAt: "2026-04-15", category: "AI",
    grade: "Distinction", color: "from-violet-500 to-purple-600",
  },
  {
    id: 2, code: "NP-2026-DS-042", course: "Data Structures & Algorithms",
    instructor: "Prof. Marcus Williams", issuedAt: "2026-03-02", category: "CS",
    grade: "Merit", color: "from-sky-500 to-blue-600",
  },
  {
    id: 3, code: "NP-2026-WD-118", course: "Full-Stack Web Development",
    instructor: "Elena Vasquez", issuedAt: "2026-01-20", category: "Web Dev",
    grade: "Pass", color: "from-emerald-500 to-teal-600",
  },
];

const stats = [
  { label: "Certificates Earned", value: "3",  icon: Award,    color: "text-violet-400", bg: "bg-violet-500/10" },
  { label: "Courses Completed",   value: "3",  icon: BookOpen, color: "text-sky-400",    bg: "bg-sky-500/10" },
  { label: "Verified Credentials",value: "3",  icon: Shield,   color: "text-emerald-400",bg: "bg-emerald-500/10" },
];

const gradeColor: Record<string, string> = {
  Distinction: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  Merit:       "bg-sky-500/20 text-sky-300 border-sky-500/30",
  Pass:        "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
};

export default function Certificates() {
  const { user } = useAuth();

  return (
    <AppLayout pageTitle="Certificates" pageSubtitle="Your earned credentials and achievements.">
      <div className="p-6 space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div>
                <p className="text-xl font-bold text-white">{value}</p>
                <p className="text-xs text-zinc-500">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Certificates grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {mockCertificates.map((cert) => (
            <div key={cert.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-600 transition-all group">
              {/* Certificate preview */}
              <div className={`relative h-36 bg-gradient-to-br ${cert.color} p-5 flex flex-col justify-between`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                      <Shield className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-white text-xs font-bold tracking-wide">NexPath</span>
                  </div>
                  <span className="text-white/70 text-[10px] font-mono">{cert.code}</span>
                </div>
                <div>
                  <p className="text-white/70 text-[11px] mb-0.5">Certificate of Completion</p>
                  <p className="text-white font-bold text-sm leading-tight line-clamp-2">{cert.course}</p>
                  {user && <p className="text-white/80 text-xs mt-1">{user.name}</p>}
                </div>
                {/* Decorative circles */}
                <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/10" />
                <div className="absolute -right-2 top-4 w-12 h-12 rounded-full bg-white/10" />
              </div>

              {/* Card body */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] px-2 py-0.5 rounded-full border font-medium ${gradeColor[cert.grade]}`}>
                    {cert.grade}
                  </span>
                  <span className="text-[11px] text-zinc-500 px-2 py-0.5 rounded-full bg-zinc-800">{cert.category}</span>
                </div>

                <div className="space-y-1.5">
                  <p className="text-xs text-zinc-500 font-medium">{cert.course}</p>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-600">
                    <Calendar className="w-3 h-3" />
                    <span>Issued {new Date(cert.issuedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-zinc-300 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-colors">
                    <Download className="w-3.5 h-3.5" /> Download PDF
                  </button>
                  <button className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-violet-400 bg-violet-500/10 hover:bg-violet-500/20 rounded-xl transition-colors border border-violet-500/20">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state if no certs */}
        {mockCertificates.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-zinc-600" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">No certificates yet</h3>
            <p className="text-zinc-500 text-sm">Complete a course to earn your first certificate.</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
