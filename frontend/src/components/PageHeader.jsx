export default function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--border)] pb-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-[var(--muted-foreground)]">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function StatusDot({ status }) {
  const cls =
    status === "online" || status === "ok"
      ? "text-[var(--success)]"
      : status === "alert" || status === "warn"
        ? "text-[var(--warning)]"
        : "text-[var(--destructive)]";
  const pulse = status === "alert" || status === "warn" ? "pulse-dot" : "";
  return (
    <span className={`relative inline-block h-2 w-2 rounded-full bg-current ${cls} ${pulse}`} />
  );
}
