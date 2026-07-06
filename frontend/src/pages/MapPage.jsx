import { useState } from "react";
import {
  Camera, AlertTriangle, Layers, Plus, Minus,
  Video, MapPin, Compass, Globe, History
} from "lucide-react";
import { cameras, incidents, zones } from "../data/mockData";
import PageHeader, { StatusDot } from "../components/PageHeader";

const MAP_BOUNDS = {
  latMin: 5.3465,
  latMax: 5.3500,
  lngMin: -4.0000,
  lngMax: -3.9960,
};

function projectToPercent(lat, lng) {
  const x = ((lng - MAP_BOUNDS.lngMin) / (MAP_BOUNDS.lngMax - MAP_BOUNDS.lngMin)) * 100;
  const y = (1 - (lat - MAP_BOUNDS.latMin) / (MAP_BOUNDS.latMax - MAP_BOUNDS.latMin)) * 100;
  return { x: Math.max(2, Math.min(98, x)), y: Math.max(2, Math.min(98, y)) };
}

const statusColor = {
  online: "#10b981",
  alert: "#f59e0b",
  offline: "#ef4444",
};

const zonePositions = [
  { id: 1, cx: 30, cy: 35, r: 18 },
  { id: 2, cx: 68, cy: 30, r: 16 },
  { id: 3, cx: 50, cy: 60, r: 15 },
  { id: 4, cx: 25, cy: 75, r: 14 },
];

