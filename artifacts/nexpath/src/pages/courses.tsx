import { useState } from "react";
import { Link } from "wouter";
import { useListCourses } from "@workspace/api-client-react";
import { AppLayout } from "@/components/layout/app-layout";
import { BookOpen, Users, Clock, Search, SlidersHorizontal } from "lucide-react";

const levelColors: Record<string, string> = {
  beginner:     "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  intermediate: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  advanced:     "bg-rose-500/15 text-rose-400 border-rose-500/20",
};

const categoryColors: Record<string, string> = {
  "AI":       "bg-violet-500/15 text-violet-300",
  "Web Dev":  "bg-sky-500/15 text-sky-300",
  "CS":       "bg-emerald-500/15 text-emerald-300",
  "Research": "bg-amber-500/15 text-amber-300",
  default:    "bg-zinc-700/50 text-zinc-300",
};

function getCatColor(cat: string) {
  return categoryColors[cat] ?? categoryColors.default;
}

export default function Courses() {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("all");

  const { data: courses, isLoading } = useListCourses({
    search: search || undefined,
    level: level !== "all" ? level : undefined,
  });

  return (
    <AppLayout pageTitle="Courses" pageSubtitle="Explore our curriculum designed by industry experts.">
      <div className="p-6 space-y-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
            <input
              type="search"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700/70 rounded-xl pl-9 pr-4 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/60 transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-zinc-500 shrink-0" />
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="bg-zinc-900 border border-zinc-700/70 rounded-xl px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:border-violet-500/60 transition-colors"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden animate-pulse">
                <div className="h-44 bg-zinc-800" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-zinc-800 rounded w-3/4" />
                  <div className="h-3 bg-zinc-800 rounded w-1/2" />
                  <div className="h-3 bg-zinc-800 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : courses?.length === 0 ? (
          <div className="text-center py-20 text-zinc-500">
            <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
            No courses found matching your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {courses?.map((course) => (
              <Link key={course.id} href={`/courses/${course.id}`}>
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-600 hover:shadow-lg hover:shadow-black/30 transition-all cursor-pointer group h-full flex flex-col">
                  {course.thumbnailUrl ? (
                    <div className="h-44 overflow-hidden bg-zinc-800">
                      <img
                        src={course.thumbnailUrl}
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="h-44 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-zinc-600" />
                    </div>
                  )}

                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-[11px] px-2.5 py-1 rounded-full border font-medium capitalize ${levelColors[course.level] ?? "bg-zinc-700 text-zinc-300 border-zinc-600"}`}>
                        {course.level}
                      </span>
                      <span className={`text-[11px] px-2.5 py-1 rounded-full font-medium ${getCatColor(course.category)}`}>
                        {course.category}
                      </span>
                    </div>

                    <h3 className="font-semibold text-white text-sm line-clamp-2 mb-1 group-hover:text-violet-300 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-xs text-zinc-500 mb-3">{course.instructorName}</p>
                    <p className="text-xs text-zinc-400 line-clamp-2 flex-1">{course.description}</p>

                    <div className="flex items-center justify-between text-xs text-zinc-500 border-t border-zinc-800 mt-4 pt-3">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />{course.duration} hrs
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />{course.enrollmentCount} enrolled
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
