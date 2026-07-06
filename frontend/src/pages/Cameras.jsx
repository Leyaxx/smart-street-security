import { useState } from "react";
import {
  Search,
  Maximize2,
  Eye,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Map,
  Satellite,
  Clock,
  Brain,
  Grid2x2,
  Rows3,
} from "lucide-react";
import { cameras, timeAgo } from "../data/mockData";
import PageHeader, { StatusDot } from "../components/PageHeader";

export default function Cameras() {
  const [selected, setSelected] = useState(cameras[0]);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("detail"); // "detail" or "grid"
  const [selectedCameras, setSelectedCameras] = useState([cameras[0], cameras[1], cameras[2], cameras[3]]);

  const onlineCount = cameras.filter((c) => c.status === "online").length;
  const offlineCount = cameras.filter((c) => c.status === "offline").length;
  const alertCount = cameras.filter((c) => c.status === "alert").length;

  const filteredCameras = cameras.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.ip.includes(search)
  );

  const statusLabel = (status) => {
    if (status === "online") return "En ligne";
    if (status === "offline") return "Hors ligne";
    if (status === "alert") return "Alerte";
    return status;
  };

  const statusBadgeStyle = (status) => {
    if (status === "online")
      return { color: "var(--success)", borderColor: "var(--success)" };
    if (status === "offline")
      return { color: "var(--destructive)", borderColor: "var(--destructive)" };
    if (status === "alert")
      return { color: "var(--warning)", borderColor: "var(--warning)" };
    return { color: "var(--muted-foreground)", borderColor: "var(--border)" };
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Supervision des cameras"
        subtitle={`${onlineCount} en ligne - ${offlineCount} hors ligne - ${alertCount} en alerte`}
        actions={
          <div className="flex items-center gap-1 border rounded-lg p-1" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
            <button
              onClick={() => setViewMode("detail")}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer"
              style={
                viewMode === "detail"
                  ? { background: "var(--primary)", color: "#fff" }
                  : { color: "var(--muted-foreground)" }
              }
            >
              <Rows3 size={14} />
              Detail
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer"
              style={
                viewMode === "grid"
                  ? { background: "var(--primary)", color: "#fff" }
                  : { color: "var(--muted-foreground)" }
              }
            >
              <Grid2x2 size={14} />
              Grille 4
            </button>
          </div>
        }
      />

      <div className="flex gap-6" style={{ minHeight: 0 }}>
        {/* Left panel - Camera list */}
        <div
          className="rounded-xl p-3 flex-shrink-0 border"
          style={{ width: 320, background: "var(--card)", borderColor: "var(--border)" }}
        >
          {/* Search */}
          <div className="relative mb-3">
            <Search
              size={14}
              className="absolute left-2.5 top-1/2 -translate-y-1/2"
              style={{ color: "var(--muted-foreground)" }}
            />
            <input
              type="text"
              placeholder="Rechercher une camera..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-colors"
              style={{ background: "var(--input)", borderColor: "var(--border)", color: "var(--foreground)" }}
            />
          </div>

          {/* Camera list */}
          <div className="space-y-1 max-h-[640px] overflow-y-auto pr-1">
            {filteredCameras.map((cam) => (
              <button
                key={cam.id}
                onClick={() => {
                  if (viewMode === "detail") {
                    setSelected(cam);
                  } else {
                    // Toggle camera in grid selection
                    const isSelected = selectedCameras.some(c => c.id === cam.id);
                    if (isSelected) {
                      if (selectedCameras.length > 1) {
                        setSelectedCameras(selectedCameras.filter(c => c.id !== cam.id));
                      }
                    } else {
                      if (selectedCameras.length < 4) {
                        setSelectedCameras([...selectedCameras, cam]);
                      } else {
                        setSelectedCameras([...selectedCameras.slice(1), cam]);
                      }
                    }
                  }
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg border transition-all cursor-pointer ${
                  (viewMode === "detail" && selected?.id === cam.id) ||
                  (viewMode === "grid" && selectedCameras.some(c => c.id === cam.id))
                    ? ""
                    : "border-transparent hover:bg-[oklch(0.22_0.04_260)]"
                }`}
                style={
                  (viewMode === "detail" && selected?.id === cam.id) ||
                  (viewMode === "grid" && selectedCameras.some(c => c.id === cam.id))
                    ? { background: "oklch(0.68 0.18 245 / 0.1)", borderColor: "oklch(0.68 0.18 245 / 0.5)" }
                    : { background: "transparent" }
                }
              >
                <div className="flex items-center gap-2">
                  <StatusDot status={cam.status} />
                  <span className="text-sm font-medium truncate">
                    {cam.name}
                  </span>
                </div>
                <div className="mt-0.5 ml-4 font-mono text-[10px]" style={{ color: "var(--muted-foreground)" }}>
                  ID:{cam.id} | {cam.ip}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right panel - Detail view or Grid view */}
        <div className="flex-1 min-w-0 space-y-5">
          {viewMode === "detail" && selected && (
            <>
              {/* Camera detail card */}
              <div
                className="rounded-xl border overflow-hidden"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}
              >
                {/* Header */}
                <div
                  className="px-5 py-4 border-b flex items-center justify-between"
                  style={{ borderColor: "var(--border)" }}
                >
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wide" style={{ color: "var(--muted-foreground)" }}>
                      CAM-{String(selected.id).padStart(3, "0")}
                    </p>
                    <h3 className="text-lg font-semibold">
                      {selected.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium"
                      style={statusBadgeStyle(selected.status)}
                    >
                      <StatusDot status={selected.status} />
                      {statusLabel(selected.status)}
                    </span>
                    <button
                      className="p-2 rounded-lg hover:bg-[oklch(0.22_0.04_260)] transition-colors cursor-pointer"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      <Maximize2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Video viewport */}
                <div
                  className="relative aspect-video rounded-lg border m-4 overflow-hidden"
                  style={{ background: "oklch(0.08 0.02 260)", borderColor: "var(--border)" }}
                >
                  {/* Grid background */}
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(148,163,184,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.3) 1px, transparent 1px)",
                      backgroundSize: "40px 40px",
                    }}
                  />

                  {/* Center icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Eye size={64} style={{ color: "oklch(0.68 0.18 245 / 0.4)" }} />
                  </div>

                  {/* Top-left overlay */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 bg-black/70 text-white text-xs px-2 py-1 rounded font-mono">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                      LIVE - 1080p
                    </span>
                  </div>

                  {/* Top-right overlay */}
                  <div className="absolute top-3 right-3">
                    <span className="bg-black/70 text-white text-xs px-2 py-1 rounded font-mono">
                      {new Date().toLocaleTimeString("fr-FR")}
                    </span>
                  </div>

                  {/* Bottom overlay */}
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-black/70 text-white text-[11px] px-2 py-1 rounded font-mono">
                      {selected.ip} | {selected.orientation} deg | {selected.lat.toFixed(4)},{" "}
                      {selected.lng.toFixed(4)}
                    </span>
                  </div>
                </div>

                {/* PTZ Controls */}
                <div className="px-5 pb-5 grid grid-cols-2 gap-6">
                  {/* Left: PTZ */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "var(--muted-foreground)" }}>
                      Controle PTZ
                    </p>
                    {/* Direction grid */}
                    <div className="grid grid-cols-3 gap-1.5 w-fit mb-3">
                      <div />
                      <button
                        className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[oklch(0.22_0.04_260)] transition-colors cursor-pointer"
                        style={{ background: "var(--input)", color: "var(--muted-foreground)" }}
                      >
                        <ChevronUp size={16} />
                      </button>
                      <div />
                      <button
                        className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[oklch(0.22_0.04_260)] transition-colors cursor-pointer"
                        style={{ background: "var(--input)", color: "var(--muted-foreground)" }}
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <div
                        className="w-9 h-9 flex items-center justify-center rounded-lg"
                        style={{ background: "var(--border)" }}
                      >
                        <span className="w-2 h-2 rounded-full" style={{ background: "var(--muted-foreground)" }} />
                      </div>
                      <button
                        className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[oklch(0.22_0.04_260)] transition-colors cursor-pointer"
                        style={{ background: "var(--input)", color: "var(--muted-foreground)" }}
                      >
                        <ChevronRight size={16} />
                      </button>
                      <div />
                      <button
                        className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[oklch(0.22_0.04_260)] transition-colors cursor-pointer"
                        style={{ background: "var(--input)", color: "var(--muted-foreground)" }}
                      >
                        <ChevronDown size={16} />
                      </button>
                      <div />
                    </div>
                    {/* Zoom buttons */}
                    <div className="flex gap-2">
                      <button
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-[oklch(0.22_0.04_260)] text-xs font-medium transition-colors cursor-pointer"
                        style={{ background: "var(--input)", color: "var(--muted-foreground)" }}
                      >
                        <ZoomIn size={14} />
                        Zoom +
                      </button>
                      <button
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-[oklch(0.22_0.04_260)] text-xs font-medium transition-colors cursor-pointer"
                        style={{ background: "var(--input)", color: "var(--muted-foreground)" }}
                      >
                        <ZoomOut size={14} />
                        Zoom -
                      </button>
                    </div>
                  </div>

                  {/* Right: Alternative views */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "var(--muted-foreground)" }}>
                      Vues alternatives
                    </p>
                    <div className="space-y-2">
                      <button
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border text-sm hover:bg-[oklch(0.22_0.04_260)] transition-colors cursor-pointer"
                        style={{ background: "var(--input)", borderColor: "var(--border)", color: "var(--foreground)" }}
                      >
                        <Map size={14} style={{ color: "var(--primary)" }} />
                        Google Street View
                      </button>
                      <button
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border text-sm hover:bg-[oklch(0.22_0.04_260)] transition-colors cursor-pointer"
                        style={{ background: "var(--input)", borderColor: "var(--border)", color: "var(--foreground)" }}
                      >
                        <Satellite size={14} style={{ color: "var(--primary)" }} />
                        Vue satellite
                      </button>
                      <button
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border text-sm hover:bg-[oklch(0.22_0.04_260)] transition-colors cursor-pointer"
                        style={{ background: "var(--input)", borderColor: "var(--border)", color: "var(--foreground)" }}
                      >
                        <Clock size={14} style={{ color: "var(--primary)" }} />
                        Historique
                      </button>
                      <button
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border text-sm hover:bg-[oklch(0.22_0.04_260)] transition-colors cursor-pointer"
                        style={{ background: "var(--input)", borderColor: "var(--border)", color: "var(--foreground)" }}
                      >
                        <Brain size={14} style={{ color: "var(--primary)" }} />
                        Evenements IA
                      </button>
                    </div>
                    <p className="mt-3 text-[10px] font-mono" style={{ color: "var(--muted-foreground)" }}>
                      Derniere communication: {timeAgo(selected.lastSeen)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Mini camera grid */}
              <div className="grid grid-cols-4 gap-3">
                {cameras.slice(0, 4).map((cam) => (
                  <div
                    key={cam.id}
                    onClick={() => setSelected(cam)}
                    className="relative aspect-video rounded-lg border overflow-hidden cursor-pointer hover:border-[oklch(0.68_0.18_245)] transition-colors group"
                    style={{ background: "oklch(0.08 0.02 260)", borderColor: "var(--border)" }}
                  >
                    {/* Grid bg */}
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(148,163,184,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.3) 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                      }}
                    />
                    {/* LIVE badge */}
                    <div className="absolute top-1.5 left-1.5">
                      <span className="inline-flex items-center gap-1 bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                        LIVE
                      </span>
                    </div>
                    {/* Camera ID */}
                    <div className="absolute bottom-1.5 left-1.5">
                      <span className="bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded font-mono">
                        {cam.name}
                      </span>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors" />
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Grid view - 4 cameras side by side */}
          {viewMode === "grid" && (
            <div className="grid grid-cols-2 gap-4">
              {selectedCameras.map((cam) => (
                <div
                  key={cam.id}
                  className="rounded-xl border overflow-hidden"
                  style={{ background: "var(--card)", borderColor: "var(--border)" }}
                >
                  {/* Header */}
                  <div
                    className="px-4 py-3 border-b flex items-center justify-between"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <div className="flex items-center gap-2">
                      <StatusDot status={cam.status} />
                      <p className="text-sm font-semibold truncate">{cam.name}</p>
                    </div>
                    <button
                      className="p-1.5 rounded-lg hover:bg-[oklch(0.22_0.04_260)] transition-colors cursor-pointer"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      <Maximize2 size={14} />
                    </button>
                  </div>

                  {/* Video viewport */}
                  <div
                    className="relative aspect-video overflow-hidden"
                    style={{ background: "oklch(0.08 0.02 260)" }}
                  >
                    {/* Grid background */}
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(148,163,184,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.3) 1px, transparent 1px)",
                        backgroundSize: "30px 30px",
                      }}
                    />

                    {/* Center icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Eye size={48} style={{ color: "oklch(0.68 0.18 245 / 0.4)" }} />
                    </div>

                    {/* Top-left overlay */}
                    <div className="absolute top-2 left-2">
                      <span className="inline-flex items-center gap-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                        LIVE
                      </span>
                    </div>

                    {/* Bottom overlay */}
                    <div className="absolute bottom-2 left-2">
                      <span className="bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded font-mono">
                        {cam.ip}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
