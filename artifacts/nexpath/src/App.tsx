import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { Navbar } from "@/components/layout/navbar";
import { ProtectedRoute } from "@/components/layout/protected-route";

import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

// Stubs for remaining pages
function Courses() { return <div className="p-8">Courses List</div>; }
function CourseDetail() { return <div className="p-8">Course Detail</div>; }
function Scholarships() { return <div className="p-8">Scholarships</div>; }
function ScholarshipDetail() { return <div className="p-8">Scholarship Detail</div>; }
function Articles() { return <div className="p-8">Articles</div>; }
function ArticleDetail() { return <div className="p-8">Article Detail</div>; }
function Dashboard() { return <div className="p-8">Dashboard</div>; }
function Skills() { return <div className="p-8">Skills</div>; }
function Admin() { return <div className="p-8">Admin Dashboard</div>; }
function Login() { return <div className="p-8">Login Form</div>; }
function Register() { return <div className="p-8">Register Form</div>; }

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
          
          <Route path="/dashboard">
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          </Route>
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
