import { useState } from "react";
import { AlertTriangle, MapPin, User, Clock, Plus, Camera, Edit, UserPlus, XCircle } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { incidents, timeAgo } from "../data/mockData";

const severityConfig = {
  low: { label: "Faible", style: { border: "1px solid var(--info)", color: "var(--info)" } },
  medium: { label: "Moyen", style: { border: "1px solid var(--warning)", color: "var(--warning)" } },
  high: { label: "Eleve", style: { border: "1px solid var(--destructive)", color: "var(--destructive)" } },
  critical: { label: "Critique", style: { background: "var(--destructive)", color: "#fff", border: "1px solid var(--destructive)" } },
};

const statusConfig = {
  open: { label: "Ouvert", style: { border: "1px solid var(--info)", color: "var(--info)" } },
  assigned: { label: "Affecte", style: { border: "1px solid var(--warning)", color: "var(--warning)" } },
  in_progress: { label: "En cours", style: { border: "1px solid var(--primary)", color: "var(--primary)" } },
  closed: { label: "Cloture", style: { border: "1px solid var(--success)", color: "var(--success)" } },
};

const tabs = [
  { key: "all", label: "Tous" },
  { key: "in_progress", label: "En cours" },
  { key: "closed", label: "Clotures" },
];

export default function Incidents() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedId, setSelectedId] = useState(incidents[0]?.id || null);

  const filtered = activeTab === "all"
    ? incidents
    : activeTab === "in_progress"
      ? incidents.filter((i) => i.status === "open" || i.status === "assigned" || i.status === "in_progress")
      : incidents.filter((i) => i.status === "closed");

  const selected = incidents.find((i) => i.id === selectedId) || filtered[0];

  const openCount = incidents.filter((i) => i.status !== "closed").length;
  const closedCount = incidents.filter((i) => i.status === "closed").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gestion des incidents"
        subtitle={`${openCount} ouverts - ${closedCount} clotures`}
        actions={
          <button
            className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            style={{ background: "var(--primary)", color: "#fff" }}
          >
            <Plus size={16} />
            Creer un incident
          </button>
        }
      />

      {/* Tab bar */}
      <div className="flex gap-1 rounded-lg border p-1 w-fit" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className="rounded-md px-3 py-1.5 text-xs font-medium transition-colors"
            style={
              activeTab === tab.key
                ? { background: "var(--primary)", color: "#fff" }
                : { color: "var(--muted-foreground)" }
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Two-column grid */}
      <div className="grid gap-6" style={{ gridTemplateColumns: "1fr 400px" }}>
        {/* Left: Table */}
        <div className="rounded-xl overflow-hidden border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <div className="px-5 py-4 border-b" style={{ borderColor: "var(--border)" }}>
            <h3 className="text-sm font-semibold">Liste des incidents</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left" style={{ background: "oklch(0.24 0.035 260)", borderColor: "var(--border)" }}>
                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide" style={{ color: "var(--muted-foreground)" }}>ID</th>
                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide" style={{ color: "var(--muted-foreground)" }}>Titre</th>
                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide" style={{ color: "var(--muted-foreground)" }}>Lieu</th>
                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide" style={{ color: "var(--muted-foreground)" }}>Severite</th>
                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide" style={{ color: "var(--muted-foreground)" }}>Statut</th>
                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide" style={{ color: "var(--muted-foreground)" }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((inc) => (
                  <tr
                    key={inc.id}
                    onClick={() => setSelectedId(inc.id)}
                    className="border-b cursor-pointer transition-colors"
                    style={{
                      borderColor: "var(--border)",
                      background: selectedId === inc.id ? "oklch(0.68 0.18 245 / 0.1)" : undefined,
                    }}
                    onMouseEnter={(e) => { if (selectedId !== inc.id) e.currentTarget.style.background = "var(--accent)"; }}
                    onMouseLeave={(e) => { if (selectedId !== inc.id) e.currentTarget.style.background = ""; }}
                  >
                    <td className="px-4 py-3 font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>INC-{String(inc.id).padStart(3, "0")}</td>
                    <td className="px-4 py-3 font-medium max-w-[200px] truncate">{inc.title}</td>
                    <td className="px-4 py-3 max-w-[140px] truncate" style={{ color: "var(--muted-foreground)" }}>{inc.location}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex text-[11px] font-medium px-2 py-0.5 rounded-full" style={severityConfig[inc.severity].style}>
                        {severityConfig[inc.severity].label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex text-[11px] font-medium px-2 py-0.5 rounded-full" style={statusConfig[inc.status].style}>
                        {statusConfig[inc.status].label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{timeAgo(inc.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Detail panel */}
        {selected && (
          <div className="rounded-xl p-5 h-fit border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            {/* Header badges */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "var(--accent)", color: "var(--muted-foreground)" }}>
                INC-{String(selected.id).padStart(3, "0")}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full" style={severityConfig[selected.severity].style}>
                <AlertTriangle size={12} />
                {severityConfig[selected.severity].label}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold">{selected.title}</h3>
            <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{selected.type}</p>

            {/* Description */}
            <div className="mt-4 p-3 border rounded-lg" style={{ borderColor: "var(--border)", background: "var(--accent)" }}>
              <p className="text-sm leading-relaxed">{selected.description}</p>
            </div>

            {/* Info list */}
            <div className="mt-5 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <MapPin size={15} style={{ color: "var(--muted-foreground)" }} />
                <span>{selected.location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <User size={15} style={{ color: "var(--muted-foreground)" }} />
                <span>{selected.assignee}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock size={15} style={{ color: "var(--muted-foreground)" }} />
                <span style={{ color: "var(--muted-foreground)" }}>Cree: {new Date(selected.createdAt).toLocaleString("fr-FR")}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock size={15} style={{ color: "var(--muted-foreground)" }} />
                <span style={{ color: "var(--muted-foreground)" }}>Mis a jour: {new Date(selected.updatedAt).toLocaleString("fr-FR")}</span>
              </div>
            </div>

            {/* Timeline */}
            <div className="mt-5 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
              <p className="text-xs font-medium uppercase tracking-wide mb-3" style={{ color: "var(--muted-foreground)" }}>Chronologie</p>
              <div className="space-y-0">
                {[
                  { label: "Incident detecte par IA", time: selected.createdAt },
                  { label: "Alerte envoyee a l'operateur", time: selected.createdAt },
                  { label: "Prise en charge", time: selected.updatedAt },
                ].map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-2.5 h-2.5 rounded-full mt-1.5" style={{ background: "var(--primary)" }} />
                      {idx < 2 && <div className="w-0.5 h-6" style={{ background: "oklch(0.68 0.18 245 / 0.3)" }} />}
                    </div>
                    <div className="pb-3">
                      <p className="text-sm">{step.label}</p>
                      <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{timeAgo(step.time)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-5 pt-4 border-t grid grid-cols-2 gap-2" style={{ borderColor: "var(--border)" }}>
              <button className="flex items-center justify-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border transition-colors" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>
                <UserPlus size={14} />
                Affecter
              </button>
              <button className="flex items-center justify-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border transition-colors" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>
                <Edit size={14} />
                Modifier
              </button>
              <button className="flex items-center justify-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border transition-colors" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>
                <Camera size={14} />
                Voir cameras
              </button>
              <button className="flex items-center justify-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border transition-colors" style={{ borderColor: "var(--border)", color: "var(--destructive)" }}>
                <XCircle size={14} />
                Cloturer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
