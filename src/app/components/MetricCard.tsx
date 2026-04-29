interface MetricCardProps {
  label: string;
  value: string;
  helper: string;
  trend: string;
}

export default function MetricCard({
  label,
  value,
  helper,
  trend,
}: MetricCardProps) {
  return (
    <article className="surface-panel page-enter p-5">
      <p className="eyebrow">{label}</p>
      <div className="mt-4 flex items-end justify-between gap-4">
        <div>
          <h3 className="heading-display text-3xl font-bold text-slate-900">
            {value}
          </h3>
          <p className="mt-2 text-sm text-slate-500">{helper}</p>
        </div>
        <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700">
          {trend}
        </span>
      </div>
    </article>
  );
}
