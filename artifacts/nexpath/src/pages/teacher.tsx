import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { AppLayout } from "@/components/layout/app-layout";
import { useListCourses } from "@workspace/api-client-react";
import {
  BookOpen, Plus, Video, FileText, Clock, Users, Star,
  ChevronRight, Edit, Trash2, Eye, BarChart2, TrendingUp, Award,
  Upload, X, Check, Loader2, AlignLeft, GraduationCap,
} from "lucide-react";

const CATEGORIES = ["AI", "Web Dev", "Data Science", "CS", "Security", "Design", "Business", "Math"];
const LEVELS = ["beginner", "intermediate", "advanced"];
const LESSON_TYPES = [
  { value: "video",   label: "Video Lesson",   icon: Video },
  { value: "article", label: "Article",         icon: AlignLeft },
  { value: "pdf",     label: "PDF Document",    icon: FileText },
  { value: "quiz",    label: "Quiz",            icon: GraduationCap },
];

const mockStats = [
  { label: "My Courses",      value: "3",    icon: BookOpen, color: "text-violet-400", bg: "bg-violet-500/10" },
  { label: "Total Students",  value: "1,284",icon: Users,    color: "text-sky-400",    bg: "bg-sky-500/10" },
  { label: "Avg. Rating",     value: "4.7",  icon: Star,     color: "text-amber-400",  bg: "bg-amber-500/10" },
  { label: "Completions",     value: "312",  icon: Award,    color: "text-emerald-400",bg: "bg-emerald-500/10" },
];

type Tab = "overview" | "create" | "lessons";

