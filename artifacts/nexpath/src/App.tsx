import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { Navbar } from "@/components/layout/navbar";
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
import Login from "@/pages/login";
import Register from "@/pages/register";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/courses" component={Courses} />
          <Route path="/courses/:id" component={CourseDetail} />
          <Route path="/scholarships" component={Scholarships} />
          <Route path="/scholarships/:id" component={ScholarshipDetail} />
          <Route path="/articles" component={Articles} />
          <Route path="/articles/:id" component={ArticleDetail} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/skills">
            <ProtectedRoute><Skills /></ProtectedRoute>
          </Route>
          <Route path="/admin">
            <ProtectedRoute requireAdmin><Admin /></ProtectedRoute>
          </Route>
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
