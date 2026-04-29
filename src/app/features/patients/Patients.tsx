import { startTransition, useDeferredValue, useState } from "react";
import StatusBadge from "../../components/StatusBadge";
import { useNotificationCenter } from "../../hooks/useNotificationCenter";
import { useStore } from "../../store/useStore";

export default function Patients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const deferredSearch = useDeferredValue(searchTerm);
  const patients = useStore((state) => state.patients);
  const patientView = useStore((state) => state.patientView);
  const selectedPatientId = useStore((state) => state.selectedPatientId);
  const setPatientView = useStore((state) => state.setPatientView);
  const selectPatient = useStore((state) => state.selectPatient);
  const { sendLocalNotification } = useNotificationCenter();

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(deferredSearch.toLowerCase()) ||
      patient.condition.toLowerCase().includes(deferredSearch.toLowerCase()) ||
      patient.id.toLowerCase().includes(deferredSearch.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ? true : patient.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const selectedPatient =
    filteredPatients.find((patient) => patient.id === selectedPatientId) ??
    patients.find((patient) => patient.id === selectedPatientId) ??
    filteredPatients[0] ??
    patients[0];

  const handleEscalation = async () => {
    if (!selectedPatient) {
      return;
    }

    await sendLocalNotification({
      title: `Escalation: ${selectedPatient.name}`,
      body: `${selectedPatient.condition} requires a care-team review in room ${selectedPatient.room}.`,
      targetPath: "/patients",
    });
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
      <section className="space-y-6">
        <article className="surface-panel page-enter p-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="eyebrow">Patient details module</p>
              <h3 className="heading-display mt-2 text-2xl font-bold text-slate-950">
                Responsive grid and list views for care teams
              </h3>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search name, condition, or patient ID"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 sm:min-w-72"
              />
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
              >
                <option value="All">All statuses</option>
                <option value="Stable">Stable</option>
                <option value="Recovering">Recovering</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-500">
              Showing {filteredPatients.length} of {patients.length} patients
            </p>
            <div className="inline-flex rounded-full border border-slate-200 bg-slate-100 p-1">
              <button
                type="button"
                onClick={() =>
                  startTransition(() => {
                    setPatientView("grid");
                  })
                }
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  patientView === "grid"
                    ? "bg-white text-slate-950 shadow-sm"
                    : "text-slate-500"
                }`}
              >
                Grid view
              </button>
              <button
                type="button"
                onClick={() =>
                  startTransition(() => {
                    setPatientView("list");
                  })
                }
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  patientView === "list"
                    ? "bg-white text-slate-950 shadow-sm"
                    : "text-slate-500"
                }`}
              >
                List view
              </button>
            </div>
          </div>
        </article>

        {patientView === "grid" ? (
          <div className="grid gap-4 md:grid-cols-2">
            {filteredPatients.map((patient) => (
              <button
                key={patient.id}
                type="button"
                onClick={() => selectPatient(patient.id)}
                className={`surface-panel page-enter p-5 text-left transition hover:-translate-y-0.5 ${
                  selectedPatient?.id === patient.id ? "ring-2 ring-cyan-400" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {patient.name}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">{patient.id}</p>
                  </div>
                  <StatusBadge
                    label={patient.status}
                    tone={
                      patient.status === "Critical"
                        ? "critical"
                        : patient.status === "Recovering"
                          ? "warning"
                          : "success"
                    }
                  />
                </div>
                <p className="mt-4 text-sm text-slate-700">{patient.condition}</p>
                <dl className="mt-5 grid grid-cols-2 gap-3 text-sm text-slate-500">
                  <div>
                    <dt className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      Physician
                    </dt>
                    <dd className="mt-1 font-medium text-slate-800">
                      {patient.physician}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      Adherence
                    </dt>
                    <dd className="mt-1 font-medium text-slate-800">
                      {patient.adherence}%
                    </dd>
                  </div>
                </dl>
              </button>
            ))}
          </div>
        ) : (
          <div className="surface-panel page-enter overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Patient</th>
                    <th className="px-5 py-4 font-semibold">Condition</th>
                    <th className="px-5 py-4 font-semibold">Physician</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                    <th className="px-5 py-4 font-semibold">Adherence</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.map((patient) => (
                    <tr
                      key={patient.id}
                      className={`cursor-pointer border-t border-slate-200 transition hover:bg-cyan-50 ${
                        selectedPatient?.id === patient.id ? "bg-cyan-50/80" : ""
                      }`}
                      onClick={() => selectPatient(patient.id)}
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-900">
                          {patient.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {patient.id} | Room {patient.room}
                        </p>
                      </td>
                      <td className="px-5 py-4 text-slate-700">
                        {patient.condition}
                      </td>
                      <td className="px-5 py-4 text-slate-700">
                        {patient.physician}
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge
                          label={patient.status}
                          tone={
                            patient.status === "Critical"
                              ? "critical"
                              : patient.status === "Recovering"
                                ? "warning"
                                : "success"
                          }
                        />
                      </td>
                      <td className="px-5 py-4 font-semibold text-slate-900">
                        {patient.adherence}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      <aside className="surface-panel page-enter h-fit p-6 xl:sticky xl:top-8">
        <p className="eyebrow">Selected profile</p>
        <h3 className="heading-display mt-2 text-2xl font-bold text-slate-950">
          {selectedPatient?.name ?? "No patient selected"}
        </h3>
        <p className="mt-2 text-sm text-slate-500">
          {selectedPatient?.condition ?? "Choose a patient from the list."}
        </p>

        {selectedPatient ? (
          <>
            <div className="mt-5 flex flex-wrap gap-2">
              <StatusBadge label={selectedPatient.status} tone="info" />
              <StatusBadge
                label={`${selectedPatient.riskLevel} risk`}
                tone={
                  selectedPatient.riskLevel === "High"
                    ? "critical"
                    : selectedPatient.riskLevel === "Medium"
                      ? "warning"
                      : "success"
                }
              />
            </div>

            <dl className="mt-6 space-y-4 text-sm">
              {[
                ["Patient ID", selectedPatient.id],
                ["Age", `${selectedPatient.age}`],
                ["Assigned physician", selectedPatient.physician],
                ["Room", selectedPatient.room],
                ["Last visit", selectedPatient.lastVisit],
                ["Next appointment", selectedPatient.nextAppointment],
                ["Adherence score", `${selectedPatient.adherence}%`],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
                >
                  <dt className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    {label}
                  </dt>
                  <dd className="mt-2 font-medium text-slate-900">{value}</dd>
                </div>
              ))}
            </dl>

            <button
              type="button"
              onClick={handleEscalation}
              className="mt-6 w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Send escalation notification
            </button>
          </>
        ) : null}
      </aside>
    </div>
  );
}
