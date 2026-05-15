import { useState } from "react";
import { Link } from "wouter";
import { useListArticles } from "@workspace/api-client-react";
import { AppLayout } from "@/components/layout/app-layout";
import { FileText, Clock, Search } from "lucide-react";
import { format } from "date-fns";

const topicColors: Record<string, string> = {
  "AI":             "bg-violet-500/15 text-violet-300",
  "Career":         "bg-rose-500/15 text-rose-300",
  "Research":       "bg-amber-500/15 text-amber-300",
  "Technology":     "bg-sky-500/15 text-sky-300",
  "Science":        "bg-emerald-500/15 text-emerald-300",
  default:          "bg-zinc-700/50 text-zinc-300",
};

function getTopicColor(t: string) {
  return topicColors[t] ?? topicColors.default;
}

export default function Articles() {
  const [search, setSearch] = useState("");
  const [topic, setTopic] = useState("");

  const { data: articles, isLoading } = useListArticles({
    search: search || undefined,
    topic: topic || undefined,
  });

  return (
    <AppLayout pageTitle="Research & Insights" pageSubtitle="Explore the latest articles, research papers, and academic insights.">
      <div className="p-6 space-y-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
            <input
              type="search"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700/70 rounded-xl pl-9 pr-4 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/60 transition-colors"
            />
          </div>
          <input
            type="search"
            placeholder="Filter by topic..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="bg-zinc-900 border border-zinc-700/70 rounded-xl px-4 py-2 text-sm text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/60 transition-colors w-full sm:w-48"
          />
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 animate-pulse space-y-3">
                <div className="h-4 bg-zinc-800 rounded w-1/4" />
                <div className="h-5 bg-zinc-800 rounded w-3/4" />
                <div className="h-3 bg-zinc-800 rounded w-full" />
                <div className="h-3 bg-zinc-800 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : articles?.length === 0 ? (
          <div className="text-center py-20 text-zinc-500">
            <FileText className="w-10 h-10 mx-auto mb-3 opacity-30" />
            No articles found matching your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {articles?.map((article) => (
              <Link key={article.id} href={`/articles/${article.id}`}>
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-600 hover:shadow-lg hover:shadow-black/30 transition-all cursor-pointer group h-full flex flex-col">
                  {article.thumbnailUrl && (
                    <div className="h-44 overflow-hidden bg-zinc-800">
                      <img
                        src={article.thumbnailUrl}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="p-5 flex flex-col flex-1">
                    <div className="mb-3">
                      <span className={`text-[11px] px-2.5 py-1 rounded-full font-medium ${getTopicColor(article.topic)}`}>
                        {article.topic}
                      </span>
                    </div>

                    <h3 className="font-semibold text-white text-sm line-clamp-2 mb-1.5 group-hover:text-violet-300 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-xs text-zinc-500 mb-3">By {article.authorName}</p>
                    <p className="text-xs text-zinc-400 line-clamp-3 flex-1">{article.summary}</p>

                    <div className="flex items-center justify-between text-xs text-zinc-500 border-t border-zinc-800 mt-4 pt-3">
                      <span>{format(new Date(article.publishedAt), "MMM d, yyyy")}</span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />{article.readTime} min read
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
