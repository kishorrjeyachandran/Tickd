import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#000000", "#d1d5db"]; // completed, pending

const Analysis = ({ tasks }) => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // filter tasks for selected date
  const filtered = tasks.filter(
    (task) => task.due_date === selectedDate
  );

  const completed = filtered.filter((t) => t.completed).length;
  const pending = filtered.length - completed;

  const data = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
  ];

  return (
    <div className="space-y-6">

      {/* DATE PICKER */}
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="border px-3 py-2 rounded"
      />

      {/* GRAPH */}
      <div className="w-full h-64">
        {filtered.length === 0 ? (
          <p className="text-gray-400 text-sm">
            No tasks for this date
          </p>
        ) : (
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                innerRadius={60}
                outerRadius={90}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* SUMMARY */}
      <div className="text-sm text-gray-600">
        <p>Completed: {completed}</p>
        <p>Pending: {pending}</p>
      </div>

    </div>
  );
};

export default Analysis;