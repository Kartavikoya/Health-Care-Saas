import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import StatusBadge from "../../components/StatusBadge";
import { useStore } from "../../store/useStore";

const riskColors = ["#0f766e", "#f59e0b", "#e11d48"];

export default function Analytics() {
  const analytics = useStore((state) => state.analytics);
  const patients = useStore((state) => state.patients);
  const departmentLoad = useStore((state) => state.departmentLoad);

  const riskDistribution = [
    {
      name: "Low risk",
      value: patients.filter((patient) => patient.riskLevel === "Low").length,
    },
    {
      name: "Medium risk",
      value: patients.filter((patient) => patient.riskLevel === "Medium").length,
    },
    {
      name: "High risk",
      value: patients.filter((patient) => patient.riskLevel === "High").length,
    },
  ];

  return (
    <div className="space-y-6">
      <section className="surface-panel page-enter p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="eyebrow">Trend analysis</p>
            <h3 className="heading-display mt-2 text-2xl font-bold text-slate-950">
              Admissions, discharges, and satisfaction
            </h3>
          </div>
          <StatusBadge label="Updated for Apr 29, 2026" tone="info" />
        </div>

        <div className="mt-6 h-[340px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analytics}>
              <CartesianGrid strokeDasharray="3 3" stroke="#dbe4ee" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="admissions"
                stroke="#0f172a"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="discharges"
                stroke="#06b6d4"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="satisfaction"
                stroke="#f59e0b"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.95fr]">
        <article className="surface-panel page-enter p-6">
          <p className="eyebrow">Capacity utilization</p>
          <h3 className="heading-display mt-2 text-2xl font-bold text-slate-950">
            Department performance against target
          </h3>
          <div className="mt-6 h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentLoad}>
                <CartesianGrid strokeDasharray="3 3" stroke="#dbe4ee" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Legend />
                <Bar dataKey="utilization" fill="#0f766e" radius={[8, 8, 0, 0]} />
                <Bar dataKey="target" fill="#cbd5e1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="surface-panel page-enter p-6">
          <p className="eyebrow">Clinical mix</p>
          <h3 className="heading-display mt-2 text-2xl font-bold text-slate-950">
            Patient risk distribution
          </h3>
          <div className="mt-6 h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={3}
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell
                      key={`${entry.name}-${entry.value}`}
                      fill={riskColors[index]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </article>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Bed turnover",
            value: "1.8 days",
            detail: "Down 0.3 days after discharge process cleanup.",
          },
          {
            title: "Satisfaction",
            value: "92%",
            detail: "Highest score in the last six reporting periods.",
          },
          {
            title: "Escalations",
            value: "7",
            detail: "Only two remain unassigned for follow-up review.",
          },
        ].map((insight) => (
          <article key={insight.title} className="surface-panel page-enter p-5">
            <p className="eyebrow">{insight.title}</p>
            <p className="heading-display mt-4 text-3xl font-bold text-slate-950">
              {insight.value}
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              {insight.detail}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
