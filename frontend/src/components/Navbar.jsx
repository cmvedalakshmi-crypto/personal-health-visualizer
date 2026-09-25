export default function Navbar({ tab, setTab }) {
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "charts", label: "Charts" },
    { id: "insights", label: "AI Insights" },
    { id: "goals", label: "Goals" },
    { id: "upload", label: "Upload Data" },
  ];

  return (
    <div style={{ display: "flex", gap: "8px", justifyContent: "center",
      flexWrap: "wrap", marginBottom: "24px" }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => setTab(t.id)} style={{
          padding: "8px 18px", borderRadius: "8px", border: "none",
          cursor: "pointer", fontSize: "14px", fontWeight: "500",
          background: tab === t.id ? "#38bdf8" : "#1e293b",
          color: tab === t.id ? "#0f172a" : "#94a3b8",
          transition: "all 0.2s"
        }}>
          {t.label}
        </button>
      ))}
    </div>
  );
}