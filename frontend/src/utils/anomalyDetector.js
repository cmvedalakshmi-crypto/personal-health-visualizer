export function detectAnomalies(data) {
  if (!data.length) return [];
  const anomalies = [];

  const avgHR = data.reduce((s, d) => s + d.heart_rate, 0) / data.length;
  const avgSleep = data.reduce((s, d) => s + d.sleep_hours, 0) / data.length;
  const avgSteps = data.reduce((s, d) => s + d.steps, 0) / data.length;

  data.forEach(day => {
    if (day.heart_rate > avgHR * 1.25)
      anomalies.push({
        date: day.date,
        type: "High Heart Rate",
        severity: "high",
        msg: `${day.heart_rate} bpm — 25% above your average of ${Math.round(avgHR)}`
      });
    if (day.sleep_hours < avgSleep * 0.6)
      anomalies.push({
        date: day.date,
        type: "Very Low Sleep",
        severity: "medium",
        msg: `Only ${day.sleep_hours} hrs — well below your ${avgSleep.toFixed(1)} hr average`
      });
    if (day.steps < avgSteps * 0.3)
      anomalies.push({
        date: day.date,
        type: "Step Drop",
        severity: "medium",
        msg: `Only ${day.steps} steps — 70%+ below your daily average`
      });
  });

  return anomalies;
}