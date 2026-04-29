import { useState, useEffect } from "react";
import { useStore } from "../../store/useStore";

export default function Patients() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const { patients, setPatients } = useStore();

  useEffect(() => {
    setPatients([
      { id: "1", name: "John Doe", age: 30, condition: "Diabetes", status: "Active" },
      { id: "2", name: "Jane Smith", age: 25, condition: "Asthma", status: "Inactive" },
    ]);
  }, [setPatients]);

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Patients</h1>

      <button
        onClick={() => setView(view === "grid" ? "list" : "grid")}
        className="mb-4 bg-blue-500 text-white px-4 py-2"
      >
        Toggle View
      </button>

      {view === "grid" ? (
        <div className="grid grid-cols-3 gap-4">
          {patients.map((p) => (
            <div key={p.id} className="p-4 bg-white shadow">
              <h3>{p.name}</h3>
              <p>{p.age}</p>
              <p>{p.condition}</p>
            </div>
          ))}
        </div>
      ) : (
        <table className="w-full bg-white">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Condition</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.age}</td>
                <td>{p.condition}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
