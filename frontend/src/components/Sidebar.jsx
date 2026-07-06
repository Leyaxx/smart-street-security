import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Map,
  Video,
  Brain,
  ScanLine,
  AlertTriangle,
  BarChart3,
  Users,
  Shield,
  LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const main = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Cartographie", url: "/carte", icon: Map },
  { title: "Supervision Cameras", url: "/cameras", icon: Video },
  { title: "Reconnaissance IA", url: "/ia", icon: Brain },
  { title: "Reconnaissance Plaques", url: "/plaques", icon: ScanLine },
  { title: "Incidents", url: "/incidents", icon: AlertTriangle },
  { title: "Statistiques", url: "/statistiques", icon: BarChart3 },
];

const admin = [
  { title: "Utilisateurs", url: "/admin/utilisateurs", icon: Users },
  { title: "Cybersecurite", url: "/admin/cybersecurite", icon: Shield },
];

export default function Sidebar() {
  const { logout, user } = useAuth();
  const isAdmin = user?.role === "Administrateur";

  return (
    <aside className="w-64 min-h-screen flex flex-col border-r" style={{ background: "var(--sidebar)", borderColor: "var(--sidebar-border)" }}>
      <div className="border-b px-4 py-4" style={{ borderColor: "var(--sidebar-border)" }}>
        <NavLink to="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg glow-primary" style={{ backgroundImage: "var(--gradient-primary)" }}>
            <Shield className="h-5 w-5" style={{ color: "var(--primary-foreground)" }} />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight" style={{ color: "var(--foreground)" }}>Smart Street</span>
            <span className="text-[10px] uppercase tracking-[0.18em] font-mono" style={{ color: "var(--muted-foreground)" }}>
              Security - CSI
            </span>
          </div>
        </NavLink>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-4">
        <div>
          <p className="px-3 mb-2 text-[10px] font-mono uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>Supervision</p>
          <div className="space-y-0.5">
            {main.map((item) => (
              <NavLink
                key={item.url}
                to={item.url}
                end={item.url === "/"}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm transition"
                style={({ isActive }) => isActive
                  ? { background: "var(--sidebar-accent)", color: "var(--sidebar-accent-foreground)" }
                  : { color: "var(--sidebar-foreground)" }
                }
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </NavLink>
            ))}
          </div>
        </div>

        {isAdmin && (
          <div>
            <p className="px-3 mb-2 text-[10px] font-mono uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>Administration</p>
            <div className="space-y-0.5">
              {admin.map((item) => (
                <NavLink
                  key={item.url}
                  to={item.url}
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm transition"
                  style={({ isActive }) => isActive
                    ? { background: "var(--sidebar-accent)", color: "var(--sidebar-accent-foreground)" }
                    : { color: "var(--sidebar-foreground)" }
                  }
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>

      <div className="border-t p-3" style={{ borderColor: "var(--sidebar-border)" }}>
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition cursor-pointer"
          style={{ color: "var(--sidebar-foreground)" }}
        >
          <LogOut className="h-4 w-4" />
          <span>Deconnexion</span>
        </button>
      </div>
    </aside>
  );
}
