import { useState } from "react";
import {
  ResponsiveContainer, BarChart, Bar, AreaChart, Area,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell
} from "recharts";
import { TrendingUp, TrendingDown, Calendar, GitCompare } from "lucide-react";
import { incidentBreakdown } from "../data/mockData";
import PageHeader from "../components/PageHeader";

const PERIODS = ["Jour", "Semaine", "Mois", "Annee"];

const dailyData = [
  { label: "00h", incidents: 0, ia: 1, plaques: 12 },
  { label: "04h", incidents: 1, ia: 2, plaques: 8 },
  { label: "08h", incidents: 3, ia: 7, plaques: 45 },
  { label: "10h", incidents: 4, ia: 9, plaques: 62 },
  { label: "12h", incidents: 2, ia: 5, plaques: 55 },
  { label: "14h", incidents: 3, ia: 8, plaques: 48 },
  { label: "16h", incidents: 5, ia: 12, plaques: 70 },
  { label: "18h", incidents: 6, ia: 15, plaques: 80 },
  { label: "20h", incidents: 4, ia: 10, plaques: 35 },
  { label: "22h", incidents: 2, ia: 4, plaques: 18 },
];

const weeklyData = [
  { label: "Lun", incidents: 4, ia: 12, plaques: 145 },
  { label: "Mar", incidents: 6, ia: 18, plaques: 152 },
  { label: "Mer", incidents: 3, ia: 9, plaques: 138 },
  { label: "Jeu", incidents: 7, ia: 22, plaques: 161 },
  { label: "Ven", incidents: 5, ia: 15, plaques: 149 },
  { label: "Sam", incidents: 8, ia: 25, plaques: 155 },
  { label: "Dim", incidents: 2, ia: 7, plaques: 90 },
];

const monthlyData = [
  { label: "S1", incidents: 18, ia: 52, plaques: 980 },
  { label: "S2", incidents: 22, ia: 65, plaques: 1050 },
  { label: "S3", incidents: 15, ia: 44, plaques: 920 },
  { label: "S4", incidents: 20, ia: 58, plaques: 1100 },
];

const yearlyData = [
  { label: "Jan", incidents: 65, ia: 180, plaques: 3800 },
  { label: "Fev", incidents: 58, ia: 162, plaques: 3500 },
  { label: "Mar", incidents: 72, ia: 210, plaques: 4100 },
  { label: "Avr", incidents: 55, ia: 155, plaques: 3600 },
  { label: "Mai", incidents: 68, ia: 195, plaques: 4200 },
  { label: "Jun", incidents: 45, ia: 130, plaques: 3900 },
  { label: "Jul", incidents: 50, ia: 140, plaques: 3700 },
  { label: "Aou", incidents: 42, ia: 118, plaques: 3400 },
  { label: "Sep", incidents: 60, ia: 172, plaques: 3950 },
  { label: "Oct", incidents: 70, ia: 200, plaques: 4300 },
  { label: "Nov", incidents: 62, ia: 178, plaques: 4000 },
  { label: "Dec", incidents: 48, ia: 135, plaques: 3600 },
];

const comparisonData = [
  { label: "Jan", actuel: 65, precedent: 80 },
  { label: "Fev", actuel: 58, precedent: 72 },
  { label: "Mar", actuel: 72, precedent: 68 },
  { label: "Avr", actuel: 55, precedent: 65 },
  { label: "Mai", actuel: 68, precedent: 75 },
  { label: "Jun", actuel: 45, precedent: 62 },
];

const hourlyHeatmap = [
  { heure: "06h-08h", lun: 2, mar: 1, mer: 3, jeu: 2, ven: 1, sam: 0, dim: 0 },
  { heure: "08h-10h", lun: 4, mar: 5, mer: 3, jeu: 6, ven: 4, sam: 2, dim: 1 },
  { heure: "10h-12h", lun: 3, mar: 4, mer: 2, jeu: 5, ven: 3, sam: 3, dim: 1 },
  { heure: "12h-14h", lun: 2, mar: 3, mer: 2, jeu: 3, ven: 2, sam: 4, dim: 2 },
  { heure: "14h-16h", lun: 3, mar: 4, mer: 3, jeu: 4, ven: 5, sam: 5, dim: 2 },
  { heure: "16h-18h", lun: 5, mar: 6, mer: 4, jeu: 7, ven: 6, sam: 6, dim: 3 },
  { heure: "18h-20h", lun: 6, mar: 7, mer: 5, jeu: 8, ven: 7, sam: 8, dim: 4 },
  { heure: "20h-22h", lun: 4, mar: 5, mer: 3, jeu: 5, ven: 6, sam: 7, dim: 3 },
];

