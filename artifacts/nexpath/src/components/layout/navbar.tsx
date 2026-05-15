import { Link, useLocation } from "wouter";
import { useGetMe, useLogout } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { data: user } = useGetMe();
  const logout = useLogout();
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        window.location.href = "/";
      }
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-serif font-bold text-xl">NexPath</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/courses" className="text-sm font-medium transition-colors hover:text-primary">
              Courses
            </Link>
            <Link href="/scholarships" className="text-sm font-medium transition-colors hover:text-primary">
              Scholarships
            </Link>
            <Link href="/articles" className="text-sm font-medium transition-colors hover:text-primary">
              Research
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              {user.role === "admin" && (
                <Link href="/admin" className="text-sm font-medium">
                  Admin
                </Link>
              )}
              <Link href="/dashboard" className="text-sm font-medium">
                Dashboard
              </Link>
              <Button variant="ghost" onClick={handleLogout}>Log out</Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost">Log in</Button>
              </Link>
              <Link href="/register">
                <Button>Sign up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
