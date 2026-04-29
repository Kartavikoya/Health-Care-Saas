export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow">Patients: 120</div>
        <div className="bg-white p-4 shadow">Active Cases: 45</div>
        <div className="bg-white p-4 shadow">Appointments: 30</div>
      </div>
    </div>
  );
}