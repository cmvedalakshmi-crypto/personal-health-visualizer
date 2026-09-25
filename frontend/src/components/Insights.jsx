export default function Insights({ insights, anomalies }) {
  return (
    <div>
      {/* AI Insights */}
      <div style={{ background: "#1e293b", padding: "20px",
        borderRadius: "10px", marginBottom: "20px" }}>
        <h2 style={{ color: "#38bdf8", marginTop: 0 }}>🤖 AI Insights</h2>
        {insights && (
          <>
            <p>💡 Heart rate <strong style={{ color: "#f43f5e" }}>
              {insights.avg_heart_rate} bpm</strong> —
              {insights.avg_heart_rate > 80
                ? " slightly elevated, try relaxation techniques."
                : " within normal range!"}
            </p>
            <p>💡 Sleep <strong style={{ color: "#818cf8" }}>
              {insights.avg_sleep} hrs</strong> —
              {insights.avg_sleep < 7
                ? " below 7-8 hrs recommended. Sleep earlier."
                : " great sleep pattern!"}
            </p>
            <p>💡 Steps <strong style={{ color: "#34d399" }}>
              {insights.avg_steps}</strong> —
              {insights.avg_steps < 8000
                ? " below 10k goal. Try a short walk daily."
                : " excellent activity level!"}
            </p>
          </>
        )}
      </div>

      {/* Detailed Anomalies */}
      {anomalies.length > 0 && (
        <div style={{ background: "#7f1d1d", padding: "20px",
          borderRadius: "10px", marginBottom: "20px" }}>
          <h2 style={{ marginTop: 0 }}>⚠️ Anomalies Detected ({anomalies.length})</h2>
          {anomalies.map((a, i) => (
            <div key={i} style={{ background: "#991b1b", padding: "12px",
              borderRadius: "8px", marginBottom: "10px" }}>
              <p style={{ margin: "0 0 4px", fontWeight: "600", color: "#fca5a5" }}>
                {a.type} — {a.date}
              </p>
              <p style={{ margin: 0, fontSize: "13px", color: "#fecaca" }}>{a.msg}</p>
            </div>
          ))}
        </div>
      )}

      {anomalies.length === 0 && (
        <div style={{ background: "#14532d", padding: "20px",
          borderRadius: "10px", textAlign: "center" }}>
          <p style={{ fontSize: "1.2rem", margin: 0 }}>✅ No anomalies detected!</p>
          <p style={{ color: "#86efac", margin: "6px 0 0" }}>Your health data looks normal.</p>
        </div>
      )}
    </div>
  );
}