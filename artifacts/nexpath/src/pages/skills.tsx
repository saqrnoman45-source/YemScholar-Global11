import { useState } from "react";
import { useGetMySkills, useListSkills, useAddMySkill, useRemoveMySkill } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus, Zap } from "lucide-react";
import { UserSkillInputLevel } from "@workspace/api-zod/src/generated/types/userSkillInputLevel";
import { useQueryClient } from "@tanstack/react-query";
import { getGetMySkillsQueryKey } from "@workspace/api-client-react";

export default function Skills() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: mySkills, isLoading: loadingMySkills } = useGetMySkills();
  const { data: allSkills, isLoading: loadingAllSkills } = useListSkills();
  
  const addSkillMutation = useAddMySkill();
  const removeSkillMutation = useRemoveMySkill();

  const [selectedSkillId, setSelectedSkillId] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<UserSkillInputLevel>("beginner");

  const unaddedSkills = allSkills?.filter(
    s => !mySkills?.some(ms => ms.skillId === s.id)
  ) || [];

  const handleAddSkill = () => {
    if (!selectedSkillId) return;
    
    addSkillMutation.mutate({
      data: {
        skillId: parseInt(selectedSkillId, 10),
        level: selectedLevel
      }
    }, {
      onSuccess: () => {
        toast({ title: "Skill added successfully" });
        setSelectedSkillId("");
        queryClient.invalidateQueries({ queryKey: getGetMySkillsQueryKey() });
      }
    });
  };

  const handleRemoveSkill = (id: number) => {
    removeSkillMutation.mutate({ id }, {
      onSuccess: () => {
        toast({ title: "Skill removed" });
        queryClient.invalidateQueries({ queryKey: getGetMySkillsQueryKey() });
      }
    });
  };

  const levelColors: Record<string, string> = {
    beginner: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300",
    intermediate: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300",
    advanced: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300",
    expert: "bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300",
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold tracking-tight">My Skills Profile</h1>
        <p className="text-muted-foreground mt-2">Track your competencies and demonstrate your growth.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Plus className="h-5 w-5" /> Add New Skill
              </CardTitle>
              <CardDescription>Select a skill from our taxonomy to add to your profile.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Skill</label>
                <Select value={selectedSkillId} onValueChange={setSelectedSkillId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a skill" />
                  </SelectTrigger>
                  <SelectContent>
                    {unaddedSkills.map(skill => (
                      <SelectItem key={skill.id} value={skill.id.toString()}>{skill.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Proficiency Level</label>
                <Select value={selectedLevel} onValueChange={(v) => setSelectedLevel(v as UserSkillInputLevel)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                className="w-full mt-4" 
                disabled={!selectedSkillId || addSkillMutation.isPending}
                onClick={handleAddSkill}
              >
                {addSkillMutation.isPending ? "Adding..." : "Add to Profile"}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="h-5 w-5 text-amber-500" /> Current Competencies
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loadingMySkills ? (
                <div>Loading skills...</div>
              ) : mySkills?.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground border border-dashed rounded-lg">
                  You haven't added any skills to your profile yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {mySkills?.map(userSkill => (
                    <div key={userSkill.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                      <div>
                        <div className="font-medium">{userSkill.skill?.name}</div>
                        <div className="text-sm text-muted-foreground">{userSkill.skill?.category}</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className={`${levelColors[userSkill.level]} capitalize`}>
                          {userSkill.level}
                        </Badge>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => handleRemoveSkill(userSkill.id)}
                          disabled={removeSkillMutation.isPending}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
