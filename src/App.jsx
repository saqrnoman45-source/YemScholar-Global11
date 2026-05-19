export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        fontFamily: "Arial",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px 40px",
          borderBottom: "1px solid #1e293b",
        }}
      >
        <h2 style={{ color: "#38bdf8" }}>NexPath</h2>

        <div style={{ display: "flex", gap: "20px" }}>
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
            fontSize: "50px",
            marginBottom: "20px",
          }}
        >
          🚀 أقوى منصة تعليمية في اليمن
        </h1>

        <p
          style={{
            maxWidth: "700px",
            margin: "auto",
            color: "#cbd5e1",
            fontSize: "20px",
          }}
        >
          تعلم، ابحث عن منح، طوّر مهاراتك، لخص ملفات PDF
          والفيديوهات بالذكاء الاصطناعي.
        </p>

        <button
          style={{
            marginTop: "30px",
            padding: "15px 30px",
            borderRadius: "12px",
            border: "none",
            background: "#38bdf8",
            color: "black",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          ابدأ الآن
        </button>
      </section>
    </div>
  );
}
