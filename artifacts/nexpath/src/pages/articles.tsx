import { useState } from "react";
import { Link } from "wouter";
import { useListArticles } from "@workspace/api-client-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { FileText, Clock } from "lucide-react";

export default function Articles() {
  const [search, setSearch] = useState("");
  const [topic, setTopic] = useState<string>("");

  const { data: articles, isLoading } = useListArticles({
    search: search || undefined,
    topic: topic || undefined,
  });

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold tracking-tight">Research & Insights</h1>
          <p className="text-muted-foreground mt-2">Explore the latest articles, research papers, and academic insights.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="w-full md:w-1/3">
          <Input 
            placeholder="Search articles..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="w-full md:w-1/4">
          <Input 
            placeholder="Filter by topic..." 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="flex flex-col">
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-24 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles?.length === 0 ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No articles found matching your criteria.
            </div>
          ) : (
            articles?.map((article) => (
              <Link key={article.id} href={`/articles/${article.id}`}>
                <Card className="h-full flex flex-col hover:border-primary/50 transition-colors cursor-pointer group border-border/60">
                  {article.thumbnailUrl ? (
                    <div className="h-48 overflow-hidden bg-muted">
                      <img src={article.thumbnailUrl} alt={article.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                    </div>
                  ) : null}
                  <CardHeader>
                    <div className="mb-2">
                      <Badge variant="secondary" className="font-normal">{article.topic}</Badge>
                    </div>
                    <CardTitle className="line-clamp-2 text-xl font-serif group-hover:text-primary transition-colors">{article.title}</CardTitle>
                    <CardDescription className="mt-2 text-foreground font-medium">By {article.authorName}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground text-sm line-clamp-3">{article.summary}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between text-xs text-muted-foreground pt-4 border-t border-border/40">
                    <div>{format(new Date(article.publishedAt), 'MMM d, yyyy')}</div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{article.readTime} min read</span>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
