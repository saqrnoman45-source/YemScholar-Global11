import { useState } from "react";
import { Link } from "wouter";
import { useListScholarships } from "@workspace/api-client-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, DollarSign, Building } from "lucide-react";
import { format } from "date-fns";

export default function Scholarships() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");

  const { data: scholarships, isLoading } = useListScholarships({
    search: search || undefined,
    category: category !== "all" ? category : undefined,
  });

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold tracking-tight">Scholarships</h1>
          <p className="text-muted-foreground mt-2">Discover funding opportunities to support your academic journey.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="w-full md:w-1/3">
          <Input 
            placeholder="Search scholarships..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scholarships?.length === 0 ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No scholarships found matching your criteria.
            </div>
          ) : (
            scholarships?.map((scholarship) => (
              <Link key={scholarship.id} href={`/scholarships/${scholarship.id}`}>
                <Card className="h-full flex flex-col hover:border-primary/50 transition-colors cursor-pointer group">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2 gap-2">
                      <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">{scholarship.category}</Badge>
                    </div>
                    <CardTitle className="line-clamp-2 text-xl font-serif group-hover:text-primary transition-colors">{scholarship.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <Building className="h-3 w-3" />
                      <span className="font-medium text-foreground">{scholarship.provider}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground text-sm line-clamp-3">{scholarship.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between text-sm text-muted-foreground border-t pt-4">
                    <div className="flex items-center gap-1 font-medium text-foreground">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span>{scholarship.amount ? `$${scholarship.amount.toLocaleString()}` : 'Varies'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{scholarship.deadline ? format(new Date(scholarship.deadline), 'MMM d, yyyy') : 'Rolling'}</span>
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
