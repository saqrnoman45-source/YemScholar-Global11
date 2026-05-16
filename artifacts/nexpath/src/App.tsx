import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/auth-context";
import { ProtectedRoute } from "@/components/layout/protected-route";

import Home from "@/pages/home";
import Courses from "@/pages/courses";
import CourseDetail from "@/pages/course-detail";
import Scholarships from "@/pages/scholarships";
import ScholarshipDetail from "@/pages/scholarship-detail";
import Articles from "@/pages/articles";
import ArticleDetail from "@/pages/article-detail";
import Dashboard from "@/pages/dashboard";
import Skills from "@/pages/skills";
import Admin from "@/pages/admin";
import Tests from "@/pages/tests";
import Login from "@/pages/login";
import Register from "@/pages/register";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: any) => {
        if (error?.response?.status === 401) return false;
        return failureCount < 2;
      },
    },
  },
});

function Router() {
  return (
    <Switch>
      {/* Public routes */}
      <Route path="/"              component={Home} />
      <Route path="/login"         component={Login} />
      <Route path="/register"      component={Register} />
      <Route path="/courses"       component={Courses} />
      <Route path="/courses/:id"   component={CourseDetail} />
      <Route path="/scholarships"  component={Scholarships} />
      <Route path="/scholarships/:id" component={ScholarshipDetail} />
      <Route path="/articles"      component={Articles} />
      <Route path="/articles/:id"  component={ArticleDetail} />

      {/* Auth-required: any logged-in user */}
      <Route path="/dashboard">
        {() => <ProtectedRoute><Dashboard /></ProtectedRoute>}
      </Route>
      <Route path="/tests">
        {() => <ProtectedRoute><Tests /></ProtectedRoute>}
      </Route>
      <Route path="/skills">
        {() => <ProtectedRoute><Skills /></ProtectedRoute>}
      </Route>

      {/* Admin only */}
      <Route path="/admin">
        {() => <ProtectedRoute roles={["admin"]}><Admin /></ProtectedRoute>}
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
