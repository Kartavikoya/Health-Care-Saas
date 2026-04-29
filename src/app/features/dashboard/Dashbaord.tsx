import { useState } from "react";
import MetricCard from "../../components/MetricCard";
import StatusBadge from "../../components/StatusBadge";
import { useNotificationCenter } from "../../hooks/useNotificationCenter";
import { useStore } from "../../store/useStore";

export default function Dashboard() {
  const [notificationFeedback, setNotificationFeedback] = useState("");
  const patients = useStore((state) => state.patients);
  const notifications = useStore((state) => state.notifications);
  const { sendLocalNotification } = useNotificationCenter();

  const activeCases = patients.filter(
    (patient) => patient.status !== "Recovering",
  ).length;
  const criticalCases = patients.filter(
    (patient) => patient.riskLevel === "High",
  ).length;
  const averageAdherence = Math.round(
    patients.reduce((total, patient) => total + patient.adherence, 0) /
      patients.length,
  );

  const handleMedicationReminder = async () => {
    const response = await sendLocalNotification({
      title: "Medication adherence reminder",
      body: "Samuel Carter requires a medication reconciliation check before noon.",
      targetPath: "/patients",
    });

    setNotificationFeedback(response.message);
  };

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Patients enrolled"
          value={`${patients.length}`}
          helper="Live care programs being tracked today"
          trend="+12% vs last week"
        />
        <MetricCard
          label="Active cases"
          value={`${activeCases}`}
          helper="Patients needing active care coordination"
          trend="+4 new intakes"
        />
        <MetricCard
          label="Critical follow-ups"
          value={`${criticalCases}`}
          helper="Requires same-day multidisciplinary review"
          trend="2 pending handoffs"
        />
        <MetricCard
          label="Adherence score"
          value={`${averageAdherence}%`}
          helper="Average medication and plan compliance"
          trend="+6 pts this month"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <article className="surface-panel page-enter p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="eyebrow">Care team action center</p>
              <h3 className="heading-display mt-2 text-2xl font-bold text-slate-950">
                Immediate priorities for today&apos;s rounds
              </h3>
            </div>
            <button
              type="button"
              onClick={handleMedicationReminder}
              className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-600"
            >
              Trigger local notification
            </button>
          </div>

          {notificationFeedback ? (
            <div className="mt-4 rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm text-cyan-700">
              {notificationFeedback}
            </div>
          ) : null}

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {patients.slice(0, 4).map((patient) => (
              <div
                key={patient.id}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {patient.name}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      {patient.condition}
                    </p>
                  </div>
                  <StatusBadge
                    label={patient.riskLevel}
                    tone={
                      patient.riskLevel === "High"
                        ? "critical"
                        : patient.riskLevel === "Medium"
                          ? "warning"
                          : "success"
                    }
                  />
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-600">
                  <div>
                    <dt className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      Room
                    </dt>
                    <dd className="mt-1 font-medium text-slate-800">
                      {patient.room}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      Next review
                    </dt>
                    <dd className="mt-1 font-medium text-slate-800">
                      {patient.nextAppointment}
                    </dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </article>

        <article className="surface-panel page-enter p-6">
          <p className="eyebrow">Alert stream</p>
          <h3 className="heading-display mt-2 text-2xl font-bold text-slate-950">
            Recent notifications
          </h3>
          <div className="mt-6 space-y-4">
            {notifications.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-slate-200 bg-white p-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-semibold text-slate-900">
                    {item.title}
                  </p>
                  <StatusBadge label={item.createdAt} tone="info" />
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <article className="surface-panel page-enter p-6">
          <p className="eyebrow">Workflow health</p>
          <h3 className="heading-display mt-2 text-2xl font-bold text-slate-950">
            Coordination checklist
          </h3>
          <ul className="mt-6 space-y-4 text-sm text-slate-600">
            <li className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
              Confirm ICU discharge documentation before 14:00.
            </li>
            <li className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
              Review low-adherence patients for pharmacy follow-up.
            </li>
            <li className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
              Align tomorrow&apos;s analytics snapshot with the rehab program leads.
            </li>
          </ul>
        </article>

        <article className="surface-panel page-enter p-6">
          <p className="eyebrow">Operational notes</p>
          <h3 className="heading-display mt-2 text-2xl font-bold text-slate-950">
            Executive summary
          </h3>
          <p className="mt-6 text-sm leading-7 text-slate-600">
            The workspace is intentionally built like a SaaS operations console:
            metrics at the top, action queues in the middle, and notification
            visibility throughout. This makes it easy to scan KPIs, jump into
            patient details, and trigger browser notifications from a real
            care-coordination use case.
          </p>
        </article>
      </section>
    </div>
  );
}
