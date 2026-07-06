import { useState } from "react";
import {
  MapPin, Clock, User, Phone, ArrowRight, CheckCircle,
  Settings, XCircle, MessageSquareWarning
} from "lucide-react";
import { citizenReports, timeAgo } from "../data/mockData";
import PageHeader, { StatusDot } from "../components/PageHeader";

const statusConfig = {
  new: { label: "Nouveau", style: { border: "1px solid var(--warning)", color: "var(--warning)" } },
  processing: { label: "En cours", style: { border: "1px solid var(--info)", color: "var(--info)" } },
  transferred: { label: "Transfere", style: { border: "1px solid var(--primary)", color: "var(--primary)" } },
  closed: { label: "Cloture", style: { border: "1px solid var(--border)", color: "var(--muted-foreground)" } },
};

export default function Signalements() {
  const [selected, setSelected] = useState(citizenReports[0]);

  const total = citizenReports.length;

  return (
    <div className="space-y-0">
      <PageHeader
        title="Signalements citoyens"
        subtitle={`${total} signalements - participation citoyenne en temps reel`}
      />

      <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 420px" }}>
        {/* Left: Report cards list */}
        <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto pr-1">
          {citizenReports.map((report) => {
            const isSelected = selected && selected.id === report.id;
            const st = statusConfig[report.status] || statusConfig.new;
            return (
              <div
                key={report.id}
                onClick={() => setSelected(report)}
                className="rounded-xl border p-4 cursor-pointer transition-all"
                style={{
                  background: "var(--card)",
                  borderColor: isSelected ? "var(--primary)" : "var(--border)",
                  boxShadow: isSelected ? "0 0 0 1px var(--primary)" : undefined,
                }}
              >
                <div className="flex gap-4">
                  {/* Left thumbnail */}
                  <div className="w-[80px] h-[80px] flex-shrink-0 rounded-lg overflow-hidden border flex items-center justify-center" style={{ background: "var(--accent)", borderColor: "var(--border)" }}>
                    {report.photo ? (
                      <img
                        src={report.photo}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <MapPin size={18} style={{ color: "var(--muted-foreground)" }} />
                    )}
                  </div>

                  {/* Right content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono" style={{ color: "var(--muted-foreground)" }}>
                        SIG-{String(report.id).padStart(3, "0")}
                      </span>
                      <span className="text-[10px] font-mono" style={{ color: "var(--muted-foreground)" }}>
                        {report.category}
                      </span>
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                        style={st.style}
                      >
                        {st.label}
                      </span>
                    </div>
                    <p className="text-sm font-semibold mb-1">
                      {report.citizen}
                    </p>
                    <p className="text-xs line-clamp-2 mb-2" style={{ color: "var(--muted-foreground)" }}>
                      {report.description}
                    </p>
                    <div className="flex items-center gap-4 text-[11px]" style={{ color: "var(--muted-foreground)" }}>
                      <span className="flex items-center gap-1">
                        <MapPin size={10} />
                        <span className="truncate max-w-[180px]">{report.address}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={10} />
                        {timeAgo(report.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Detail panel */}
        {selected && (
          <div className="rounded-xl p-5 border h-fit sticky top-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ background: "var(--accent)", color: "var(--muted-foreground)" }}>
                SIG-{String(selected.id).padStart(3, "0")}
              </span>
              <span
                className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                style={(statusConfig[selected.status] || statusConfig.new).style}
              >
                {(statusConfig[selected.status] || statusConfig.new).label}
              </span>
            </div>

            {/* Photo */}
            {selected.photo && (
              <div className="aspect-video rounded-lg overflow-hidden border mb-4" style={{ background: "var(--accent)", borderColor: "var(--border)" }}>
                <img
                  src={selected.photo}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Category + description */}
            <p className="text-[10px] font-mono uppercase tracking-wider mb-1" style={{ color: "var(--primary)" }}>
              {selected.category}
            </p>
            <p className="text-sm mb-4">{selected.description}</p>

            {/* Info rows */}
            <div className="space-y-3 mb-5">
              <div className="flex items-center gap-3 text-xs">
                <User size={13} style={{ color: "var(--muted-foreground)" }} />
                <span>{selected.citizen}</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <Phone size={13} style={{ color: "var(--muted-foreground)" }} />
                <span className="font-mono">{selected.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <MapPin size={13} style={{ color: "var(--muted-foreground)" }} />
                <span>{selected.address}</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <MapPin size={13} style={{ color: "var(--muted-foreground)" }} />
                <span className="font-mono" style={{ color: "var(--muted-foreground)" }}>
                  {selected.lat.toFixed(4)}, {selected.lng.toFixed(4)}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <Clock size={13} style={{ color: "var(--muted-foreground)" }} />
                <span>{timeAgo(selected.createdAt)}</span>
              </div>
            </div>

            {/* Action buttons 2x2 */}
            <div className="grid grid-cols-2 gap-2">
              <button className="text-xs px-3 py-2.5 rounded-lg font-medium cursor-pointer transition-colors flex items-center justify-center gap-1.5" style={{ background: "oklch(0.68 0.18 245 / 0.1)", color: "var(--primary)", border: "1px solid var(--primary)" }}>
                <Settings size={12} />
                Traiter
              </button>
              <button className="text-xs px-3 py-2.5 rounded-lg font-medium cursor-pointer transition-colors flex items-center justify-center gap-1.5 border" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>
                <User size={12} />
                Affecter
              </button>
              <button className="text-xs px-3 py-2.5 rounded-lg font-medium cursor-pointer transition-colors flex items-center justify-center gap-1.5" style={{ border: "1px solid var(--warning)", color: "var(--warning)" }}>
                <ArrowRight size={12} />
                Incident
              </button>
              <button className="text-xs px-3 py-2.5 rounded-lg font-medium cursor-pointer transition-colors flex items-center justify-center gap-1.5" style={{ border: "1px solid var(--destructive)", color: "var(--destructive)" }}>
                <XCircle size={12} />
                Cloturer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
