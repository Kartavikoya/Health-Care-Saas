interface StatusBadgeProps {
  label: string;
  tone?: "critical" | "warning" | "success" | "neutral" | "info";
}

const toneClasses = {
  critical: "bg-rose-100 text-rose-700 ring-1 ring-rose-200",
  warning: "bg-amber-100 text-amber-700 ring-1 ring-amber-200",
  success: "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200",
  neutral: "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
  info: "bg-cyan-100 text-cyan-700 ring-1 ring-cyan-200",
};

export default function StatusBadge({
  label,
  tone = "neutral",
}: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${toneClasses[tone]}`}
    >
      {label}
    </span>
  );
}
