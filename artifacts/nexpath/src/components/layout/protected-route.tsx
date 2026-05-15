import { useEffect } from "wouter";
import { useLocation } from "wouter";
import { useGetMe } from "@workspace/api-client-react";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { data: user, isLoading } = useGetMe();
  const [, setLocation] = useLocation();

  if (isLoading) {
    return <div className="flex min-h-[50vh] items-center justify-center">Loading...</div>;
  }

  if (!user) {
    setLocation("/login");
    return null;
  }

  if (requireAdmin && user.role !== "admin") {
    setLocation("/dashboard");
    return null;
  }

  return <>{children}</>;
}
