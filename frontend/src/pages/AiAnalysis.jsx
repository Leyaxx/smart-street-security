import { useState } from "react";
import { Brain, AlertTriangle, X, FileText, Check } from "lucide-react";
import { aiEvents, timeAgo } from "../data/mockData";
import PageHeader from "../components/PageHeader";

const categories = [
  "Tous",
  "Accident",
  "Vol",
  "Bagarre",
  "Intrusion",
  "Incendie",
];

const statusConfig = {
  new: { label: "Nouveau", color: "var(--warning)", borderColor: "var(--warning)" },
  incident_created: { label: "Incident", color: "var(--destructive)", borderColor: "var(--destructive)" },
  ignored: { label: "Ignore", color: "var(--muted-foreground)", borderColor: "var(--border)" },
  acknowledged: { label: "Acquitte", color: "var(--success)", borderColor: "var(--success)" },
};

export default function AiAnalysis() {
  const [filter, setFilter] = useState("Tous");

  // Keep only one event per category
  const uniqueEvents = [];
  const seenTypes = new Set();
  for (const event of aiEvents) {
    if (!seenTypes.has(event.type)) {
      uniqueEvents.push(event);
      seenTypes.add(event.type);
    }
  }

  const filteredEvents = filter === "Tous"
    ? uniqueEvents
    : uniqueEvents.filter((e) => e.type === filter);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reconnaissance d'evenements IA"
        subtitle="Detections temps reel"
        actions={
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border"
            style={{ background: "oklch(0.68 0.18 245 / 0.1)", borderColor: "oklch(0.68 0.18 245 / 0.5)" }}
          >
            <Brain size={14} style={{ color: "var(--primary)" }} />
            <span className="text-xs font-medium" style={{ color: "var(--primary)" }}>Modele YOLOv8 - v3.2</span>
          </div>
        }
      />

      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className="rounded-full px-3 py-1 text-xs border cursor-pointer transition-colors"
            style={
              filter === cat
                ? { background: "oklch(0.68 0.18 245 / 0.1)", borderColor: "oklch(0.68 0.18 245 / 0.5)", color: "var(--primary)" }
                : { background: "transparent", borderColor: "var(--border)", color: "var(--muted-foreground)" }
            }
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents.map((event) => {
          const confidencePercent = Math.round(event.confidence * 100);
          const status = statusConfig[event.status] || statusConfig.new;

          return (
            <div
              key={event.id}
              className="rounded-xl border overflow-hidden transition-shadow hover:shadow-[0_0_20px_oklch(0.68_0.18_245/0.15)]"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}
            >
              <div className="relative aspect-video">
                <img
                  src={event.thumbnail}
                  alt={event.type}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/30" />

                <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/60 rounded px-1.5 py-0.5">
                  <AlertTriangle size={12} style={{ color: "var(--warning)" }} />
                  <span className="text-xs font-medium" style={{ color: "var(--warning)" }}>{event.type}</span>
                </div>

                <div className="absolute top-2 right-2 bg-black/60 rounded px-1.5 py-0.5">
                  <span className="text-xs font-medium" style={{ color: "var(--success)" }}>{confidencePercent}%</span>
                </div>

                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                  <span className="text-xs text-white/80">{event.cameraName}</span>
                  <span className="text-xs text-white/80">EVT-{String(event.id).padStart(4, "0")}</span>
                  <span className="text-xs text-white/80">{timeAgo(event.timestamp)}</span>
                </div>

                <div
                  className="absolute border-2 border-amber-400 rounded"
                  style={{
                    left: "20%",
                    top: "30%",
                    height: "40%",
                    width: "50%",
                    boxShadow: "0 0 8px 2px rgba(250, 204, 21, 0.4)",
                  }}
                >
                  <span className="absolute -top-5 left-0 text-[10px] font-medium text-amber-300 bg-black/60 px-1 rounded">
                    {event.type} - {confidencePercent}%
                  </span>
                </div>
              </div>

              <div className="p-3 flex items-center justify-between">
                <span
                  className="rounded-full border px-2 py-0.5 text-[10px] font-medium"
                  style={{ color: status.color, borderColor: status.borderColor }}
                >
                  {status.label}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    className="h-7 px-2 flex items-center gap-1 text-xs border rounded hover:bg-[oklch(0.22_0.04_260)] transition-colors cursor-pointer"
                    style={{ background: "var(--input)", borderColor: "var(--border)", color: "var(--muted-foreground)" }}
                  >
                    <FileText size={12} />
                    <span>Details</span>
                  </button>
                  <button
                    className="h-7 px-2 flex items-center gap-1 text-xs border rounded hover:bg-[oklch(0.22_0.04_260)] transition-colors cursor-pointer"
                    style={{ background: "var(--input)", borderColor: "var(--destructive)", color: "var(--destructive)" }}
                  >
                    <AlertTriangle size={12} />
                    <span>Incident</span>
                  </button>
                  <button
                    className="h-7 w-7 flex items-center justify-center border rounded hover:bg-[oklch(0.22_0.04_260)] transition-colors cursor-pointer"
                    style={{ background: "var(--input)", borderColor: "var(--success)", color: "var(--success)" }}
                  >
                    <Check size={12} />
                  </button>
                  <button
                    className="h-7 w-7 flex items-center justify-center border rounded hover:bg-[oklch(0.22_0.04_260)] transition-colors cursor-pointer"
                    style={{ background: "var(--input)", borderColor: "var(--border)", color: "var(--muted-foreground)" }}
                  >
                    <X size={12} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
