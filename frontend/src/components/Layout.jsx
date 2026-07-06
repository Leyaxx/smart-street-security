import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Bell, X, Search } from "lucide-react";
import Sidebar from "./Sidebar";
import { useSocket } from "../hooks/useSocket";
import { useAuth } from "../context/AuthContext";

export default function Layout() {
  const { lastAlert, clearLastAlert } = useSocket();
  const { user } = useAuth();
  const [alertCount] = useState(3);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "??";

  return (
    <div className="flex min-h-screen" style={{ background: "var(--background)" }}>
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b px-4 backdrop-blur" style={{ background: "oklch(0.16 0.03 260 / 0.8)", borderColor: "var(--border)" }}>
          <div className="hidden items-center gap-2 md:flex">
            <span className="h-1.5 w-1.5 rounded-full relative pulse-dot" style={{ background: "var(--success)", color: "var(--success)" }} />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--muted-foreground)" }}>
              Live - Rue Pr. Kone Tiemoman
            </span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: "var(--muted-foreground)" }} />
              <input
                type="text"
                placeholder="Rechercher camera, plaque, incident..."
                className="h-9 w-72 rounded-md border pl-8 pr-3 text-sm"
                style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--foreground)" }}
              />
            </div>
            <button className="relative inline-flex h-9 w-9 items-center justify-center rounded-md border cursor-pointer" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <Bell className="h-4 w-4" />
              {alertCount > 0 && (
                <span className="absolute -right-1 -top-1 h-4 min-w-4 rounded-full px-1 text-[10px] flex items-center justify-center font-medium" style={{ background: "var(--destructive)", color: "var(--destructive-foreground)" }}>
                  {alertCount}
                </span>
              )}
            </button>
            <div className="flex items-center gap-2 rounded-md border px-2 py-1" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
              <div className="h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-medium" style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>
                {initials}
              </div>
              <div className="hidden flex-col leading-tight md:flex">
                <span className="text-xs font-medium">{user?.name}</span>
                <span className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>{user?.role}</span>
              </div>
            </div>
          </div>
        </header>

        {lastAlert && (
          <div className="mx-4 mt-4 p-3 rounded-lg border flex items-center justify-between" style={{ background: "oklch(0.65 0.22 25 / 0.1)", borderColor: "oklch(0.65 0.22 25 / 0.3)" }}>
            <div className="flex items-center gap-3">
              <Bell className="h-4 w-4" style={{ color: "var(--destructive)" }} />
              <span className="text-sm font-medium">{lastAlert.message}</span>
            </div>
            <button onClick={clearLastAlert} className="cursor-pointer" style={{ color: "var(--destructive)" }}>
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
