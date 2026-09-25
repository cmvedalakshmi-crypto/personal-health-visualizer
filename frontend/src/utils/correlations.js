export function getCorrelations(data) {
  if (data.length < 5) return [];

  const correlations = [];

  // Check: low sleep → high HR next day
  let matchCount = 0;
  for (let i = 0; i < data.length - 1; i++) {
    const avgSleep = data.reduce((s, d) => s + d.sleep_hours, 0) / data.length;
    const avgHR = data.reduce((s, d) => s + d.heart_rate, 0) / data.length;
    if (data[i].sleep_hours < avgSleep && data[i + 1].heart_rate > avgHR)
      matchCount++;
  }
  const sleepHRScore = Math.round((matchCount / (data.length - 1)) * 100);
  correlations.push({
    label: "Less sleep → higher heart rate next day",
    score: sleepHRScore,
    color: "#f43f5e"
  });

  // Check: more steps → better sleep
  let stepsMatch = 0;
  for (let i = 0; i < data.length - 1; i++) {
    const avgSteps = data.reduce((s, d) => s + d.steps, 0) / data.length;
    const avgSleep = data.reduce((s, d) => s + d.sleep_hours, 0) / data.length;
    if (data[i].steps > avgSteps && data[i + 1].sleep_hours > avgSleep)
      stepsMatch++;
  }
  const stepsSleepScore = Math.round((stepsMatch / (data.length - 1)) * 100);
  correlations.push({
    label: "More steps → better sleep quality",
    score: stepsSleepScore,
    color: "#34d399"
  });

  return correlations;
}