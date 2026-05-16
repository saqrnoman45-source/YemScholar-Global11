import { useParams } from "wouter";
import { useGetArticle, getGetArticleQueryKey } from "@workspace/api-client-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { Link } from "wouter";
import { format } from "date-fns";

export default function ArticleDetail() {
  const { id } = useParams();
  const articleId = parseInt(id || "0", 10);

  const { data: article, isLoading } = useGetArticle(articleId, {
    query: {
      enabled: !!articleId,
      queryKey: getGetArticleQueryKey(articleId),
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 px-4 max-w-3xl">
        <Skeleton className="h-8 w-32 mb-12" />
        <Skeleton className="h-12 w-full mb-6" />
        <Skeleton className="h-6 w-1/3 mb-12" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    );
  }

  if (!article) {
    return <div className="container py-20 text-center text-xl">Article not found</div>;
  }

  return (
    <article className="container mx-auto py-10 px-4 max-w-3xl">
      <div className="mb-10">
        <Link href="/articles" className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Articles
        </Link>
      </div>

      <header className="mb-12">
        <div className="mb-6 flex justify-center">
          <Badge variant="secondary" className="px-3 py-1 font-medium">{article.topic}</Badge>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-6 text-center">{article.title}</h1>
        <p className="text-xl text-muted-foreground text-center mb-8 max-w-2xl mx-auto italic">
          {article.summary}
        </p>
        
        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground border-y py-4">
          <div className="font-medium text-foreground">By {article.authorName}</div>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            {format(new Date(article.publishedAt), 'MMM d, yyyy')}
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {article.readTime} min read
          </div>
        </div>
      </header>

      {article.thumbnailUrl && (
        <figure className="mb-12 rounded-xl overflow-hidden border shadow-sm">
          <img src={article.thumbnailUrl} alt={article.title} className="w-full object-cover" />
        </figure>
      )}

      <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-serif prose-a:text-primary">
        <div dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br/>') }} />
        {/* Fallback rendering since content might just be plain text in mock */}
        <p className="text-lg leading-relaxed">{article.content}</p>
      </div>
    </article>
  );
}
