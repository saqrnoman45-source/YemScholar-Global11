import { useState } from "react";
import { Link } from "wouter";
import { useListCourses } from "@workspace/api-client-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Users, Clock } from "lucide-react";

export default function Courses() {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState<string>("all");
  const [category, setCategory] = useState<string>("all");

  const { data: courses, isLoading } = useListCourses({
    search: search || undefined,
    level: level !== "all" ? level : undefined,
    category: category !== "all" ? category : undefined,
  });

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold tracking-tight">Courses</h1>
          <p className="text-muted-foreground mt-2">Explore our comprehensive curriculum designed by industry experts.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="w-full md:w-1/3">
          <Input 
            placeholder="Search courses..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="w-full md:w-1/4">
          <Select value={level} onValueChange={setLevel}>
            <SelectTrigger>
              <SelectValue placeholder="All Levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="flex flex-col overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses?.length === 0 ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No courses found matching your criteria.
            </div>
          ) : (
            courses?.map((course) => (
              <Link key={course.id} href={`/courses/${course.id}`}>
                <Card className="h-full flex flex-col hover:border-primary/50 transition-colors cursor-pointer group">
                  {course.thumbnailUrl ? (
                    <div className="h-48 overflow-hidden bg-muted">
                      <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                    </div>
                  ) : (
                    <div className="h-48 bg-muted flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-muted-foreground/30" />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2 gap-2">
                      <Badge variant="secondary" className="capitalize">{course.level}</Badge>
                      <Badge variant="outline">{course.category}</Badge>
                    </div>
                    <CardTitle className="line-clamp-2 text-xl font-serif leading-tight group-hover:text-primary transition-colors">{course.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <span className="font-medium text-foreground">{course.instructorName}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground text-sm line-clamp-3">{course.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between text-sm text-muted-foreground border-t pt-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration} hrs</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{course.enrollmentCount} enrolled</span>
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
