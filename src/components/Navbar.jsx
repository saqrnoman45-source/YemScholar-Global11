import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        background: "#0f172a",
        padding: "20px 8%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid rgba(255,255,255,0.1)"
      }}
    >
      <h2 style={{ color: "#38bdf8" }}>
        NEXPATH
      </h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap"
        }}
      >
        <Link to="/" style={linkStyle}>الرئيسية</Link>
        <Link to="/explore" style={linkStyle}>استكشف</Link>
        <Link to="/courses" style={linkStyle}>الدورات</Link>
        <Link to="/community" style={linkStyle}>المجتمع</Link>
        <Link to="/jobs" style={linkStyle}>الوظائف</Link>
        <Link to="/ai" style={linkStyle}>AI</Link>
      </div>
    </nav>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none"
};
