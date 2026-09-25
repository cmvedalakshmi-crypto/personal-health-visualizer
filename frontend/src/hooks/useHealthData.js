import { useState, useEffect } from "react";
import axios from "axios";

export function useHealthData() {
  const [healthData, setHealthData] = useState([]);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/health-data")
      .then(res => setHealthData(res.data));
    axios.get("http://localhost:5000/api/insights")
      .then(res => setInsights(res.data))
      .finally(() => setLoading(false));
  }, []);

  const addEntry = (entry) => {
    setHealthData(prev => [...prev, entry]);
  };

  const loadFromCSV = (rows) => {
    setHealthData(rows);
  };

  const avgOf = (key) => {
    if (!healthData.length) return 0;
    return (healthData.reduce((s, d) => s + (d[key] || 0), 0) / healthData.length).toFixed(1);
  };

  const wellnessScore = () => {
    const hr = parseFloat(avgOf("heart_rate"));
    const sleep = parseFloat(avgOf("sleep_hours"));
    const steps = parseFloat(avgOf("steps"));
    let score = 0;
    score += hr <= 70 ? 35 : hr <= 80 ? 28 : hr <= 90 ? 18 : 8;
    score += sleep >= 8 ? 35 : sleep >= 7 ? 28 : sleep >= 6 ? 18 : 8;
    score += steps >= 10000 ? 30 : steps >= 7000 ? 22 : steps >= 5000 ? 14 : 6;
    return score;
  };

  return {
    healthData, insights, loading,
    addEntry, loadFromCSV,
    avgHR: avgOf("heart_rate"),
    avgSleep: avgOf("sleep_hours"),
    avgSteps: avgOf("steps"),
    avgCalories: avgOf("calories"),
    wellnessScore: wellnessScore()
  };
}