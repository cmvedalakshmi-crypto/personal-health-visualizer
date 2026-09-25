import Papa from "papaparse";

export default function UploadData({ onLoad, onManual }) {

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (results) => onLoad(results.data)
    });
  };

  const handleManual = async (e) => {
    e.preventDefault();
    const f = e.target;
    const entry = {
      date:        f.date.value,
      heart_rate:  Number(f.hr.value),
      sleep_hours: Number(f.sleep.value),
      steps:       Number(f.steps.value),
      calories:    Number(f.calories.value),
    };
    try {
      const res = await fetch("http://localhost:5000/api/add-entry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry)
      });
      const result = await res.json();
      onManual(entry);
      f.reset();
      alert("✅ " + result.message);
    } catch (err) {
      alert("❌ Could not save. Is backend running?");
    }
  };

  return (
    <div>
      {/* CSV Upload */}
      <div style={{
        background: "#1e293b", padding: "24px", borderRadius: "12px",
        marginBottom: "20px", textAlign: "center",
        border: "2px dashed #334155"
      }}>
        <p style={{ fontSize: "2rem", margin: 0 }}>📂</p>
        <h3 style={{ color: "#38bdf8", margin: "8px 0 4px" }}>
          Upload Health Data
        </h3>
        <p style={{ color: "#94a3b8", fontSize: "13px", marginBottom: "12px" }}>
          CSV with columns: date, heart_rate, sleep_hours, steps, calories
        </p>
        <input
          type="file"
          accept=".csv"
          onChange={handleFile}
          style={{ color: "#94a3b8" }}
        />
      </div>

      {/* Manual Entry */}
      <div style={{ background: "#1e293b", padding: "20px", borderRadius: "12px" }}>
        <h3 style={{ color: "#38bdf8", marginTop: 0 }}>✏️ Manual Entry</h3>
        <form onSubmit={handleManual}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px"
          }}>

            {/* Date */}
            <div>
              <label style={{
                fontSize: "12px", color: "#94a3b8",
                display: "block", marginBottom: "4px"
              }}>Date</label>
              <input
                name="date" type="date" required
                style={{
                  width: "100%", padding: "8px 10px",
                  borderRadius: "6px", border: "1px solid #334155",
                  background: "#0f172a", color: "white", fontSize: "14px"
                }}
              />
            </div>

            {/* Heart Rate */}
            <div>
              <label style={{
                fontSize: "12px", color: "#94a3b8",
                display: "block", marginBottom: "4px"
              }}>Heart Rate (bpm)</label>
              <input
                name="hr" type="number" step="1"
                min="40" max="200" required
                style={{
                  width: "100%", padding: "8px 10px",
                  borderRadius: "6px", border: "1px solid #334155",
                  background: "#0f172a", color: "white", fontSize: "14px"
                }}
              />
            </div>

            {/* Sleep */}
            <div>
              <label style={{
                fontSize: "12px", color: "#94a3b8",
                display: "block", marginBottom: "4px"
              }}>Sleep (hours)</label>
              <input
                name="sleep" type="number" step="0.1"
                min="0" max="24" required
                style={{
                  width: "100%", padding: "8px 10px",
                  borderRadius: "6px", border: "1px solid #334155",
                  background: "#0f172a", color: "white", fontSize: "14px"
                }}
              />
            </div>

            {/* Steps */}
            <div>
              <label style={{
                fontSize: "12px", color: "#94a3b8",
                display: "block", marginBottom: "4px"
              }}>Steps</label>
              <input
                name="steps" type="number" step="1"
                min="0" max="100000" required
                style={{
                  width: "100%", padding: "8px 10px",
                  borderRadius: "6px", border: "1px solid #334155",
                  background: "#0f172a", color: "white", fontSize: "14px"
                }}
              />
            </div>

            {/* Calories */}
            <div>
              <label style={{
                fontSize: "12px", color: "#94a3b8",
                display: "block", marginBottom: "4px"
              }}>Calories</label>
              <input
                name="calories" type="number" step="1"
                min="0" max="10000" required
                style={{
                  width: "100%", padding: "8px 10px",
                  borderRadius: "6px", border: "1px solid #334155",
                  background: "#0f172a", color: "white", fontSize: "14px"
                }}
              />
            </div>

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              marginTop: "16px", padding: "10px 24px",
              background: "#38bdf8", color: "#0f172a",
              border: "none", borderRadius: "8px",
              fontWeight: "600", cursor: "pointer", fontSize: "14px"
            }}>
            💾 Save Entry
          </button>

        </form>
      </div>
    </div>
  );
}