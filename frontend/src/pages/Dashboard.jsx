import {
  Video,
  VideoOff,
  Brain,
  ScanLine,
  AlertTriangle,
  Activity,
} from "lucide-react";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  cameras,
  stats,
  aiEvents,
  incidents,
  weeklyTrends,
  incidentBreakdown,
  timeAgo,
} from "../data/mockData";
import PageHeader, { StatusDot } from "../components/PageHeader";

const PIE_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

const tooltipStyle = {
  background: "var(--popover)",
  border: "1px solid var(--border)",
  borderRadius: 8,
  fontSize: 12,
};

function SeverityDot({ severity }) {
  const colorMap = {
    critical: "text-[var(--destructive)]",
    high: "text-[var(--destructive)]",
    medium: "text-warning",
    low: "text-[var(--primary)]",
  };
  return (
    <span
      className={`inline-block w-2 h-2 rounded-full ${colorMap[severity] || ""}`}
      style={{
        background:
          severity === "critical" || severity === "high"
            ? "var(--destructive)"
            : severity === "medium"
              ? "var(--warning)"
              : severity === "low"
                ? "var(--primary)"
                : "var(--muted-foreground)",
      }}
    />
  );
}

export default function Dashboard() {
  const kpis = [
    {
      label: "Cameras connectees",
      value: `${stats.onlineCameras}/${stats.totalCameras}`,
      trend: `${stats.alertCameras} en alerte`,
      icon: Video,
      trendType: "success",
    },
    {
      label: "Cameras hors ligne",
      value: stats.offlineCameras,
      trend: "Derniere deconnexion il y a 12h",
      icon: VideoOff,
      trendType: "destructive",
    },
    {
      label: "Evenements IA",
      value: aiEvents.length,
      trend: "+3 depuis 1h",
      icon: Brain,
      trendType: "warning",
    },
    {
      label: "Plaques reconnues",
      value: stats.totalPlates,
      trend: `${stats.flaggedPlates} signalees`,
      icon: ScanLine,
      trendType: "primary",
    },
    {
      label: "Incidents ouverts",
      value: stats.openIncidents,
      trend: `${stats.criticalIncidents} critiques`,
      icon: AlertTriangle,
      trendType: "destructive",
    },
    {
      label: "Cameras en alerte",
      value: stats.alertCameras,
      trend: `${stats.offlineCameras} hors ligne`,
      icon: Video,
      trendType: "warning",
    },
    {
      label: "Disponibilite",
      value: "99.9%",
      trend: "SLA respecte",
      icon: Activity,
      trendType: "success",
    },
    {
      label: "Latence flux",
      value: "142 ms",
      trend: "Nominal",
      icon: Activity,
      trendType: "primary",
    },
  ];

  const alertCameras = cameras.filter((c) => c.status !== "online");
  const openIncidents = incidents.filter(
    (i) => i.status !== "closed"
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Centre de supervision"
        subtitle="Vue d'ensemble en temps reel - Rue Professeur Kone Tiemoman"
        actions={
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border"
            style={{ background: "oklch(0.32 0.08 145 / 0.3)", borderColor: "var(--success)" }}
          >
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ background: "var(--success)" }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "var(--success)" }} />
            </span>
            <span className="text-xs font-medium text-success">
              Systeme operationnel
            </span>
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="rounded-xl border overflow-hidden p-5 flex items-start justify-between"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}
            >
              <div className="space-y-1">
                <p className="text-[10px] font-mono uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>
                  {kpi.label}
                </p>
                <p className="text-3xl font-semibold" style={{ color: "var(--foreground)" }}>
                  {kpi.value}
                </p>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{kpi.trend}</p>
              </div>
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "oklch(0.32 0.08 245 / 0.4)" }}
              >
                <Icon size={18} style={{ color: "var(--primary)" }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Area Chart - Weekly Activity */}
        <div
          className="lg:col-span-2 rounded-xl border overflow-hidden p-5 cursor-pointer hover:shadow-[0_0_15px_oklch(0.68_0.18_245/0.1)] transition-shadow"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <h3 className="text-sm font-medium mb-4" style={{ color: "var(--foreground)" }}>
            Activite hebdomadaire
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={weeklyTrends}>
              <defs>
                <linearGradient id="gradAi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradIncidents" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="day"
                stroke="var(--muted-foreground)"
                tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              />
              <YAxis
                stroke="var(--muted-foreground)"
                tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              />
              <Tooltip contentStyle={tooltipStyle} />
              <Area
                type="monotone"
                dataKey="ai"
                name="Evenements IA"
                stroke="var(--chart-1)"
                fill="url(#gradAi)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="incidents"
                name="Incidents"
                stroke="var(--chart-2)"
                fill="url(#gradIncidents)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart - Incident Breakdown */}
        <div
          className="rounded-xl border overflow-hidden p-5 cursor-pointer hover:shadow-[0_0_15px_oklch(0.68_0.18_245/0.1)] transition-shadow"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <h3 className="text-sm font-medium mb-4" style={{ color: "var(--foreground)" }}>
            Repartition incidents
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={incidentBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                dataKey="value"
                paddingAngle={3}
              >
                {incidentBreakdown.map((_, i) => (
                  <Cell
                    key={`cell-${i}`}
                    fill={PIE_COLORS[i % PIE_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-3">
            {incidentBreakdown.map((item, i) => (
              <div key={item.name} className="flex items-center gap-2 text-xs">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ background: PIE_COLORS[i % PIE_COLORS.length] }}
                />
                <span style={{ color: "var(--muted-foreground)" }}>{item.name}</span>
                <span className="ml-auto font-medium" style={{ color: "var(--foreground)" }}>
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Three Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Last Incidents */}
        <div
          className="rounded-xl border overflow-hidden p-5"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <h3 className="text-sm font-medium mb-4" style={{ color: "var(--foreground)" }}>
            Derniers incidents
          </h3>
          <div className="space-y-3">
            {openIncidents.slice(0, 4).map((inc) => (
              <div
                key={inc.id}
                className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0"
                style={{ borderColor: "var(--border)" }}
              >
                <SeverityDot severity={inc.severity} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate" style={{ color: "var(--foreground)" }}>
                    {inc.title}
                  </p>
                  <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                    {inc.location}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
                    {timeAgo(inc.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent AI Detections */}
        <div
          className="rounded-xl border overflow-hidden p-5"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <h3 className="text-sm font-medium mb-4" style={{ color: "var(--foreground)" }}>
            Detections IA recentes
          </h3>
          <div className="space-y-3">
            {aiEvents.slice(0, 4).map((evt) => (
              <div
                key={evt.id}
                className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0"
                style={{ borderColor: "var(--border)" }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "oklch(0.32 0.08 245 / 0.4)" }}
                >
                  <Brain size={14} style={{ color: "var(--primary)" }} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                    {evt.type}
                  </p>
                  <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{evt.cameraName}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
                    Confiance: {Math.round(evt.confidence * 100)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alert Cameras */}
        <div
          className="rounded-xl border overflow-hidden p-5"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <h3 className="text-sm font-medium mb-4" style={{ color: "var(--foreground)" }}>
            Cameras en alerte
          </h3>
          <div className="space-y-3">
            {alertCameras.map((cam) => (
              <div
                key={cam.id}
                className="flex items-center gap-3 pb-3 border-b last:border-0 last:pb-0"
                style={{ borderColor: "var(--border)" }}
              >
                <StatusDot status={cam.status} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                    {cam.name}
                  </p>
                  <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                    {cam.ip} - {cam.zone}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bar Chart - Volume */}
      <div
        className="rounded-xl border overflow-hidden p-5 cursor-pointer hover:shadow-[0_0_15px_oklch(0.68_0.18_245/0.1)] transition-shadow"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        <h3 className="text-sm font-medium mb-4" style={{ color: "var(--foreground)" }}>
          Volume IA / plaques - semaine
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={weeklyTrends}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="day"
              stroke="var(--muted-foreground)"
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            />
            <YAxis
              stroke="var(--muted-foreground)"
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar
              dataKey="ai"
              name="Detections IA"
              fill="var(--chart-2)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="plates"
              name="Plaques"
              fill="var(--chart-1)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
