export default function App() {
  const features = [
    {
      icon: "🛡️",
      title: "الأمن السيبراني",
      text: "تعلم الاختراق الأخلاقي، الدفاع السيبراني، وتحليل الثغرات."
    },
    {
      icon: "🤖",
      title: "الذكاء الاصطناعي",
      text: "تلخيص ملفات PDF والفيديوهات ومساعد دراسي ذكي."
    },
    {
      icon: "🌍",
      title: "المنح الدراسية",
      text: "اكتشف أفضل المنح العالمية المناسبة لك."
    },
    {
      icon: "🧠",
      title: "اختبارات المهارات",
      text: "قيّم مستواك وطوّر قدراتك بخطط ذكية."
    }
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #0f172a, #020617 60%)",
        color: "white",
        fontFamily: "Arial, sans-serif"
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "25px 8%",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
          position: "sticky",
          top: 0,
          background: "rgba(2,6,23,0.8)",
          zIndex: 1000
        }}
      >
        <h2
          style={{
            color: "#38bdf8",
            textShadow: "0 0 20px #38bdf8"
          }}
        >
          NEXPATH
        </h2>

        <div style={{ display: "flex", gap: "20px" }}>
          <span>الرئيسية</span>
          <span>الدورات</span>
          <span>Cyber</span>
          <span>المنح</span>
        </div>
      </nav>

      {/* Hero */}
      <section
        style={{
          textAlign: "center",
          padding: "100px 20px"
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "10px 20px",
            border: "1px solid #38bdf8",
            borderRadius: "999px",
            marginBottom: "25px",
            color: "#38bdf8",
            boxShadow: "0 0 20px rgba(56,189,248,0.4)"
          }}
        >
          مستقبل التعليم والأمن السيبراني
        </div>

        <h1
          style={{
            fontSize: "55px",
            maxWidth: "900px",
            margin: "auto",
            lineHeight: 1.3
          }}
        >
          🚀 منصة يمنية ذكية لتعلم
          <span style={{ color: "#38bdf8" }}>
            {" "}الأمن السيبراني
          </span>
          {" "}والتقنية الحديثة
        </h1>

        <p
          style={{
            color: "#94a3b8",
            maxWidth: "750px",
            margin: "30px auto",
            fontSize: "18px",
            lineHeight: 1.8
          }}
        >
          تعلم، اختبر مهاراتك، احصل على منح،
          واستخدم الذكاء الاصطناعي لتطوير مستقبلك.
        </p>

        <div
          style={{
            display: "flex",
            gap: "15px",
            justifyContent: "center",
            flexWrap: "wrap"
          }}
        >
          <button
            style={{
              padding: "15px 35px",
              background: "#38bdf8",
              border: "none",
              borderRadius: "14px",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 0 30px rgba(56,189,248,0.5)"
            }}
          >
            ابدأ الآن
          </button>

          <button
            style={{
              padding: "15px 35px",
              background: "transparent",
              border: "1px solid #334155",
              color: "white",
              borderRadius: "14px",
              cursor: "pointer"
            }}
          >
            استكشف المنصة
          </button>
        </div>
      </section>

      {/* Cards */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          padding: "40px 8%"
        }}
      >
        {features.map((item, index) => (
          <div
            key={index}
            style={{
              background: "rgba(15,23,42,0.8)",
              border: "1px solid rgba(56,189,248,0.2)",
              borderRadius: "24px",
              padding: "30px",
              transition: "0.3s",
              boxShadow:
                "0 0 20px rgba(56,189,248,0.08)"
            }}
          >
            <div style={{ fontSize: "40px" }}>
              {item.icon}
            </div>

            <h3>{item.title}</h3>

            <p style={{ color: "#94a3b8" }}>
              {item.text}
            </p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "40px",
          color: "#64748b",
          borderTop:
            "1px solid rgba(255,255,255,0.1)"
        }}
      >
        © 2026 NEXPATH — Cyber Education Platform
      </footer>
    </div>
  );
}