export default function MapPage() {
  const [selectedCamera, setSelectedCamera] = useState(cameras[0]);
  const [layers, setLayers] = useState({
    cameras: true,
    incidents: true,
    zones: true,
  });

  const toggleLayer = (key) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const activeIncidents = incidents.filter((i) => i.status !== "closed");

  return (
    <div className="space-y-0">
      <PageHeader
        title="Cartographie intelligente"
        subtitle="Visualisation geospatiale des cameras, incidents et zones sensibles"
        actions={
          <div className="flex items-center gap-1 border rounded-lg p-1" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
            <Layers size={14} className="ml-2 mr-1" style={{ color: "var(--muted-foreground)" }} />
            {[
              { key: "cameras", label: "Cameras" },
              { key: "incidents", label: "Incidents" },
              { key: "zones", label: "Zones" },
            ].map((l) => (
              <button
                key={l.key}
                onClick={() => toggleLayer(l.key)}
                className="text-xs px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer"
                style={
                  layers[l.key]
                    ? { background: "oklch(0.68 0.18 245 / 0.1)", color: "var(--primary)", border: "1px solid var(--primary)" }
                    : { color: "var(--muted-foreground)" }
                }
              >
                {l.label}
              </button>
            ))}
          </div>
        }
      />

      <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 360px" }}>
        {/* Map card */}
        <div className="rounded-xl h-[640px] overflow-hidden relative border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          {/* Background grid + gradient */}
          <div
            className="absolute inset-0 bg-grid"
            style={{
              backgroundImage:
                "linear-gradient(rgba(148,163,184,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.05) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom right, oklch(0.25 0.04 260 / 0.3), transparent, oklch(0.30 0.04 240 / 0.2))" }} />

          {/* SVG Roads */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M 50,100 Q 200,200 400,180 T 750,300"
              fill="none"
              stroke="var(--border)"
              strokeWidth="2"
              strokeDasharray="8,4"
            />
            <path
              d="M 100,400 Q 300,350 500,420 T 800,380"
              fill="none"
              stroke="var(--border)"
              strokeWidth="2"
              strokeDasharray="8,4"
            />
            <path
              d="M 200,50 Q 250,250 300,450 T 350,600"
              fill="none"
              stroke="var(--border)"
              strokeWidth="1.5"
              strokeDasharray="6,3"
            />
            <path
              d="M 500,80 Q 480,300 520,500 T 550,640"
              fill="none"
              stroke="var(--border)"
              strokeWidth="1.5"
              strokeDasharray="6,3"
            />
          </svg>

          {/* Zones */}
          {layers.zones &&
            zones.map((zone) => {
              const pos = zonePositions.find((z) => z.id === zone.id);
              if (!pos) return null;
              return (
                <div
                  key={zone.id}
                  className="absolute flex flex-col items-center pointer-events-none"
                  style={{
                    left: `${pos.cx}%`,
                    top: `${pos.cy}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <span
                    className="text-[10px] font-mono font-medium mb-1"
                    style={{ color: zone.color }}
                  >
                    {zone.name}
                  </span>
                  <div
                    className="rounded-full border-2 border-dashed opacity-30"
                    style={{
                      width: `${pos.r * 6}px`,
                      height: `${pos.r * 6}px`,
                      borderColor: zone.color,
                      backgroundColor: zone.color + "10",
                    }}
                  />
                </div>
              );
            })}

          {/* Camera dots */}
          {layers.cameras &&
            cameras.map((cam) => {
              const { x, y } = projectToPercent(cam.lat, cam.lng);
              return (
                <button
                  key={cam.id}
                  className="absolute w-3 h-3 rounded-full border-2 cursor-pointer transition-transform hover:scale-150 z-10"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: "translate(-50%, -50%)",
                    backgroundColor: statusColor[cam.status] || "#94a3b8",
                    borderColor: "var(--card)",
                  }}
                  title={cam.name}
                  onClick={() => setSelectedCamera(cam)}
                />
              );
            })}

          {/* Incident markers */}
          {layers.incidents &&
            activeIncidents.map((inc, idx) => {
              const lat = 5.3475 + idx * 0.003;
              const lng = -3.9992 + idx * 0.004;
              const { x, y } = projectToPercent(lat, lng);
              return (
                <div
                  key={inc.id}
                  className="absolute z-10 flex items-center justify-center w-6 h-6 rounded-sm"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: "translate(-50%, -50%)",
                    background: "oklch(0.55 0.2 25 / 0.15)",
                    border: "1px solid var(--destructive)",
                  }}
                  title={inc.title}
                >
                  <AlertTriangle size={12} style={{ color: "var(--destructive)" }} />
                </div>
              );
            })}


          {/* Bottom-left coordinates */}
          <div className="absolute bottom-3 left-3 backdrop-blur border rounded-lg px-3 py-2 text-[10px] font-mono z-20" style={{ background: "var(--popover)", borderColor: "var(--border)", color: "var(--muted-foreground)" }}>
            <span>5.3481 N, -3.9985 W</span>
            <span className="mx-2">|</span>
            <span>Abobo, Abidjan</span>
          </div>

          {/* Top-right zoom buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-1 z-20">
            <button className="w-7 h-7 border rounded-md flex items-center justify-center cursor-pointer" style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--foreground)" }}>
              <Plus size={14} />
            </button>
            <button className="w-7 h-7 border rounded-md flex items-center justify-center cursor-pointer" style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--foreground)" }}>
              <Minus size={14} />
            </button>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Selected camera detail */}
          <div className="rounded-xl p-5 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono uppercase tracking-wide" style={{ color: "var(--muted-foreground)" }}>
                {selectedCamera.name}
              </span>
              <span
                className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                style={
                  selectedCamera.status === "online"
                    ? { border: "1px solid var(--success)", color: "var(--success)" }
                    : selectedCamera.status === "alert"
                    ? { border: "1px solid var(--warning)", color: "var(--warning)" }
                    : { border: "1px solid var(--destructive)", color: "var(--destructive)" }
                }
              >
                {selectedCamera.status}
              </span>
            </div>

            {/* Preview placeholder */}
            <div className="w-full h-28 rounded-lg border flex items-center justify-center mb-4" style={{ background: "var(--accent)", borderColor: "var(--border)" }}>
              <Camera size={20} style={{ color: "var(--muted-foreground)" }} />
            </div>

            <div className="space-y-2 text-xs mb-4">
              <div className="flex justify-between">
                <span style={{ color: "var(--muted-foreground)" }}>GPS</span>
                <span className="font-mono">
                  {selectedCamera.lat.toFixed(4)}, {selectedCamera.lng.toFixed(4)}
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "var(--muted-foreground)" }}>IP</span>
                <span className="font-mono">{selectedCamera.ip}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "var(--muted-foreground)" }}>Orientation</span>
                <span className="font-mono">{selectedCamera.orientation} deg</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "var(--muted-foreground)" }}>Zone</span>
                <span className="font-mono">{selectedCamera.zone}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button className="text-[10px] px-2 py-2 rounded-lg font-medium cursor-pointer flex items-center justify-center gap-1" style={{ background: "oklch(0.68 0.18 245 / 0.1)", color: "var(--primary)", border: "1px solid var(--primary)" }}>
                <Video size={10} /> Voir le flux
              </button>
              <button className="text-[10px] px-2 py-2 border rounded-lg font-medium cursor-pointer flex items-center justify-center gap-1" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>
                <MapPin size={10} /> Street View
              </button>
              <button className="text-[10px] px-2 py-2 border rounded-lg font-medium cursor-pointer flex items-center justify-center gap-1" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>
                <Globe size={10} /> Vue satellite
              </button>
              <button className="text-[10px] px-2 py-2 border rounded-lg font-medium cursor-pointer flex items-center justify-center gap-1" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>
                <History size={10} /> Historique
              </button>
            </div>
          </div>

          {/* Legend card */}
          <div className="rounded-xl p-4 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <p className="text-[10px] font-mono uppercase tracking-wide mb-3" style={{ color: "var(--muted-foreground)" }}>
              Legende
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--success)" }} />
                <span style={{ color: "var(--muted-foreground)" }}>Camera en ligne</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--warning)" }} />
                <span style={{ color: "var(--muted-foreground)" }}>Camera en alerte</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--destructive)" }} />
                <span style={{ color: "var(--muted-foreground)" }}>Camera hors ligne</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle size={11} style={{ color: "var(--destructive)" }} />
                <span style={{ color: "var(--muted-foreground)" }}>Incident actif</span>
              </div>
            </div>
          </div>

          {/* Stats card */}
          <div className="rounded-xl p-4 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <p className="text-[10px] font-mono uppercase tracking-wide mb-3" style={{ color: "var(--muted-foreground)" }}>
              Statistiques carte
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <p style={{ color: "var(--muted-foreground)" }}>Cameras actives</p>
                <p className="text-lg font-semibold">
                  {cameras.filter((c) => c.status === "online").length}
                </p>
              </div>
              <div>
                <p style={{ color: "var(--muted-foreground)" }}>Incidents affiches</p>
                <p className="text-lg font-semibold">{activeIncidents.length}</p>
              </div>
              <div>
                <p style={{ color: "var(--muted-foreground)" }}>Alertes IA</p>
                <p className="text-lg font-semibold">{cameras.filter((c) => c.status === "alert").length}</p>
              </div>
              <div>
                <p style={{ color: "var(--muted-foreground)" }}>Zones</p>
                <p className="text-lg font-semibold">{zones.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
