import { useGetMe, useListMyEnrollments, useListMyApplications } from "@workspace/api-client-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, FileText, CheckCircle, Clock } from "lucide-react";
import { Link } from "wouter";
import { format } from "date-fns";

export default function Dashboard() {
  const { data: user } = useGetMe();
  const { data: enrollments, isLoading: loadingEnrollments } = useListMyEnrollments();
  const { data: applications, isLoading: loadingApplications } = useListMyApplications();

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold tracking-tight">Welcome back, {user?.name}</h1>
        <p className="text-muted-foreground mt-1">Manage your learning journey and applications.</p>
      </div>

      <Tabs defaultValue="courses" className="space-y-6">
        <TabsList className="bg-muted/50 border">
          <TabsTrigger value="courses" className="data-[state=active]:bg-background">My Courses</TabsTrigger>
          <TabsTrigger value="applications" className="data-[state=active]:bg-background">Applications</TabsTrigger>
        </TabsList>

        <TabsContent value="courses">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loadingEnrollments ? (
              <div>Loading courses...</div>
            ) : enrollments?.length === 0 ? (
              <div className="col-span-full py-12 text-center border rounded-xl bg-card border-dashed">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
                <h3 className="text-lg font-medium">No active courses</h3>
                <p className="text-muted-foreground mb-4">You haven't enrolled in any courses yet.</p>
                <Link href="/courses" className="text-primary hover:underline font-medium">Browse courses</Link>
              </div>
            ) : (
              enrollments?.map((enrollment) => (
                <Card key={enrollment.id} className="flex flex-col">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant={enrollment.status === 'completed' ? 'default' : 'secondary'} className="capitalize">
                        {enrollment.status}
                      </Badge>
                    </div>
                    <CardTitle className="line-clamp-2 text-xl font-serif">
                      {enrollment.course?.title || "Course Name Unavailable"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{enrollment.progress}%</span>
                        </div>
                        <Progress value={enrollment.progress} className="h-2" />
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4">
                        <Clock className="h-3 w-3" />
                        Enrolled on {format(new Date(enrollment.enrolledAt), 'MMM d, yyyy')}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="applications">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loadingApplications ? (
              <div>Loading applications...</div>
            ) : applications?.length === 0 ? (
              <div className="col-span-full py-12 text-center border rounded-xl bg-card border-dashed">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
                <h3 className="text-lg font-medium">No applications</h3>
                <p className="text-muted-foreground mb-4">You haven't applied for any scholarships yet.</p>
                <Link href="/scholarships" className="text-primary hover:underline font-medium">Find scholarships</Link>
              </div>
            ) : (
              applications?.map((app) => (
                <Card key={app.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant={
                        app.status === 'approved' ? 'default' : 
                        app.status === 'rejected' ? 'destructive' : 'outline'
                      } className="capitalize">
                        {app.status}
                      </Badge>
                    </div>
                    <CardTitle className="font-serif text-xl">{app.scholarship?.title}</CardTitle>
                    <CardDescription>{app.scholarship?.provider}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      Applied on {format(new Date(app.appliedAt), 'MMMM d, yyyy')}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
