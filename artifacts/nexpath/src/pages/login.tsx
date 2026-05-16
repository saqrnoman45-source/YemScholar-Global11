import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useLogin } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Zap, Mail, Lock, AlertCircle, Loader2, Eye, EyeOff } from "lucide-react";

const DEMO_ACCOUNTS = [
  { role: "Admin",   email: "admin@nexpath.io",   password: "admin123",   color: "from-violet-500 to-purple-600",  badge: "bg-violet-500/20 text-violet-300" },
  { role: "Teacher", email: "teacher@nexpath.io", password: "teacher123", color: "from-sky-500 to-blue-600",      badge: "bg-sky-500/20 text-sky-300" },
  { role: "Student", email: "student@nexpath.io", password: "student123", color: "from-emerald-500 to-teal-600",  badge: "bg-emerald-500/20 text-emerald-300" },
];

export default function Login() {
  const [, setLocation] = useLocation();
  const qc = useQueryClient();
  const loginMutation = useLogin();

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [error, setError]       = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    loginMutation.mutate(
      { data: { email, password } },
      {
        onSuccess: () => {
          qc.invalidateQueries();
          setLocation("/dashboard");
        },
        onError: () => setError("Invalid email or password. Please try again."),
      }
    );
  }

  function fillDemo(acc: typeof DEMO_ACCOUNTS[0]) {
    setEmail(acc.email);
    setPassword(acc.password);
    setError("");
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex flex-col justify-between w-[420px] bg-zinc-900 border-r border-zinc-800 p-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-sky-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">NexPath</span>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-white leading-tight">
              Your path to<br />
              <span className="bg-gradient-to-r from-violet-400 to-sky-400 bg-clip-text text-transparent">knowledge starts here</span>
            </h2>
            <p className="text-zinc-400 mt-3 text-sm leading-relaxed">
              Access courses, scholarships, research articles, and skill-building tools — all in one platform.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { label: "5,000+ students", sub: "learning every day" },
              { label: "200+ courses",    sub: "across all disciplines" },
              { label: "$2M+ awarded",    sub: "in scholarships" },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-3 p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/40">
                <div className="w-2 h-2 rounded-full bg-violet-500 shrink-0" />
                <div>
                  <span className="text-sm font-semibold text-white">{s.label}</span>
                  <span className="text-xs text-zinc-500 ml-2">{s.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-zinc-600">© 2026 NexPath Educational Platform</p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10">
        {/* Mobile logo */}
        <div className="flex items-center gap-2.5 mb-10 lg:hidden">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-sky-500 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-base font-bold text-white">NexPath</span>
        </div>

        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">Welcome back</h1>
            <p className="text-zinc-500 mt-1 text-sm">Sign in to continue your learning journey.</p>
          </div>

          {/* Quick login demo accounts */}
          <div className="mb-6">
            <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-2">Try a demo account</p>
            <div className="grid grid-cols-3 gap-2">
              {DEMO_ACCOUNTS.map(acc => (
                <button
                  key={acc.role}
                  type="button"
                  onClick={() => fillDemo(acc)}
                  className="group flex flex-col items-center gap-1.5 p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-all"
                >
                  <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${acc.color} flex items-center justify-center text-white text-[10px] font-bold`}>
                    {acc.role[0]}
                  </div>
                  <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-medium ${acc.badge}`}>{acc.role}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-zinc-950 px-3 text-[11px] text-zinc-600">or sign in with credentials</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/20 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <input
                  type={showPw ? "text" : "password"}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/20 transition-all"
                />
                <button type="button" onClick={() => setShowPw(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400 transition-colors">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-500 hover:to-violet-600 text-white font-semibold rounded-xl py-2.5 text-sm transition-all shadow-lg shadow-violet-500/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loginMutation.isPending ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in…</> : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-500">
            Don't have an account?{" "}
            <Link href="/register" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
