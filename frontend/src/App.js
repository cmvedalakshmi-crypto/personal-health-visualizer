import { useState } from "react";
import { useHealthData } from "./hooks/useHealthData";
import { detectAnomalies } from "./utils/anomalyDetector";
import { getCorrelations } from "./utils/correlations";
import Navbar from "./components/Navbar";
import Overview from "./components/Overview";
import Charts from "./components/Charts";
import Insights from "./components/Insights";
import Goals from "./components/Goals";
import UploadData from "./components/UploadData";

export default function App() {
  const [tab, setTab] = useState("overview");
  const {
    healthData, insights, loading,
    addEntry, loadFromCSV,
    avgHR, avgSleep, avgSteps, avgCalories, wellnessScore
  } = useHealthData();

  const anomalies = detectAnomalies(healthData);
  const correlations = getCorrelations(healthData);

  if (loading) return (
    <div style={{ background: "#0f172a", minHeight: "100vh", color: "white",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: "1.2rem" }}>
      Loading your health data...
    </div>
  );

  return (
    <div style={{ background: "#0f172a", minHeight: "100vh",
      color: "white", padding: "20px", fontFamily: "Arial" }}>

      <h1 style={{ color: "#38bdf8", textAlign: "center",
        fontSize: "2rem", marginBottom: "6px" }}>
        🏥 Personal Health Visualizer
      </h1>
      <p style={{ textAlign: "center", color: "#94a3b8", marginBottom: "24px" }}>
        Transforming Raw Health Data into Actionable Insights
      </p>

      <Navbar tab={tab} setTab={setTab} />

      {tab === "overview" &&
        <Overview
          avgHR={avgHR} avgSleep={avgSleep}
          avgSteps={avgSteps} avgCalories={avgCalories}
          wellnessScore={wellnessScore}
          anomalyCount={anomalies.length}
          correlations={correlations}
        />}
      {tab === "charts" && <Charts healthData={healthData} />}
      {tab === "insights" && <Insights insights={insights} anomalies={anomalies} />}
      {tab === "goals" &&
        <Goals
          avgHR={avgHR} avgSleep={avgSleep}
          avgSteps={avgSteps} avgCalories={avgCalories}
        />}
      {tab === "upload" && <UploadData onLoad={loadFromCSV} onManual={addEntry} />}

      <div style={{ textAlign: "center", color: "#475569", marginTop: "30px" }}>
        <p>🏥 Personal Health Visualizer | InCSEption 2.0 Hackathon</p>
        <p>AI / Healthcare Analytics Track</p>
      </div>
    </div>
  );
}