import React, { createContext, useContext, useState, useEffect } from "react";
import type { User, UserRole } from "@/types";
import { getAvatarUrl } from "@/lib/utils";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role?: UserRole) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone?: string;
}

const DEMO_USERS: Record<string, User & { password: string }> = {
  "owner@petzoo.com": { id: "u1", name: "Alex Thompson", email: "owner@petzoo.com", role: "owner", avatar: getAvatarUrl("Alex Thompson"), phone: "+1 555-0101", createdAt: "2024-01-15", isVerified: true, password: "demo123" },
  "vet@petzoo.com": { id: "u2", name: "Dr. Sarah Johnson", email: "vet@petzoo.com", role: "vet", avatar: getAvatarUrl("Sarah Johnson"), phone: "+1 555-0102", createdAt: "2024-02-10", isVerified: true, password: "demo123" },
  "groomer@petzoo.com": { id: "u3", name: "Maria Santos", email: "groomer@petzoo.com", role: "groomer", avatar: getAvatarUrl("Maria Santos"), phone: "+1 555-0103", createdAt: "2024-03-05", isVerified: true, password: "demo123" },
  "trainer@petzoo.com": { id: "u4", name: "Jake Miller", email: "trainer@petzoo.com", role: "trainer", avatar: getAvatarUrl("Jake Miller"), phone: "+1 555-0104", createdAt: "2024-03-20", isVerified: true, password: "demo123" },
  "vendor@petzoo.com": { id: "u5", name: "Robert Chen", email: "vendor@petzoo.com", role: "vendor", avatar: getAvatarUrl("Robert Chen"), phone: "+1 555-0105", createdAt: "2024-04-01", isVerified: true, password: "demo123" },
  "shelter@petzoo.com": { id: "u6", name: "Amanda Foster", email: "shelter@petzoo.com", role: "shelter", avatar: getAvatarUrl("Amanda Foster"), phone: "+1 555-0106", createdAt: "2024-04-15", isVerified: true, password: "demo123" },
  "admin@petzoo.com": { id: "u7", name: "Admin User", email: "admin@petzoo.com", role: "admin", avatar: getAvatarUrl("Admin User"), phone: "+1 555-0107", createdAt: "2024-01-01", isVerified: true, password: "admin123" },
};

const AuthContext = createContext<AuthContextType>({
  user: null, isAuthenticated: false, isLoading: true,
  login: async () => false, register: async () => false,
  logout: () => {}, updateUser: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("petzoo-user");
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { localStorage.removeItem("petzoo-user"); }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, _password: string, role?: UserRole): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 1000));
    const demo = DEMO_USERS[email.toLowerCase()];
    if (demo && demo.password === _password) {
      const { password: _, ...userObj } = demo;
      setUser(userObj);
      localStorage.setItem("petzoo-user", JSON.stringify(userObj));
      return true;
    }
    // Check registered users
    const registered = localStorage.getItem("petzoo-registered-users");
    if (registered) {
      const users = JSON.parse(registered) as (User & { password: string })[];
      const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === _password);
      if (found) {
        const { password: _, ...userObj } = found;
        if (role) userObj.role = role;
        setUser(userObj);
        localStorage.setItem("petzoo-user", JSON.stringify(userObj));
        return true;
      }
    }
    return false;
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 1500));
    const newUser: User & { password: string } = {
      id: `u-${Date.now()}`,
      name: data.name,
      email: data.email,
      role: data.role,
      avatar: getAvatarUrl(data.name),
      phone: data.phone,
      createdAt: new Date().toISOString(),
      isVerified: false,
      password: data.password,
    };
    const existing = JSON.parse(localStorage.getItem("petzoo-registered-users") || "[]");
    existing.push(newUser);
    localStorage.setItem("petzoo-registered-users", JSON.stringify(existing));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("petzoo-user");
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem("petzoo-user", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
