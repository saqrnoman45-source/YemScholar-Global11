import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        🚀 NexPath
      </div>

      <div style={styles.links}>
        <Link style={styles.link} to="/">
          الرئيسية
        </Link>

        <Link style={styles.link} to="/courses">
          الدورات
        </Link>

        <Link style={styles.link} to="/community">
          المجتمع
        </Link>

        <Link style={styles.link} to="/jobs">
          الوظائف
        </Link>

        <Link style={styles.link} to="/profile">
          الحساب
        </Link>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    background: "#111827",
    padding: "15px 8%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    position: "sticky",
    top: 0,
    zIndex: 999
  },

  logo: {
    color: "#38bdf8",
    fontSize: "22px",
    fontWeight: "bold"
  },

  links: {
    display: "flex",
    gap: "18px",
    flexWrap: "wrap"
  },

  link: {
    textDecoration: "none",
    color: "#e5e7eb",
    fontSize: "15px"
  }
};
