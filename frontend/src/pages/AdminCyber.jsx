import { ShieldAlert, Lock, Activity, Wifi, Server } from "lucide-react";
import PageHeader, { StatusDot } from "../components/PageHeader";
import { loginHistory, timeAgo } from "../data/mockData";

const alerts = [
  { id: "SEC-91", level: "warning", msg: "Pic de tentatives de connexion sur le pare-feu (port 22)", time: "il y a 14 min" },
  { id: "SEC-90", level: "info", msg: "Certificat TLS renouvele automatiquement", time: "il y a 2 h" },
  { id: "SEC-89", level: "warning", msg: "Espace disque serveur stockage a 88%", time: "il y a 4 h" },
  { id: "SEC-88", level: "info", msg: "Sauvegarde chiffree verifiee", time: "il y a 6 h" },
  { id: "SEC-87", level: "warning", msg: "Tentative d'acces non autorise depuis VLAN 10", time: "il y a 8 h" },
];

const kpis = [
  { label: "VLANs actifs", value: "3/3", icon: Wifi, tone: "success" },
  { label: "Alertes ouvertes", value: "3", icon: ShieldAlert, tone: "warning" },
  { label: "Derniere sauvegarde", value: "02:14", icon: Server, tone: "info" },
  { label: "Posture globale", value: "Bonne", icon: Activity, tone: "success" },
];

const toneStyles = {
  success: { color: "var(--success)", background: "oklch(0.72 0.19 155 / 0.1)" },
  warning: { color: "var(--warning)", background: "oklch(0.75 0.15 85 / 0.1)" },
  info: { color: "var(--info)", background: "oklch(0.68 0.18 245 / 0.1)" },
};

export default function AdminCyber() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Cybersecurite"
        subtitle="Surveillance de la securite reseau et des acces"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((s) => (
          <div key={s.label} className="rounded-xl border p-5 flex items-center gap-3" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={toneStyles[s.tone]}>
              <s.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>{s.label}</p>
              <p className="text-2xl font-semibold">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Security alerts */}
        <div className="rounded-xl border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <div className="px-5 py-4 border-b flex items-center gap-2" style={{ borderColor: "var(--border)" }}>
            <ShieldAlert className="h-4 w-4" style={{ color: "var(--warning)" }} />
            <h3 className="text-base font-semibold">Alertes de securite</h3>
          </div>
          <div className="p-5 space-y-2">
            {alerts.map((a) => (
              <div key={a.id} className="rounded-lg border p-3" style={{ borderColor: "var(--border)", background: "var(--accent)" }}>
                <div className="flex items-center justify-between">
                  <span
                    className="inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium"
                    style={a.level === "warning" ? { border: "1px solid var(--warning)", color: "var(--warning)" } : { border: "1px solid var(--info)", color: "var(--info)" }}
                  >
                    {a.id}
                  </span>
                  <span className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>{a.time}</span>
                </div>
                <p className="mt-2 text-xs" style={{ color: "var(--muted-foreground)" }}>{a.msg}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Login journal */}
        <div className="rounded-xl border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <div className="px-5 py-4 border-b flex items-center gap-2" style={{ borderColor: "var(--border)" }}>
            <Lock className="h-4 w-4" style={{ color: "var(--muted-foreground)" }} />
            <h3 className="text-base font-semibold">Journal des connexions</h3>
          </div>
          <div className="p-5 space-y-2">
            {loginHistory.map((l) => (
              <div key={l.id} className="flex items-center justify-between rounded-lg border p-2.5 text-xs" style={{ borderColor: "var(--border)", background: "var(--accent)" }}>
                <div>
                  <p className="font-medium">{l.user}</p>
                  <p className="font-mono text-[10px]" style={{ color: "var(--muted-foreground)" }}>{l.ip} - {timeAgo(l.date)}</p>
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
