import { useState } from "react";
import { Shield, Lock, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const result = login(username, password);
      if (!result.success) {
        setError(result.error);
      }
      setLoading(false);
    }, 600);
  }

  const demoAccounts = [
    { user: "admin", pass: "Admin2026!", role: "Administrateur", email: "m.toure@smartstreet.ci" },
    { user: "operateur", pass: "Oper2026!", role: "Operateur", email: "a.bamba@smartstreet.ci" },
  ];

  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden p-6 bg-grid"
      style={{ background: "var(--background)" }}
    >
      {/* Gradient overlays */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(to bottom, oklch(0.16 0.03 260 / 0.4) 0%, oklch(0.16 0.03 260 / 0.8) 50%, oklch(0.16 0.03 260) 100%)" }}
      />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full blur-[120px]"
        style={{ background: "oklch(0.68 0.18 245 / 0.3)" }}
      />

      {/* Main card */}
      <div
        className="relative grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-2xl border backdrop-blur-xl md:grid-cols-2"
        style={{
          background: "oklch(0.21 0.035 260 / 0.6)",
          borderColor: "var(--border)",
          boxShadow: "0 20px 40px oklch(0 0 0 / 0.3)"
        }}
      >
        {/* Left panel - Info */}
        <div
          className="hidden flex-col border-r p-8 md:flex"
          style={{
            borderColor: "var(--border)",
            backgroundImage: "var(--gradient-surface)"
          }}
        >
          {/* Logo */}
          <div className="flex items-center gap-3 mb-auto">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl glow-primary"
              style={{ backgroundImage: "var(--gradient-primary)" }}
            >
              <Shield className="h-6 w-6" style={{ color: "var(--primary-foreground)" }} />
            </div>
            <div>
              <p className="text-sm font-semibold">Smart Street Security</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: "var(--muted-foreground)" }}>
                CSI · Cote d'Ivoire
              </p>
            </div>
          </div>

          {/* Main content - centered */}
          <div className="space-y-4 text-center my-auto">
            <h2 className="text-3xl font-semibold leading-tight tracking-tight">
              Rue Professeur
              <br />
              Kone Tiemoman
            </h2>
            <p className="text-sm mx-auto max-w-sm" style={{ color: "var(--muted-foreground)" }}>
              Videosurveillance IA, reconnaissance de plaques, gestion des incidents -
              un seul poste de commandement.
            </p>
          </div>

          {/* Spacer for bottom */}
          <div className="mt-auto"></div>
        </div>

        {/* Right panel - Form */}
        <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-5 p-8 md:p-10">
          <div className="space-y-1.5">
            <h1 className="text-2xl font-semibold tracking-tight">Connexion securisee</h1>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              Accedez au centre de supervision avec votre identifiant agent.
            </p>
          </div>

          {error && (
            <div
              className="rounded-lg border p-3 text-sm"
              style={{
                background: "oklch(0.55 0.2 25 / 0.1)",
                borderColor: "var(--destructive)",
                color: "var(--destructive)"
              }}
            >
              {error}
            </div>
          )}

          {/* Username field */}
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">Identifiant</label>
            <div className="relative">
              <User
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
                style={{ color: "var(--muted-foreground)" }}
              />
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-10 rounded-lg border pl-9 pr-3 text-sm focus:outline-none focus:ring-2 transition-all"
                style={{
                  background: "var(--input)",
                  borderColor: "var(--border)",
                  color: "var(--foreground)"
                }}
                placeholder="Entrez votre identifiant"
                required
              />
            </div>
          </div>

          {/* Password field */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">Mot de passe</label>
            <div className="relative">
              <Lock
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
                style={{ color: "var(--muted-foreground)" }}
              />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-10 rounded-lg border pl-9 pr-3 text-sm focus:outline-none focus:ring-2 transition-all"
                style={{
                  background: "var(--input)",
                  borderColor: "var(--border)",
                  color: "var(--foreground)"
                }}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2" style={{ color: "var(--muted-foreground)" }}>
              <input type="checkbox" className="accent-primary" /> Se souvenir
            </label>
            <a className="hover:underline cursor-pointer" style={{ color: "var(--primary)" }}>
              Mot de passe oublie ?
            </a>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="h-11 rounded-lg font-semibold text-sm transition-opacity cursor-pointer hover:opacity-90 disabled:opacity-50"
            style={{
              backgroundImage: "var(--gradient-primary)",
              color: "var(--primary-foreground)"
            }}
          >
            {loading ? "Connexion…" : "Se connecter au centre"}
          </button>

          {/* Demo accounts */}
          <div className="space-y-2">
            <p className="text-[11px] text-center" style={{ color: "var(--muted-foreground)" }}>
              Comptes de demonstration
            </p>
            {demoAccounts.map((acc) => (
              <button
                key={acc.user}
                type="button"
                onClick={() => { setUsername(acc.user); setPassword(acc.pass); }}
                className="w-full flex items-center justify-between rounded-lg border p-2.5 text-xs transition-colors cursor-pointer"
                style={{
                  background: "var(--background)",
                  borderColor: "var(--border)",
                  color: "var(--muted-foreground)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "oklch(0.68 0.18 245 / 0.1)";
                  e.currentTarget.style.borderColor = "var(--primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--background)";
                  e.currentTarget.style.borderColor = "var(--border)";
                }}
              >
                <span className="font-medium">{acc.email}</span>
                <span>{acc.role}</span>
              </button>
            ))}
          </div>

        </form>
      </div>
    </div>
  );
}