export default function Teacher() {
  const { user } = useAuth();
  const [tab, setTab] = useState<Tab>("overview");
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

  // Course creation form
  const [form, setForm] = useState({
    title: "", description: "", category: "AI", level: "beginner",
    duration: "", instructorName: user?.name ?? "", thumbnailUrl: "",
  });
  const [creating, setCreating] = useState(false);
  const [created, setCreated] = useState(false);

  // Lesson form
  const [lessonForm, setLessonForm] = useState({
    title: "", description: "", type: "video", videoUrl: "",
    durationMinutes: "10", order: "1", isFree: false,
  });
  const [addingLesson, setAddingLesson] = useState(false);

  const { data: courses, isLoading } = useListCourses({});

  async function handleCreateCourse(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    await fetch("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, duration: parseInt(form.duration) || 10, rating: 4.5, enrollmentCount: 0 }),
    });
    setCreating(false);
    setCreated(true);
    setTimeout(() => { setCreated(false); setTab("overview"); }, 1500);
  }

  async function handleAddLesson(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedCourseId) return;
    setAddingLesson(true);
    await fetch(`/api/courses/${selectedCourseId}/lessons`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...lessonForm, durationMinutes: parseInt(lessonForm.durationMinutes) || 10, order: parseInt(lessonForm.order) || 1 }),
    });
    setAddingLesson(false);
    setLessonForm({ title: "", description: "", type: "video", videoUrl: "", durationMinutes: "10", order: "1", isFree: false });
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "overview", label: "My Courses" },
    { key: "create",   label: "Create Course" },
    { key: "lessons",  label: "Manage Lessons" },
  ];

  return (
    <AppLayout pageTitle="Teacher Dashboard" pageSubtitle={`Welcome back, ${user?.name}. Manage your content below.`}>
      <div className="p-6 space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {mockStats.map(({ label, value, icon: Icon, color, bg }) => (
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

        {/* Tab bar */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
          <div className="flex items-center border-b border-zinc-800 px-1">
            {tabs.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`px-5 py-3.5 text-sm font-medium transition-colors ${
                  tab === key ? "text-white border-b-2 border-violet-500" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Overview tab */}
          {tab === "overview" && (
            <div className="p-5">
              {isLoading ? (
                <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-16 bg-zinc-800 rounded-xl animate-pulse" />)}</div>
              ) : (
                <div className="space-y-3">
                  {courses?.map(course => (
                    <div key={course.id} className="flex items-center gap-4 p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50 hover:border-zinc-600 transition-colors group">
                      <div className="w-10 h-10 rounded-xl bg-zinc-700 border border-zinc-600 flex items-center justify-center shrink-0">
                        <BookOpen className="w-4 h-4 text-zinc-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-white text-sm truncate">{course.title}</p>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="text-xs text-zinc-500 capitalize">{course.level}</span>
                          <span className="text-xs text-zinc-600">·</span>
                          <span className="text-xs text-zinc-500"><Users className="w-3 h-3 inline mr-0.5" />{course.enrollmentCount.toLocaleString()} enrolled</span>
                          <span className="text-xs text-zinc-600">·</span>
                          <span className="text-xs text-zinc-500"><Clock className="w-3 h-3 inline mr-0.5" />{course.duration}h</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => { setSelectedCourseId(course.id); setTab("lessons"); }}
                          className="p-1.5 rounded-lg bg-violet-500/15 text-violet-400 hover:bg-violet-500/25 transition-colors"
                          title="Manage lessons"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 rounded-lg bg-zinc-700 text-zinc-400 hover:bg-zinc-600 transition-colors">
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-amber-400">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="font-medium">{course.rating ?? "4.5"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Create course tab */}
          {tab === "create" && (
            <div className="p-5 max-w-2xl">
              <form onSubmit={handleCreateCourse} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-medium text-zinc-400">Course Title *</label>
                    <input
                      required value={form.title}
                      onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                      placeholder="e.g. Machine Learning Fundamentals"
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/60 transition-colors"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-medium text-zinc-400">Description *</label>
                    <textarea
                      required rows={3} value={form.description}
                      onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                      placeholder="What will students learn?"
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/60 transition-colors resize-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-400">Category</label>
                    <select
                      value={form.category}
                      onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500/60 transition-colors"
                    >
                      {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-400">Level</label>
                    <select
                      value={form.level}
                      onChange={e => setForm(f => ({ ...f, level: e.target.value }))}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500/60 transition-colors"
                    >
                      {LEVELS.map(l => <option key={l} className="capitalize">{l}</option>)}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-400">Duration (hours) *</label>
                    <input
                      required type="number" min="1" value={form.duration}
                      onChange={e => setForm(f => ({ ...f, duration: e.target.value }))}
                      placeholder="e.g. 12"
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/60 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-400">Your Name (Instructor)</label>
                    <input
                      value={form.instructorName}
                      onChange={e => setForm(f => ({ ...f, instructorName: e.target.value }))}
                      placeholder="Your full name"
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/60 transition-colors"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-medium text-zinc-400">Thumbnail URL (optional)</label>
                    <input
                      type="url" value={form.thumbnailUrl}
                      onChange={e => setForm(f => ({ ...f, thumbnailUrl: e.target.value }))}
                      placeholder="https://..."
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/60 transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={creating || created}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-500 hover:to-violet-600 text-white font-semibold rounded-xl text-sm transition-all disabled:opacity-60 shadow-lg shadow-violet-500/20"
                >
                  {creating ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating…</> :
                   created  ? <><Check className="w-4 h-4" /> Course Created!</> :
                              <><Plus className="w-4 h-4" /> Create Course</>}
                </button>
              </form>
            </div>
          )}

          {/* Lessons tab */}
          {tab === "lessons" && (
            <div className="p-5 space-y-6">
              {/* Course selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-400">Select Course</label>
                <select
                  value={selectedCourseId ?? ""}
                  onChange={e => setSelectedCourseId(Number(e.target.value))}
                  className="bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500/60 transition-colors"
                >
                  <option value="">Choose a course…</option>
                  {courses?.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                </select>
              </div>

              {selectedCourseId && (
                <form onSubmit={handleAddLesson} className="bg-zinc-800/50 border border-zinc-700/50 rounded-2xl p-4 space-y-4 max-w-xl">
                  <h3 className="font-semibold text-white text-sm">Add New Lesson</h3>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2 space-y-1.5">
                      <label className="text-xs font-medium text-zinc-400">Lesson Title *</label>
                      <input
                        required value={lessonForm.title}
                        onChange={e => setLessonForm(f => ({ ...f, title: e.target.value }))}
                        placeholder="e.g. Introduction to Neural Networks"
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/60"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-zinc-400">Lesson Type</label>
                      <select
                        value={lessonForm.type}
                        onChange={e => setLessonForm(f => ({ ...f, type: e.target.value }))}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500/60"
                      >
                        {LESSON_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-zinc-400">Duration (minutes)</label>
                      <input
                        type="number" min="1" value={lessonForm.durationMinutes}
                        onChange={e => setLessonForm(f => ({ ...f, durationMinutes: e.target.value }))}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500/60"
                      />
                    </div>

                    {lessonForm.type === "video" && (
                      <div className="col-span-2 space-y-1.5">
                        <label className="text-xs font-medium text-zinc-400">Video URL</label>
                        <input
                          type="url" value={lessonForm.videoUrl}
                          onChange={e => setLessonForm(f => ({ ...f, videoUrl: e.target.value }))}
                          placeholder="https://youtube.com/watch?v=..."
                          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/60"
                        />
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-zinc-400">Order</label>
                      <input
                        type="number" min="1" value={lessonForm.order}
                        onChange={e => setLessonForm(f => ({ ...f, order: e.target.value }))}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500/60"
                      />
                    </div>

                    <div className="flex items-center gap-2 self-end pb-2">
                      <input
                        type="checkbox" id="isFree"
                        checked={lessonForm.isFree}
                        onChange={e => setLessonForm(f => ({ ...f, isFree: e.target.checked }))}
                        className="w-4 h-4 accent-violet-500"
                      />
                      <label htmlFor="isFree" className="text-xs text-zinc-400">Free preview lesson</label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={addingLesson}
                    className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl text-sm transition-all disabled:opacity-60"
                  >
                    {addingLesson ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Adding…</> : <><Plus className="w-3.5 h-3.5" /> Add Lesson</>}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