const PIE_COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

const cameraStats = [
  { name: "CAM-01", detections: 45 },
  { name: "CAM-02", detections: 32 },
  { name: "CAM-03", detections: 58 },
  { name: "CAM-04", detections: 41 },
  { name: "CAM-05", detections: 37 },
  { name: "CAM-06", detections: 28 },
];

const tooltipStyle = {
  contentStyle: {
    background: "var(--popover)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    fontSize: 12,
  },
  labelStyle: { color: "var(--muted-foreground)" },
};

function getDataForPeriod(period) {
  switch (period) {
    case "Jour": return dailyData;
    case "Semaine": return weeklyData;
    case "Mois": return monthlyData;
    case "Annee": return yearlyData;
    default: return weeklyData;
  }
}

function getKpis(period) {
  const data = getDataForPeriod(period);
  const totalInc = data.reduce((s, d) => s + d.incidents, 0);
  const totalIa = data.reduce((s, d) => s + d.ia, 0);
  const totalPlq = data.reduce((s, d) => s + d.plaques, 0);
  const avgInc = (totalInc / data.length).toFixed(1);
  return [
    { label: "Total incidents", value: totalInc, delta: "-18%", up: false },
    { label: "Detections IA", value: totalIa, delta: "+12%", up: true },
    { label: "Plaques scannees", value: totalPlq.toLocaleString(), delta: "+23%", up: true },
    { label: "Moy. incidents/periode", value: avgInc, delta: "-5%", up: false },
  ];
}

