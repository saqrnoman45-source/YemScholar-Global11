export default function App() {
  const cards = [
    {
      title: "الدورات التعليمية",
      text: "تعلم البرمجة، الأمن السيبراني، الذكاء الاصطناعي وأكثر.",
      icon: "📚",
    },
    {
      title: "المنح الدراسية",
      text: "اكتشف فرص المنح حول العالم وقدّم بسهولة.",
      icon: "🌍",
    },
    {
      title: "الأبحاث العلمية",
      text: "ابحث عن أحدث الأبحاث والموارد الأكاديمية.",
      icon: "🔬",
    },
    {
      title: "القدرات والمهارات",
      text: "اختبارات ذكية لتطوير مهاراتك وقدراتك.",
      icon: "🧠",
    },
  ];

  return (
    <div
      style={{
        background: "#020617",
        color: "white",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 8%",
          borderBottom: "1px solid #1e293b",
          position: "sticky",
          top: 0,
          background: "#020617",
        }}
      >
        <h2 style={{ color: "#38bdf8" }}>NexPath</h2>

        <div style={{ display: "flex", gap: "20px", fontSize: "14px" }}>
          <span>الرئيسية</span>
          <span>الدورات</span>
          <span>المنح</span>
          <span>الأبحاث</span>
          <span>المهارات</span>
        </div>
      </nav>

      {/* Hero */}
      <section
        style={{
          textAlign: "center",
          padding: "100px 20px",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            maxWidth: "900px",
            margin: "auto",
          }}
        >
          🚀 منصة تعليمية ذكية لتطوير مستقبلك
        </h1>

        <p
          style={{
            color: "#94a3b8",
            maxWidth: "700px",
            margin: "25px auto",
            fontSize: "18px",
            lineHeight: 1.8,
          }}
        >
          تعلم، ابحث عن منح دراسية، اكتشف الأبحاث العلمية،
          وطوّر مهاراتك باستخدام الذكاء الاصطناعي.
        </p>

        <button
          style={{
            padding: "15px 35px",
            background: "#38bdf8",
            border: "none",
            borderRadius: "14px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          ابدأ الآن
        </button>
      </section>

      {/* Cards */}
      <section
        style={{
          padding: "50px 8%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            style={{
              background: "#0f172a",
              padding: "30px",
              borderRadius: "20px",
              border: "1px solid #1e293b",
            }}
          >
            <h2 style={{ fontSize: "35px" }}>{card.icon}</h2>

            <h3>{card.title}</h3>

            <p style={{ color: "#94a3b8" }}>
              {card.text}
            </p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "40px",
          borderTop: "1px solid #1e293b",
          marginTop: "50px",
          color: "#94a3b8",
        }}
      >
        © 2026 NexPath - YemScholar Global
      </footer>
    </div>
  );
}
