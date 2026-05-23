export default function Dashboard() {
  return (
    <div>
      <h1>📊 Dashboard</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "15px",
        marginTop: "20px"
      }}>
        <div style={{ background: "#1f2937", padding: "20px", borderRadius: "10px" }}>
          📚 Courses
        </div>

        <div style={{ background: "#1f2937", padding: "20px", borderRadius: "10px" }}>
          👥 Users
        </div>

        <div style={{ background: "#1f2937", padding: "20px", borderRadius: "10px" }}>
          ⚡ Activity
        </div>
      </div>
    </div>
  );
}
