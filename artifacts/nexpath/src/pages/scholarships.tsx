import { useState } from "react";
import { Link } from "wouter";
import { useListScholarships } from "@workspace/api-client-react";
import { AppLayout } from "@/components/layout/app-layout";
import { GraduationCap, Calendar, DollarSign, Building, Search } from "lucide-react";
import { format } from "date-fns";

export default function Scholarships() {
  const [search, setSearch] = useState("");

  const { data: scholarships, isLoading } = useListScholarships({
    search: search || undefined,
  });

  return (
    <AppLayout pageTitle="Scholarships" pageSubtitle="Discover funding opportunities to support your academic journey.">
      <div className="p-6 space-y-6">
        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
          <input
            type="search"
            placeholder="Search scholarships..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700/70 rounded-xl pl-9 pr-4 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/60 transition-colors"
          />
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 animate-pulse space-y-3">
                <div className="h-4 bg-zinc-800 rounded w-1/3" />
                <div className="h-5 bg-zinc-800 rounded w-3/4" />
                <div className="h-3 bg-zinc-800 rounded w-full" />
                <div className="h-3 bg-zinc-800 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : scholarships?.length === 0 ? (
          <div className="text-center py-20 text-zinc-500">
            <GraduationCap className="w-10 h-10 mx-auto mb-3 opacity-30" />
            No scholarships found matching your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {scholarships?.map((s) => (
              <Link key={s.id} href={`/scholarships/${s.id}`}>
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-600 hover:shadow-lg hover:shadow-black/30 transition-all cursor-pointer group h-full flex flex-col">
                  <div className="mb-3">
                    <span className="text-[11px] px-2.5 py-1 rounded-full font-medium bg-sky-500/15 text-sky-400 border border-sky-500/20">
                      {s.category}
                    </span>
                  </div>

                  <h3 className="font-semibold text-white text-sm line-clamp-2 mb-1.5 group-hover:text-violet-300 transition-colors">
                    {s.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-3">
                    <Building className="w-3.5 h-3.5" />
                    <span>{s.provider}</span>
                  </div>

                  <p className="text-xs text-zinc-400 line-clamp-3 flex-1">{s.description}</p>

                  <div className="flex items-center justify-between text-xs border-t border-zinc-800 mt-4 pt-3">
                    <div className="flex items-center gap-1.5 font-semibold text-emerald-400">
                      <DollarSign className="w-3.5 h-3.5" />
                      <span>{s.amount ? `$${s.amount.toLocaleString()}` : "Varies"}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-zinc-500">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{s.deadline ? format(new Date(s.deadline), "MMM d, yyyy") : "Rolling"}</span>
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
