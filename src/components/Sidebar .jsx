import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={{
      width: "250px",
      background: "#111827",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "12px"
    }}>
      <h2>🚀 NexPath</h2>

      <Link to="/">🏠 Home</Link>
      <Link to="/explore">🔍 Explore</Link>
      <Link to="/courses">📚 Courses</Link>
      <Link to="/dashboard">📊 Dashboard</Link>
      <Link to="/profile">👤 Profile</Link>
      <Link to="/login">🔐 Login</Link>
    </div>
  );
}
