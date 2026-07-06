import { Plus, Mail, Shield } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { users, loginHistory, timeAgo } from "../data/mockData";

const roleStyle = {
  Administrateur: { border: "1px solid oklch(0.55 0.2 25 / 0.4)", color: "var(--destructive)" },
  "Responsable securite": { border: "1px solid oklch(0.75 0.15 85 / 0.4)", color: "var(--warning)" },
  Operateur: { border: "1px solid oklch(0.68 0.18 245 / 0.4)", color: "var(--info)" },
};

export default function AdminUsers() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Gestion des utilisateurs"
        subtitle="Comptes, roles et historique des connexions"
        actions={
          <button
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors cursor-pointer"
            style={{ background: "var(--primary)", color: "#fff" }}
          >
            <Plus className="h-4 w-4" />
            Nouvel utilisateur
          </button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <div className="rounded-xl border overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b" style={{ background: "oklch(0.24 0.035 260)", borderColor: "var(--border)" }}>
                <th className="px-4 py-3 text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>Utilisateur</th>
                <th className="px-4 py-3 text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>Role</th>
                <th className="px-4 py-3 text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>Statut</th>
                <th className="px-4 py-3 text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>Derniere connexion</th>
                <th className="px-4 py-3 text-xs font-medium text-right" style={{ color: "var(--muted-foreground)" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr
                  key={u.id}
                  className="border-b transition-colors"
                  style={{ borderColor: "var(--border)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "var(--accent)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = ""; }}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full flex items-center justify-center text-[11px] font-medium" style={{ background: "var(--primary)", color: "#fff" }}>
                        {u.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{u.name}</p>
                        <p className="font-mono text-[11px]" style={{ color: "var(--muted-foreground)" }}>{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium" style={roleStyle[u.role] || { border: "1px solid var(--border)", color: "var(--muted-foreground)" }}>
                      <Shield className="h-3 w-3" />{u.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium"
                      style={u.status === "active" ? { border: "1px solid var(--success)", color: "var(--success)" } : { border: "1px solid var(--border)", color: "var(--muted-foreground)" }}
                    >
                      {u.status === "active" ? "Actif" : "Inactif"}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-[11px]" style={{ color: "var(--muted-foreground)" }}>{timeAgo(u.lastLogin)}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="p-1.5 rounded cursor-pointer hover:bg-[var(--accent)] transition-colors" style={{ color: "var(--muted-foreground)" }}>
                      <Mail className="h-3.5 w-3.5" />
                    </button>
                    <button className="p-1.5 rounded text-xs cursor-pointer hover:bg-[var(--accent)] transition-colors ml-1" style={{ color: "var(--muted-foreground)" }}>
                      Modifier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-xl border p-5" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <p className="font-mono text-[10px] uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>Historique des connexions</p>
          <div className="mt-3 space-y-2">
            {loginHistory.map((l) => (
              <div key={l.id} className="flex items-center justify-between rounded-md border p-2.5 text-xs" style={{ borderColor: "var(--border)", background: "var(--background)" }}>
                <div>
                  <p className="font-medium">{l.user}</p>
                  <p className="font-mono text-[10px]" style={{ color: "var(--muted-foreground)" }}>{l.ip} · {timeAgo(l.date)}</p>
                </div>
                <span
                  className="inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium"
                  style={l.result === "Succes" ? { border: "1px solid var(--success)", color: "var(--success)" } : { border: "1px solid var(--destructive)", color: "var(--destructive)" }}
                >
                  {l.result}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
