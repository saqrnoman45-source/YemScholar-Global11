import Navbar from "../components/Navbar";

export default function Home() {
  const stats = [
    { label: "طالب نشط", value: "12,000+" },
    { label: "دورة تعليمية", value: "350+" },
    { label: "مجال تعليمي", value: "6" },
    { label: "تقييم الطلاب", value: "4.9⭐" }
  ];

  const cards = [
    {
      title: "🩺 الطب",
      desc: "تعلم الطب، المراجع، والمهارات السريرية"
    },
    {
      title: "💻 التقنية",
      desc: "برمجة، أمن سيبراني، ذكاء اصطناعي"
    },
    {
      title: "🏗️ الهندسة",
      desc: "مدني، كهرباء، ميكانيكا، عمارة"
    },
    {
      title: "🌍 اللغات",
      desc: "تعلم الإنجليزية والألمانية والفرنسية"
    },
    {
      title: "🧠 المهارات",
      desc: "تطوير الذات، التصميم، الإنتاجية"
    },
    {
      title: "🤖 الذكاء الاصطناعي",
      desc: "مساعد ذكي + تلخيص + شرح الدروس"
    }
  ];

  return (
    <div style={styles.page}>
      <Navbar />

      {/* HERO */}
      <section style={styles.hero}>
        <h1 style={styles.title}>
          🚀 NexPath — مستقبل التعلم الذكي
        </h1>

        <p style={styles.subtitle}>
          منصة تجمع الطب، الهندسة، التقنية، اللغات، والذكاء الاصطناعي في مكان واحد
        </p>

        <div style={styles.buttons}>
          <button style={styles.primary}>ابدأ الآن</button>
          <button style={styles.secondary}>استكشف المنصة</button>
        </div>
      </section>

      {/* STATS */}
      <section style={styles.stats}>
        {stats.map((s, i) => (
          <div key={i} style={styles.statBox}>
            <h2>{s.value}</h2>
            <p>{s.label}</p>
          </div>
        ))}
      </section>

      {/* CATEGORIES */}
      <section style={styles.grid}>
        {cards.map((c, i) => (
          <div key={i} style={styles.card}>
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
          </div>
        ))}
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        © 2026 NexPath — منصة التعليم الذكي
      </footer>
    </div>
  );
}

const styles = {
  page: {
    background: "#020617",
    color: "white",
    minHeight: "100vh",
    fontFamily: "sans-serif"
  },

  hero: {
    textAlign: "center",
    padding: "90px 20px"
  },

  title: {
    fontSize: "42px",
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
    gap: "15px"
  },

  primary: {
    background: "#0ea5e9",
    border: "none",
    padding: "12px 25px",
    borderRadius: "10px",
    color: "white",
    cursor: "pointer"
  },

  secondary: {
    background: "transparent",
    border: "1px solid #334155",
    padding: "12px 25px",
    borderRadius: "10px",
    color: "white",
    cursor: "pointer"
  },

  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px,1fr))",
    gap: "15px",
    padding: "40px 8%"
  },

  statBox: {
    background: "#0f172a",
    padding: "20px",
    borderRadius: "15px",
    textAlign: "center",
    border: "1px solid rgba(255,255,255,0.05)"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
    gap: "20px",
    padding: "40px 8%"
  },

  card: {
    background: "#0f172a",
    padding: "20px",
    borderRadius: "15px",
    border: "1px solid rgba(255,255,255,0.05)"
  },

  footer: {
    textAlign: "center",
    padding: "30px",
    color: "#64748b"
  }
};
