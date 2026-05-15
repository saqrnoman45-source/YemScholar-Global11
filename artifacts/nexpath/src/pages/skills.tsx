import { useState } from "react";
import { useGetMySkills, useListSkills, useAddMySkill, useRemoveMySkill, getGetMySkillsQueryKey } from "@workspace/api-client-react";
import { AppLayout } from "@/components/layout/app-layout";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus, Sparkles, ChevronDown } from "lucide-react";
import { UserSkillInputLevel } from "@workspace/api-zod/src/generated/types/userSkillInputLevel";
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

export default function Skills() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: mySkills, isLoading: loadingMySkills } = useGetMySkills();
  const { data: allSkills } = useListSkills();

  const addSkillMutation = useAddMySkill();
  const removeSkillMutation = useRemoveMySkill();

  const [selectedSkillId, setSelectedSkillId] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<UserSkillInputLevel>("beginner");

  const unaddedSkills = allSkills?.filter((s) => !mySkills?.some((ms) => ms.skillId === s.id)) || [];

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

  const handleRemove = (id: number) => {
    removeSkillMutation.mutate({ id }, {
      onSuccess: () => {
        toast({ title: "Skill removed" });
        queryClient.invalidateQueries({ queryKey: getGetMySkillsQueryKey() });
      },
    });
  };

  return (
    <AppLayout pageTitle="Skills Profile" pageSubtitle="Track your competencies and demonstrate your growth.">
      <div className="p-6">
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
                    <select
                      value={selectedSkillId}
                      onChange={(e) => setSelectedSkillId(e.target.value)}
                      className="w-full appearance-none bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-violet-500/60 transition-colors pr-8"
                    >
                      <option value="">Select a skill...</option>
                      {unaddedSkills.map((s) => (
                        <option key={s.id} value={s.id.toString()}>{s.name}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-zinc-400 block mb-1.5">Proficiency Level</label>
                  <div className="relative">
                    <select
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value as UserSkillInputLevel)}
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
              </h2>

              {loadingMySkills ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 bg-zinc-800 rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : mySkills?.length === 0 ? (
                <div className="text-center py-14 border border-dashed border-zinc-700 rounded-xl">
                  <Sparkles className="w-8 h-8 mx-auto mb-2 text-zinc-600" />
                  <p className="text-zinc-500 text-sm">No skills added yet.</p>
                  <p className="text-zinc-600 text-xs mt-1">Add skills from the panel to get started.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {mySkills?.map((userSkill) => {
                    const cfg = levelConfig[userSkill.level] ?? levelConfig.beginner;
                    return (
                      <div
                        key={userSkill.id}
                        className="flex items-center gap-4 p-4 bg-zinc-800/40 border border-zinc-700/50 rounded-xl hover:border-zinc-600 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <p className="text-sm font-medium text-white">{userSkill.skill?.name}</p>
                            <span className={`text-[11px] px-2 py-0.5 rounded-full border font-medium capitalize ${cfg.color}`}>
                              {cfg.label}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-500 mb-2">{userSkill.skill?.category}</p>
                          <div className="h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                            <div className={`h-full ${cfg.bar} ${levelWidths[userSkill.level] ?? "w-1/4"} rounded-full`} />
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemove(userSkill.id)}
                          disabled={removeSkillMutation.isPending}
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
      </div>
    </AppLayout>
  );
}
