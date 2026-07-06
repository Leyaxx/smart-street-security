import { useState } from "react";
import { ScanLine, Search, Car, AlertTriangle } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { plates, wantedPlates, timeAgo } from "../data/mockData";

export default function Plaques() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPlates = plates.filter(
    (p) =>
      p.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.cameraName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.vehicleType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const todayCount = plates.length;
  const alertCount = plates.filter((p) => p.flagged).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reconnaissance des plaques (LPR)"
        subtitle={`${todayCount} plaques detectees aujourd'hui - ${alertCount} alertes`}
        actions={
          <span
            className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full"
            style={{ border: "1px solid var(--info)", color: "var(--info)" }}
          >
            <ScanLine size={14} />
            Precision OCR 96.4%
          </span>
        }
      />

      {/* Two-column grid */}
      <div className="grid gap-6" style={{ gridTemplateColumns: "1fr 340px" }}>
        {/* Left: Table card */}
        <div className="rounded-xl overflow-hidden border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          {/* Card Header */}
          <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: "var(--border)" }}>
            <h3 className="text-sm font-semibold">Detections recentes</h3>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--muted-foreground)" }} />
              <input
                type="text"
                placeholder="Rechercher une plaque..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-9 pr-3 py-1.5 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                style={{ background: "var(--input)", borderColor: "var(--border)", color: "var(--foreground)", border: "1px solid var(--border)" }}
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left" style={{ background: "oklch(0.24 0.035 260)", borderColor: "var(--border)" }}>
                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide" style={{ color: "var(--muted-foreground)" }}>Plaque</th>
                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide" style={{ color: "var(--muted-foreground)" }}>Type</th>
                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide" style={{ color: "var(--muted-foreground)" }}>Camera</th>
                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide" style={{ color: "var(--muted-foreground)" }}>Date</th>
                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide" style={{ color: "var(--muted-foreground)" }}>Etat</th>
                </tr>
              </thead>
              <tbody>
                {filteredPlates.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b"
                    style={{
                      borderColor: "var(--border)",
                      background: p.flagged ? "oklch(0.55 0.2 25 / 0.08)" : undefined,
                    }}
                  >
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 border rounded-full px-2.5 py-0.5" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
                        <Car size={13} style={{ color: "var(--muted-foreground)" }} />
                        <span className="font-mono font-semibold tracking-wider text-xs">{p.plate}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{p.vehicleType}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{p.cameraName}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{timeAgo(p.timestamp)}</td>
                    <td className="px-4 py-3">
                      {p.flagged ? (
                        <span
                          className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full"
                          style={{ border: "1px solid var(--destructive)", color: "var(--destructive)" }}
                        >
                          <AlertTriangle size={11} />
                          Recherche
                        </span>
                      ) : (
                        <span
                          className="inline-flex text-[11px] font-medium px-2 py-0.5 rounded-full"
                          style={{ border: "1px solid var(--success)", color: "var(--success)" }}
                        >
                          OK
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Wanted plates card */}
          <div className="rounded-xl overflow-hidden border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: "var(--border)" }}>
              <h3 className="text-sm font-semibold">Vehicules recherches</h3>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ border: "1px solid var(--destructive)", color: "var(--destructive)" }}>
                {wantedPlates.length} actifs
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b" style={{ background: "oklch(0.24 0.035 260)", borderColor: "var(--border)" }}>
                    <th className="px-4 py-2 text-xs font-medium text-left" style={{ color: "var(--muted-foreground)" }}>Plaque</th>
                    <th className="px-4 py-2 text-xs font-medium text-left" style={{ color: "var(--muted-foreground)" }}>Motif</th>
                    <th className="px-4 py-2 text-xs font-medium text-left" style={{ color: "var(--muted-foreground)" }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {wantedPlates.map((wp, idx) => (
                    <tr key={idx} className="border-b" style={{ borderColor: "var(--border)" }}>
                      <td className="px-4 py-2.5">
                        <span className="font-mono font-semibold tracking-wider text-xs px-2 py-0.5 rounded" style={{ background: "oklch(0.55 0.2 25 / 0.1)", color: "var(--destructive)" }}>
                          {wp.plate}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-xs" style={{ color: "var(--muted-foreground)" }}>{wp.reason}</td>
                      <td className="px-4 py-2.5 text-xs font-mono" style={{ color: "var(--muted-foreground)" }}>
                        {new Date(wp.since).toLocaleDateString("fr-FR")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Stats summary */}
          <div className="rounded-xl overflow-hidden border p-5" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <h3 className="text-sm font-semibold mb-4">Resume LPR</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>Plaques scannees aujourd'hui</span>
                <span className="text-sm font-semibold">{todayCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>Vehicules signales detectes</span>
                <span className="text-sm font-semibold" style={{ color: "var(--destructive)" }}>{alertCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>Vehicules recherches actifs</span>
                <span className="text-sm font-semibold" style={{ color: "var(--warning)" }}>{wantedPlates.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>Precision OCR</span>
                <span className="text-sm font-semibold" style={{ color: "var(--success)" }}>96.4%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
