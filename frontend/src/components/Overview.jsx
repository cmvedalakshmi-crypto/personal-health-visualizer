export default function Overview({ avgHR, avgSleep, avgSteps, avgCalories, wellnessScore, anomalyCount, correlations }) {

  const cards = [
    {
      label: "Avg Heart Rate",
      value: parseFloat(avgHR).toFixed(1),
      unit: "bpm",
      color: "#f43f5e",
      icon: "❤️",
      tip: avgHR > 80 ? "▲ Slightly elevated" : "✓ Normal range"
    },
    {
      label: "Avg Sleep",
      value: parseFloat(avgSleep).toFixed(1),
      unit: "hours",
      color: "#818cf8",
      icon: "😴",
      tip: avgSleep < 7 ? "▼ Below 7hr target" : "✓ Good sleep"
    },
    {
      label: "Avg Steps",
      value: Math.round(avgSteps).toLocaleString(),
      unit: "steps/day",
      color: "#34d399",
      icon: "👟",
      tip: avgSteps < 8000 ? "▼ Below 10k goal" : "✓ Great activity"
    },
    {
      label: "Calories Burned",
      value: Math.round(avgCalories).toLocaleString(),
      unit: "kcal/day",
      color: "#fbbf24",
      icon: "🔥",
      tip: "Daily average"
    },
    {
      label: "Anomalies",
      value: anomalyCount,
      unit: "detected",
      color: "#fb923c",
      icon: "⚠️",
      tip: anomalyCount > 0 ? "Check Insights tab" : "✓ All clear"
    },
  ];

  return (
    <div>

      {/* Wellness Score Ring */}
      <div style={{
        background: "#1e293b",
        borderRadius: "12px",
        padding: "20px",
        marginBottom: "20px",
        display: "flex",
        alignItems: "center",
        gap: "20px"
      }}>
        <svg width="80" height="80" viewBox="0 0 80 80">
          <circle
            cx="40" cy="40" r="32"
            fill="none"
            stroke="#334155"
            strokeWidth="8"
          />
          <circle
            cx="40" cy="40" r="32"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="8"
            strokeDasharray={`${(wellnessScore / 100) * 201} 201`}
            strokeLinecap="round"
            transform="rotate(-90 40 40)"
          />
          <text
            x="40" y="46"
            textAnchor="middle"
            fontSize="18"
            fontWeight="bold"
            fill="#38bdf8"
          >
            {wellnessScore}
          </text>
        </svg>
        <div>
          <p style={{ fontSize: "20px", fontWeight: "600", margin: 0 }}>
            Wellness Score: {wellnessScore}/100
          </p>
          <p style={{ color: "#94a3b8", margin: "4px 0 0", fontSize: "14px" }}>
            {wellnessScore >= 80
              ? "Excellent! Keep it up 🎉"
              : wellnessScore >= 60
              ? "Good overall. Small improvements needed."
              : "Needs attention. Check your insights."}
          </p>
        </div>
      </div>

      {/* Metric Cards */}
      <div style={{
        display: "flex",
        gap: "12px",
        flexWrap: "wrap",
        justifyContent: "center",
        marginBottom: "20px"
      }}>
        {cards.map((c, i) => (
          <div key={i} style={{
            background: "#1e293b",
            padding: "16px",
            borderRadius: "10px",
            textAlign: "center",
            minWidth: "140px",
            flex: "1"
          }}>
            <h3 style={{
              color: c.color,
              margin: "0 0 8px",
              fontSize: "14px"
            }}>
              {c.icon} {c.label}
            </h3>
            <p style={{
              fontSize: "1.8rem",
              margin: 0,
              fontWeight: "600"
            }}>
              {c.value}
            </p>
            <p style={{
              color: "#94a3b8",
              margin: "2px 0",
              fontSize: "12px"
            }}>
              {c.unit}
            </p>
            <p style={{
              color: "#64748b",
              margin: "6px 0 0",
              fontSize: "11px"
            }}>
              {c.tip}
            </p>
          </div>
        ))}
      </div>

      {/* Correlations */}
      {correlations && correlations.length > 0 && (
        <div style={{
          background: "#1e293b",
          borderRadius: "12px",
          padding: "20px"
        }}>
          <h2 style={{ color: "#38bdf8", marginTop: 0 }}>
            🔗 Correlations Found
          </h2>
          {correlations.map((c, i) => (
            <div key={i} style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "12px"
            }}>
              <p style={{
                flex: 1,
                margin: 0,
                fontSize: "14px"
              }}>
                {c.label}
              </p>
              <div style={{
                width: "100px",
                height: "6px",
                background: "#334155",
                borderRadius: "3px",
                overflow: "hidden"
              }}>
                <div style={{
                  width: `${c.score}%`,
                  height: "100%",
                  background: c.color,
                  borderRadius: "3px"
                }} />
              </div>
              <span style={{
                color: c.color,
                fontWeight: "600",
                fontSize: "13px",
                minWidth: "36px"
              }}>
                {c.score}%
              </span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}