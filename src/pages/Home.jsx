

export default function Home() {
  return (
    <div style={styles.page}>
      

      {/* HERO */}
      <section style={styles.hero}>
        <h1 style={styles.title}>
          🚀 مرحباً بك في NexPath
        </h1>

        <p style={styles.subtitle}>
          منصة تعليم ذكية تجمع الطب، الهندسة، التقنية، اللغات، والمهارات في مكان واحد
        </p>

        <div style={styles.buttons}>
          <button style={styles.primaryBtn}>ابدأ التعلم</button>
          <button style={styles.secondaryBtn}>استكشف التخصصات</button>
        </div>
      </section>

      {/* STATS */}
      <section style={styles.stats}>
        <div style={styles.card}>
          <h2>🎓 +120 دورة</h2>
          <p>دورات تعليمية في جميع المجالات</p>
        </div>

        <div style={styles.card}>
          <h2>👨‍🎓 +500 طالب</h2>
          <p>مجتمع متعلم نشط</p>
        </div>

        <div style={styles.card}>
          <h2>🤖 AI مساعد</h2>
          <p>ذكاء اصطناعي للدراسة والتلخيص</p>
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>📚 التخصصات</h2>

        <div style={styles.grid}>
          <div style={styles.box}>💻 التقنية والأمن السيبراني</div>
          <div style={styles.box}>🩺 الطب والعلوم الصحية</div>
          <div style={styles.box}>🏗️ الهندسة</div>
          <div style={styles.box}>🌍 اللغات</div>
          <div style={styles.box}>🧠 المهارات والتطوير</div>
          <div style={styles.box}>🤖 الذكاء الاصطناعي</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        © 2026 NexPath — منصة تعليم ذكية
      </footer>
    </div>
  );
}

/* STYLES */
const styles = {
  page: {
    background: "#0b1220",
    minHeight: "100vh",
    color: "white",
    fontFamily: "sans-serif"
  },

  hero: {
    textAlign: "center",
    padding: "90px 20px"
  },

  title: {
    fontSize: "50px",
    marginBottom: "15px"
  },

  subtitle: {
    color: "#94a3b8",
    fontSize: "18px",
    maxWidth: "700px",
    margin: "auto"
  },

  buttons: {
    marginTop: "25px",
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap"
  },

  primaryBtn: {
    padding: "12px 25px",
    background: "#0ea5e9",
    border: "none",
    borderRadius: "10px",
    color: "white",
    cursor: "pointer"
  },

  secondaryBtn: {
    padding: "12px 25px",
    background: "transparent",
    border: "1px solid #334155",
    borderRadius: "10px",
    color: "white",
    cursor: "pointer"
  },

  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))",
    gap: "15px",
    padding: "40px 8%"
  },

  card: {
    background: "#111827",
    padding: "20px",
    borderRadius: "15px",
    textAlign: "center"
  },

  section: {
    padding: "40px 8%"
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

  box: {
    background: "#1f2937",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center"
  },

  footer: {
    textAlign: "center",
    padding: "30px",
    color: "#64748b"
  }
};
