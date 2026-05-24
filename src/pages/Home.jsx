import { Link } from "react-router-dom";

export default function Home() {
  const cards = [
    { icon: "💻", title: "التقنية والسيبر", desc: "تعلم البرمجة والأمن السيبراني" },
    { icon: "🩺", title: "الطب", desc: "مصادر طبية ودراسة احترافية" },
    { icon: "🏗️", title: "الهندسة", desc: "جميع تخصصات الهندسة" },
    { icon: "🌍", title: "اللغات", desc: "تعلم الإنجليزية واللغات العالمية" },
    { icon: "🧠", title: "المهارات", desc: "تطوير الذات والعمل الحر" },
    { icon: "🤖", title: "AI مساعد", desc: "تلخيص، شرح، ومساعدة ذكية" },
  ];

  return (
    <div style={styles.page}>
      
      {/* HERO */}
      <section style={styles.hero}>
        <h1 style={styles.title}>🚀 ابدأ مستقبلك من هنا</h1>
        <p style={styles.subtitle}>
          منصة تعليم ذكية تجمع الدراسة + المهارات + المجتمع + الذكاء الاصطناعي
        </p>

        <div style={styles.actions}>
          <Link to="/explore" style={styles.primaryBtn}>
            استكشف الآن
          </Link>

          <Link to="/courses" style={styles.secondaryBtn}>
            الدورات
          </Link>
        </div>
      </section>

      {/* STATS */}
      <section style={styles.stats}>
        <div style={styles.statBox}>🎓 120+ دورة</div>
        <div style={styles.statBox}>👨‍🎓 500+ طالب</div>
        <div style={styles.statBox}>🤖 AI مساعد ذكي</div>
      </section>

      {/* CARDS */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>📚 التخصصات</h2>

        <div style={styles.grid}>
          {cards.map((c, i) => (
            <div key={i} style={styles.card}>
              <h2>{c.icon}</h2>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        © 2026 NexPath — مستقبل التعليم الذكي
      </footer>
    </div>
  );
}

/* 🎨 STYLES */
const styles = {
  page: {
  background: "#0b1220",
  color: "white",
  minHeight: "100vh",
  fontFamily: "sans-serif",
  marginRight: "0"
},

  hero: {
    textAlign: "center",
    padding: "80px 20px"
  },

  title: {
    fontSize: "48px",
    marginBottom: "10px"
  },

  subtitle: {
    color: "#94a3b8",
    fontSize: "18px",
    maxWidth: "700px",
    margin: "auto"
  },

  actions: {
    marginTop: "25px",
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap"
  },

  primaryBtn: {
    background: "#0ea5e9",
    padding: "12px 25px",
    borderRadius: "10px",
    color: "white",
    textDecoration: "none"
  },

  secondaryBtn: {
    background: "transparent",
    border: "1px solid #334155",
    padding: "12px 25px",
    borderRadius: "10px",
    color: "white",
    textDecoration: "none"
  },

  stats: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap",
    padding: "30px"
  },

  statBox: {
    background: "#111827",
    padding: "15px 20px",
    borderRadius: "12px"
  },

  section: {
    padding: "40px"
  },

  sectionTitle: {
    textAlign: "center",
    marginBottom: "20px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))",
    gap: "15px"
  },

  card: {
    background: "#1f2937",
    padding: "20px",
    borderRadius: "12px"
  },

  footer: {
    textAlign: "center",
    padding: "30px",
    color: "#64748b"
  }
};
