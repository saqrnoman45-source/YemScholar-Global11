import { useGetAdminStats, useListAdminUsers, useListAdminApplications } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, BookOpen, GraduationCap, FileText, ArrowUpRight } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export default function Admin() {
  const { data: stats, isLoading: loadingStats } = useGetAdminStats();
  const { data: users, isLoading: loadingUsers } = useListAdminUsers();
  const { data: apps, isLoading: loadingApps } = useListAdminApplications();

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold tracking-tight">Admin Console</h1>
        <p className="text-muted-foreground mt-2">Platform analytics and management.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Total Users" 
          value={stats?.totalUsers} 
          icon={<Users className="h-4 w-4 text-muted-foreground" />} 
          loading={loadingStats} 
        />
        <StatCard 
          title="Active Courses" 
          value={stats?.totalCourses} 
          icon={<BookOpen className="h-4 w-4 text-muted-foreground" />} 
          loading={loadingStats} 
        />
        <StatCard 
          title="Scholarships" 
          value={stats?.totalScholarships} 
          icon={<GraduationCap className="h-4 w-4 text-muted-foreground" />} 
          loading={loadingStats} 
        />
        <StatCard 
          title="Applications" 
          value={stats?.totalApplications} 
          icon={<FileText className="h-4 w-4 text-muted-foreground" />} 
          loading={loadingStats} 
        />
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList>
          <TabsTrigger value="users">Manage Users</TabsTrigger>
          <TabsTrigger value="applications">Manage Applications</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Registered Users</CardTitle>
            </CardHeader>
            <CardContent>
              {loadingUsers ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => <Skeleton key={i} className="h-12 w-full" />)}
                </div>
              ) : (
                <div className="rounded-md border">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-muted-foreground">
                      <tr>
                        <th className="px-4 py-3 font-medium">Name</th>
                        <th className="px-4 py-3 font-medium">Email</th>
                        <th className="px-4 py-3 font-medium">Role</th>
                        <th className="px-4 py-3 font-medium">Joined</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {users?.map(user => (
                        <tr key={user.id} className="hover:bg-muted/20">
                          <td className="px-4 py-3 font-medium">{user.name}</td>
                          <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                          <td className="px-4 py-3">
                            <Badge variant={user.role === 'admin' ? 'default' : 'secondary'} className="capitalize">
                              {user.role}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">
                            {format(new Date(user.createdAt), 'MMM d, yyyy')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications">
          <Card>
            <CardHeader>
              <CardTitle>Scholarship Applications</CardTitle>
            </CardHeader>
            <CardContent>
              {loadingApps ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => <Skeleton key={i} className="h-12 w-full" />)}
                </div>
              ) : (
                <div className="rounded-md border">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-muted-foreground">
                      <tr>
                        <th className="px-4 py-3 font-medium">Applicant ID</th>
                        <th className="px-4 py-3 font-medium">Scholarship</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                        <th className="px-4 py-3 font-medium">Applied Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {apps?.map(app => (
                        <tr key={app.id} className="hover:bg-muted/20">
                          <td className="px-4 py-3">{app.userId}</td>
                          <td className="px-4 py-3 font-medium">{app.scholarship?.title}</td>
                          <td className="px-4 py-3">
                            <Badge variant={
                              app.status === 'approved' ? 'default' : 
                              app.status === 'rejected' ? 'destructive' : 'outline'
                            } className="capitalize">
                              {app.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">
                            {format(new Date(app.appliedAt), 'MMM d, yyyy')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatCard({ title, value, icon, loading }: { title: string, value: any, icon: React.ReactNode, loading: boolean }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-8 w-16" />
        ) : (
          <div className="text-2xl font-bold">{value || 0}</div>
        )}
      </CardContent>
    </Card>
  );
}
