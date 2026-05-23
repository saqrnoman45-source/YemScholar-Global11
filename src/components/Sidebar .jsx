import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={{
      width: "240px",
      background: "#111827",
      color: "white",
      padding: "20px"
    }}>
      <h2 style={{ marginBottom: "20px" }}>🚀 NexPath</h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Link to="/">🏠 Home</Link>
        <Link to="/explore">🔍 Explore</Link>
        <Link to="/courses">📚 Courses</Link>
        <Link to="/dashboard">📊 Dashboard</Link>
        <Link to="/profile">👤 Profile</Link>
      </nav>
    </div>
  );
}