export default function Statistics() {
  const [period, setPeriod] = useState("Semaine");
  const [showComparison, setShowComparison] = useState(false);

  const data = getDataForPeriod(period);
  const kpis = getKpis(period);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Statistiques"
        subtitle="Analyse des tendances et indicateurs de performance"
      />

      {/* Period selector + Compare toggle */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1 rounded-lg border p-1" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
          {PERIODS.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className="px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer"
              style={
                period === p
                  ? { background: "var(--primary)", color: "#fff" }
                  : { color: "var(--muted-foreground)" }
              }
            >
              {p}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowComparison(!showComparison)}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border cursor-pointer transition-colors"
          style={
            showComparison
              ? { background: "oklch(0.68 0.18 245 / 0.1)", borderColor: "var(--primary)", color: "var(--primary)" }
              : { borderColor: "var(--border)", color: "var(--muted-foreground)" }
          }
        >
          <GitCompare size={14} />
          Comparer periodes
        </button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-xl p-5 border cursor-pointer hover:shadow-[0_0_15px_oklch(0.68_0.18_245/0.1)] transition-shadow"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}
          >
            <p className="text-[10px] font-mono uppercase tracking-wider mb-2" style={{ color: "var(--muted-foreground)" }}>
              {kpi.label}
            </p>
            <p className="text-3xl font-semibold">{kpi.value}</p>
            <p className="text-xs font-medium mt-1 flex items-center gap-1" style={{ color: kpi.up ? "var(--success)" : "var(--destructive)" }}>
              {kpi.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {kpi.delta} vs periode prec.
            </p>
          </div>
        ))}
      </div>

      {/* Comparison chart (conditional) */}
      {showComparison && (
        <div className="rounded-xl p-5 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <h3 className="text-sm font-medium mb-4">Comparaison incidents : cette annee vs annee precedente</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="label" stroke="var(--muted-foreground)" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
              <YAxis stroke="var(--muted-foreground)" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
              <Tooltip {...tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="actuel" name="2026" fill="var(--chart-1)" radius={[3, 3, 0, 0]} />
              <Bar dataKey="precedent" name="2025" fill="var(--chart-4)" radius={[3, 3, 0, 0]} opacity={0.5} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Main charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Incidents + IA over time */}
        <div className="rounded-xl p-5 border cursor-pointer hover:shadow-[0_0_15px_oklch(0.68_0.18_245/0.1)] transition-shadow" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <h3 className="text-sm font-medium mb-4">Incidents & Detections IA - {period}</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="statGradInc" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="statGradIa" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="label" stroke="var(--muted-foreground)" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
              <YAxis stroke="var(--muted-foreground)" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
              <Tooltip {...tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Area type="monotone" dataKey="incidents" name="Incidents" stroke="var(--chart-2)" fill="url(#statGradInc)" strokeWidth={2} />
              <Area type="monotone" dataKey="ia" name="Detections IA" stroke="var(--chart-1)" fill="url(#statGradIa)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Plates over time */}
        <div className="rounded-xl p-5 border cursor-pointer hover:shadow-[0_0_15px_oklch(0.68_0.18_245/0.1)] transition-shadow" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <h3 className="text-sm font-medium mb-4">Plaques scannees - {period}</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="label" stroke="var(--muted-foreground)" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
              <YAxis stroke="var(--muted-foreground)" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
              <Tooltip {...tooltipStyle} />
              <Line type="monotone" dataKey="plaques" name="Plaques" stroke="var(--chart-3)" strokeWidth={2} dot={{ r: 3, fill: "var(--chart-3)" }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Incident breakdown pie */}
        <div className="rounded-xl p-5 border cursor-pointer hover:shadow-[0_0_15px_oklch(0.68_0.18_245/0.1)] transition-shadow" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <h3 className="text-sm font-medium mb-4">Repartition par type d'incident</h3>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={180}>
              <PieChart>
                <Pie data={incidentBreakdown} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value" paddingAngle={3}>
                  {incidentBreakdown.map((_, i) => (
                    <Cell key={`cell-${i}`} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip {...tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {incidentBreakdown.map((item, i) => (
                <div key={item.name} className="flex items-center gap-2 text-xs">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                  <span style={{ color: "var(--muted-foreground)" }}>{item.name}</span>
                  <span className="ml-auto font-semibold">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detections by camera */}
        <div className="rounded-xl p-5 border cursor-pointer hover:shadow-[0_0_15px_oklch(0.68_0.18_245/0.1)] transition-shadow" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <h3 className="text-sm font-medium mb-4">Detections par camera</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={cameraStats} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis type="number" stroke="var(--muted-foreground)" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
              <YAxis type="category" dataKey="name" stroke="var(--muted-foreground)" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} width={55} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="detections" name="Detections" fill="var(--chart-1)" radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Heatmap - incidents by day/hour */}
      <div className="rounded-xl p-5 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <h3 className="text-sm font-medium mb-4">Repartition horaire des incidents (semaine type)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr>
                <th className="px-3 py-2 text-left" style={{ color: "var(--muted-foreground)" }}>Heure</th>
                <th className="px-3 py-2" style={{ color: "var(--muted-foreground)" }}>Lun</th>
                <th className="px-3 py-2" style={{ color: "var(--muted-foreground)" }}>Mar</th>
                <th className="px-3 py-2" style={{ color: "var(--muted-foreground)" }}>Mer</th>
                <th className="px-3 py-2" style={{ color: "var(--muted-foreground)" }}>Jeu</th>
                <th className="px-3 py-2" style={{ color: "var(--muted-foreground)" }}>Ven</th>
                <th className="px-3 py-2" style={{ color: "var(--muted-foreground)" }}>Sam</th>
                <th className="px-3 py-2" style={{ color: "var(--muted-foreground)" }}>Dim</th>
              </tr>
            </thead>
            <tbody>
              {hourlyHeatmap.map((row) => (
                <tr key={row.heure}>
                  <td className="px-3 py-2 font-mono" style={{ color: "var(--muted-foreground)" }}>{row.heure}</td>
                  {["lun", "mar", "mer", "jeu", "ven", "sam", "dim"].map((day) => {
                    const val = row[day];
                    const opacity = Math.min(val / 8, 1);
                    return (
                      <td key={day} className="px-3 py-2 text-center">
                        <span
                          className="inline-flex w-8 h-8 items-center justify-center rounded-md text-xs font-medium"
                          style={{
                            background: `oklch(0.68 0.18 245 / ${opacity * 0.6})`,
                            color: opacity > 0.4 ? "#fff" : "var(--muted-foreground)",
                          }}
                        >
                          {val}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
