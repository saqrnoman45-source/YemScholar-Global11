import { createContext, useContext, ReactNode } from "react";
import { useGetMe } from "@workspace/api-client-react";

export type UserRole = "student" | "teacher" | "admin";

export interface AuthUser {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  bio?: string | null;
  avatarUrl?: string | null;
  createdAt: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  role: UserRole | null;
  isAdmin: boolean;
  isTeacher: boolean;
  isStudent: boolean;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  role: null,
  isAdmin: false,
  isTeacher: false,
  isStudent: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: user, isLoading } = useGetMe({ query: { retry: false, queryKey: ["getMe"] } });

  const role = (user?.role as UserRole) ?? null;
  const value: AuthContextValue = {
    user: user as AuthUser ?? null,
    isLoading,
    isAuthenticated: !!user,
    role,
    isAdmin: role === "admin",
    isTeacher: role === "teacher" || role === "admin",
    isStudent: !!role,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
