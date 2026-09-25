import { useState } from "react";
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

export default function Charts({ healthData }) {
  const [range, setRange] = useState(7);
  const filtered = healthData.slice(-range);

  const card = { background: "#1e293b", padding: "20px",
    borderRadius: "10px", marginBottom: "20px" };
  const title = { color: "#38bdf8", marginTop: 0 };
  const axis = { fill: "#94a3b8", fontSize: 10 };
  const grid = { strokeDasharray: "3 3", stroke: "#334155" };
  const tooltip = { contentStyle: { background: "#0f172a", border: "none" } };

  return (
    <div>
      {/* Range Filter */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        {[7, 14, 30].map(r => (
          <button key={r} onClick={() => setRange(r)} style={{
            padding: "6px 14px", borderRadius: "6px", border: "none",
            cursor: "pointer", fontSize: "13px",
            background: range === r ? "#38bdf8" : "#1e293b",
            color: range === r ? "#0f172a" : "#94a3b8"
          }}>{r}d</button>
        ))}
      </div>

      <div style={card}>
        <h2 style={title}>❤️ Heart Rate Trend</h2>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={filtered}>
            <CartesianGrid {...grid} />
            <XAxis dataKey="date" tick={axis} />
            <YAxis tick={{ fill: "#94a3b8" }} />
            <Tooltip {...tooltip} />
            <Line type="monotone" dataKey="heart_rate"
              stroke="#f43f5e" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={card}>
        <h2 style={title}>😴 Sleep Hours</h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={filtered}>
            <CartesianGrid {...grid} />
            <XAxis dataKey="date" tick={axis} />
            <YAxis tick={{ fill: "#94a3b8" }} />
            <Tooltip {...tooltip} />
            <Bar dataKey="sleep_hours" fill="#818cf8" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={card}>
        <h2 style={title}>👟 Daily Steps</h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={filtered}>
            <CartesianGrid {...grid} />
            <XAxis dataKey="date" tick={axis} />
            <YAxis tick={{ fill: "#94a3b8" }} />
            <Tooltip {...tooltip} />
            <Bar dataKey="steps" fill="#34d399" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={card}>
        <h2 style={title}>🔥 Calories Burned</h2>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={filtered}>
            <CartesianGrid {...grid} />
            <XAxis dataKey="date" tick={axis} />
            <YAxis tick={{ fill: "#94a3b8" }} />
            <Tooltip {...tooltip} />
            <Line type="monotone" dataKey="calories"
              stroke="#fbbf24" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}