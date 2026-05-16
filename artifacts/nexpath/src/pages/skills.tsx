import { useState } from "react";
import { useGetMySkills, useListSkills, useAddMySkill, useRemoveMySkill, getGetMySkillsQueryKey } from "@workspace/api-client-react";
import { AppLayout } from "@/components/layout/app-layout";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus, Sparkles, ChevronDown, Map, TrendingUp, CheckCircle, Circle, Lock } from "lucide-react";
import { UserSkillInputLevel } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";

const levelConfig: Record<string, { label: string; color: string; bar: string }> = {
  beginner:     { label: "Beginner",     color: "bg-sky-500/15 text-sky-400 border-sky-500/25",         bar: "bg-sky-500" },
  intermediate: { label: "Intermediate", color: "bg-amber-500/15 text-amber-400 border-amber-500/25",   bar: "bg-amber-500" },
  advanced:     { label: "Advanced",     color: "bg-violet-500/15 text-violet-400 border-violet-500/25", bar: "bg-violet-500" },
  expert:       { label: "Expert",       color: "bg-rose-500/15 text-rose-400 border-rose-500/25",       bar: "bg-rose-500" },
};

const levelWidths: Record<string, string> = {
  beginner: "w-1/4", intermediate: "w-2/4", advanced: "w-3/4", expert: "w-full",
};

const ROADMAPS = [
  {
    id: "ai",
    title: "AI & Machine Learning Path",
    color: "from-violet-500 to-purple-600",
    icon: "🤖",
    steps: [
      { label: "Python Fundamentals",       level: "beginner",     done: true },
      { label: "Statistics & Probability",  level: "beginner",     done: true },
      { label: "Machine Learning Basics",   level: "intermediate", done: true },
      { label: "Deep Learning with PyTorch",level: "intermediate", done: false },
      { label: "NLP & Transformers",        level: "advanced",     done: false },
      { label: "MLOps & Deployment",        level: "advanced",     done: false },
      { label: "AI Research & Innovation",  level: "expert",       done: false },
    ],
  },
  {
    id: "web",
    title: "Full-Stack Web Dev Path",
    color: "from-sky-500 to-blue-600",
    icon: "🌐",
    steps: [
      { label: "HTML & CSS Basics",    level: "beginner",     done: true },
      { label: "JavaScript Essentials",level: "beginner",     done: true },
      { label: "React & TypeScript",   level: "intermediate", done: true },
      { label: "Node.js & Express",    level: "intermediate", done: false },
      { label: "Databases & SQL",      level: "intermediate", done: false },
      { label: "System Design",        level: "advanced",     done: false },
      { label: "Cloud & DevOps",       level: "advanced",     done: false },
    ],
  },
  {
    id: "data",
    title: "Data Science Path",
    color: "from-emerald-500 to-teal-600",
    icon: "📊",
    steps: [
      { label: "Excel & Data Basics",   level: "beginner",     done: true },
      { label: "Python for Data",       level: "beginner",     done: false },
      { label: "Data Visualisation",    level: "intermediate", done: false },
      { label: "Pandas & NumPy",        level: "intermediate", done: false },
      { label: "Statistical Analysis",  level: "intermediate", done: false },
      { label: "Big Data Technologies", level: "advanced",     done: false },
      { label: "Data Engineering",      level: "advanced",     done: false },
    ],
  },
];

const levelDot: Record<string, string> = {
  beginner: "bg-sky-500", intermediate: "bg-amber-500", advanced: "bg-violet-500", expert: "bg-rose-500",
};

type Tab = "skills" | "roadmap";

