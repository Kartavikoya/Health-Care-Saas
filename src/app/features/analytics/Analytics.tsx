import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { name: "Jan", patients: 30 },
  { name: "Feb", patients: 50 },
  { name: "Mar", patients: 40 },
];

export default function Analytics() {
  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Analytics</h1>

      <BarChart width={400} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="patients" />
      </BarChart>
    </div>
  );
}