export default function Goals({ avgHR, avgSleep, avgSteps, avgCalories }) {
  const goals = [
    { label: "❤️ Heart Rate", current: avgHR, target: 70, unit: "bpm",
      color: "#f43f5e", lowerIsBetter: true },
    { label: "😴 Sleep", current: avgSleep, target: 8, unit: "hrs",
      color: "#818cf8", lowerIsBetter: false },
    { label: "👟 Daily Steps", current: avgSteps, target: 10000, unit: "steps",
      color: "#34d399", lowerIsBetter: false },
    { label: "🔥 Calories", current: avgCalories, target: 2500, unit: "kcal",
      color: "#fbbf24", lowerIsBetter: false },
  ];

  return (
    <div>
      <h2 style={{ color: "#38bdf8", marginTop: 0 }}>🎯 Health Goals</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: "16px" }}>
        {goals.map((g, i) => {
          const pct = g.lowerIsBetter
            ? Math.min(100, Math.round((g.target / g.current) * 100))
            : Math.min(100, Math.round((g.current / g.target) * 100));
          return (
            <div key={i} style={{ background: "#1e293b", padding: "16px",
              borderRadius: "10px" }}>
              <p style={{ margin: "0 0 8px", fontWeight: "600" }}>{g.label}</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                <span style={{ fontSize: "1.6rem", fontWeight: "700",
                  color: g.color }}>{g.current}</span>
                <span style={{ color: "#64748b", fontSize: "12px" }}>
                  / {g.target} {g.unit}
                </span>
              </div>
              <div style={{ marginTop: "10px", background: "#334155",
                borderRadius: "4px", height: "8px", overflow: "hidden" }}>
                <div style={{ width: `${pct}%`, height: "100%",
                  background: g.color, borderRadius: "4px",
                  transition: "width 0.8s ease" }}/>
              </div>
              <p style={{ fontSize: "11px", color: "#64748b",
                margin: "6px 0 0" }}>{pct}% of goal</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}