export default function Skills() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: mySkills, isLoading: loadingMySkills } = useGetMySkills();
  const { data: allSkills } = useListSkills();
  const addSkillMutation = useAddMySkill();
  const removeSkillMutation = useRemoveMySkill();

  const [selectedSkillId, setSelectedSkillId] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<UserSkillInputLevel>("beginner");
  const [tab, setTab] = useState<Tab>("skills");
  const [activeRoadmap, setActiveRoadmap] = useState(ROADMAPS[0]);

  const unaddedSkills = allSkills?.filter(s => !mySkills?.some(ms => ms.skillId === s.id)) || [];

  const handleAdd = () => {
    if (!selectedSkillId) return;
    addSkillMutation.mutate(
      { data: { skillId: parseInt(selectedSkillId, 10), level: selectedLevel } },
      {
        onSuccess: () => {
          toast({ title: "Skill added" });
          setSelectedSkillId("");
          queryClient.invalidateQueries({ queryKey: getGetMySkillsQueryKey() });
        },
      }
    );
  };

  const handleRemove = (skillId: number) => {
    removeSkillMutation.mutate({ skillId }, {
      onSuccess: () => {
        toast({ title: "Skill removed" });
        queryClient.invalidateQueries({ queryKey: getGetMySkillsQueryKey() });
      },
    });
  };

  const completedSteps = activeRoadmap.steps.filter(s => s.done).length;
  const progress = Math.round((completedSteps / activeRoadmap.steps.length) * 100);

  return (
    <AppLayout pageTitle="Skills Profile" pageSubtitle="Track your competencies and demonstrate your growth.">
      <div className="p-6 space-y-5">

        {/* Tab bar */}
        <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-xl p-1 w-fit">
          {(["skills", "roadmap"] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                tab === t ? "bg-violet-600 text-white" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {t === "skills" ? <Sparkles className="w-3.5 h-3.5" /> : <Map className="w-3.5 h-3.5" />}
              {t === "skills" ? "My Skills" : "Skill Roadmap"}
            </button>
          ))}
        </div>

        {tab === "skills" && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Add skill panel */}
            <div className="lg:col-span-1">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 sticky top-20">
                <h2 className="font-semibold text-white text-sm flex items-center gap-2 mb-1">
                  <Plus className="w-4 h-4 text-violet-400" /> Add New Skill
                </h2>
                <p className="text-xs text-zinc-500 mb-5">Select a skill to add to your profile.</p>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-zinc-400 block mb-1.5">Skill</label>
                    <div className="relative">
                      <select value={selectedSkillId} onChange={e => setSelectedSkillId(e.target.value)}
                        className="w-full appearance-none bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-violet-500/60 transition-colors pr-8"
                      >
                        <option value="">Select a skill...</option>
                        {unaddedSkills.map(s => <option key={s.id} value={s.id.toString()}>{s.name}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-zinc-400 block mb-1.5">Proficiency Level</label>
                    <div className="relative">
                      <select value={selectedLevel} onChange={e => setSelectedLevel(e.target.value as UserSkillInputLevel)}
                        className="w-full appearance-none bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-violet-500/60 transition-colors pr-8"
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                        <option value="expert">Expert</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                    </div>
                  </div>
                  <button
                    onClick={handleAdd}
                    disabled={!selectedSkillId || addSkillMutation.isPending}
                    className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
                  >
                    {addSkillMutation.isPending ? "Adding..." : "Add to Profile"}
                  </button>
                </div>
              </div>
            </div>

            {/* Skills list */}
            <div className="lg:col-span-2">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                <h2 className="font-semibold text-white text-sm flex items-center gap-2 mb-5">
                  <Sparkles className="w-4 h-4 text-amber-400" /> Current Competencies
                  {mySkills && mySkills.length > 0 && (
                    <span className="ml-auto text-xs text-zinc-500 font-normal">{mySkills.length} skill{mySkills.length !== 1 ? "s" : ""}</span>
                  )}
                </h2>
                {loadingMySkills ? (
                  <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-16 bg-zinc-800 rounded-xl animate-pulse" />)}</div>
                ) : mySkills?.length === 0 ? (
                  <div className="text-center py-14 border border-dashed border-zinc-700 rounded-xl">
                    <Sparkles className="w-8 h-8 mx-auto mb-2 text-zinc-600" />
                    <p className="text-zinc-500 text-sm">No skills added yet.</p>
                    <p className="text-zinc-600 text-xs mt-1">Add skills from the panel to get started.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {mySkills?.map(userSkill => {
                      const cfg = levelConfig[userSkill.level] ?? levelConfig.beginner;
                      return (
                        <div key={userSkill.id} className="flex items-center gap-4 p-4 bg-zinc-800/40 border border-zinc-700/50 rounded-xl hover:border-zinc-600 transition-colors">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <p className="text-sm font-medium text-white">{userSkill.skill?.name}</p>
                              <span className={`text-[11px] px-2 py-0.5 rounded-full border font-medium capitalize ${cfg.color}`}>{cfg.label}</span>
                            </div>
                            <p className="text-xs text-zinc-500 mb-2">{userSkill.skill?.category}</p>
                            <div className="h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                              <div className={`h-full ${cfg.bar} ${levelWidths[userSkill.level] ?? "w-1/4"} rounded-full`} />
                            </div>
                          </div>
                          <button onClick={() => handleRemove(userSkill.skillId)} disabled={removeSkillMutation.isPending}
                            className="p-2 rounded-lg text-zinc-600 hover:text-rose-400 hover:bg-rose-500/10 transition-all shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {tab === "roadmap" && (
          <div className="space-y-5">
            {/* Roadmap selector */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {ROADMAPS.map(r => (
                <button
                  key={r.id}
                  onClick={() => setActiveRoadmap(r)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    activeRoadmap.id === r.id
                      ? "border-violet-500/50 bg-violet-500/10"
                      : "border-zinc-800 bg-zinc-900 hover:border-zinc-600"
                  }`}
                >
                  <span className="text-2xl mb-2 block">{r.icon}</span>
                  <p className={`text-sm font-semibold ${activeRoadmap.id === r.id ? "text-white" : "text-zinc-400"}`}>{r.title}</p>
                </button>
              ))}
            </div>

            {/* Roadmap steps */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold text-white">{activeRoadmap.title}</h2>
                <span className="text-xs text-zinc-400">{completedSteps}/{activeRoadmap.steps.length} completed</span>
              </div>

              {/* Progress bar */}
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden mb-8">
                <div
                  className={`h-full bg-gradient-to-r ${activeRoadmap.color} rounded-full transition-all duration-700`}
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Steps */}
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-zinc-800" />

                <div className="space-y-0">
                  {activeRoadmap.steps.map((step, i) => {
                    const isLocked = !step.done && i > 0 && !activeRoadmap.steps[i - 1].done;
                    return (
                      <div key={i} className="flex items-start gap-4 relative pb-6 last:pb-0">
                        <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${
                          step.done
                            ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                            : isLocked
                            ? "bg-zinc-800 border-zinc-700 text-zinc-600"
                            : "bg-violet-500/15 border-violet-500/60 text-violet-400"
                        }`}>
                          {step.done ? <CheckCircle className="w-4 h-4" /> : isLocked ? <Lock className="w-3 h-3" /> : <Circle className="w-4 h-4" />}
                        </div>
                        <div className="pt-1 flex-1">
                          <div className="flex items-center gap-2.5">
                            <p className={`text-sm font-medium ${step.done ? "text-white line-through decoration-zinc-600" : isLocked ? "text-zinc-600" : "text-white"}`}>
                              {step.label}
                            </p>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-medium capitalize shrink-0 ${
                              step.done ? "bg-emerald-500/10 text-emerald-500" :
                              step.level === "beginner" ? "bg-sky-500/10 text-sky-500" :
                              step.level === "intermediate" ? "bg-amber-500/10 text-amber-500" :
                              step.level === "advanced" ? "bg-violet-500/10 text-violet-500" :
                              "bg-rose-500/10 text-rose-500"
                            }`}>
                              {step.done ? "Done" : step.level}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-white">{completedSteps}</p>
                <p className="text-xs text-zinc-500 mt-0.5">Completed</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-white">{activeRoadmap.steps.length - completedSteps}</p>
                <p className="text-xs text-zinc-500 mt-0.5">Remaining</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-violet-400">{progress}%</p>
                <p className="text-xs text-zinc-500 mt-0.5">Progress</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
