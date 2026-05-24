import Navbar from "../components/Navbar";
export default function Home() {
  return (
    <div className="p-10">
      <h1 className="text-5xl font-bold text-blue-400">
        Tailwind شغال 🚀
      </h1>
    </div>
  );
}
export default function Home() {
  const categories = [
    {
      icon: "💻",
      title: "التقنية والأمن السيبراني",
      desc: "تعلم البرمجة، الشبكات، الأمن السيبراني والذكاء الاصطناعي."
    },
    {
      icon: "🩺",
      title: "الطب والعلوم الصحية",
      desc: "مصادر طبية، دورات، شرح ومجتمع للطلاب الصحيين."
    },
    {
      icon: "🏗️",
      title: "الهندسة",
      desc: "تخصصات الهندسة المختلفة مع محتوى تدريبي متكامل."
    },
    {
      icon: "🌍",
      title: "اللغات",
      desc: "تعلم الإنجليزية، الألمانية، الفرنسية وغيرها."
    },
    {
      icon: "🧠",
      title: "المهارات والتطوير",
      desc: "مهارات العمل الحر، التصميم، الإنتاجية والتطوير الشخصي."
    },
    {
      icon: "🤖",
      title: "المساعد الذكي AI",
      desc: "تلخيص ملفات PDF، شرح الدروس، ومساعد دراسي ذكي."
    }
  ];

  return (
    <div
      style={{
        background: "#020617",
        minHeight: "100vh",
        color: "white",
        fontFamily: "sans-serif"
      }}
    >
      <Navbar />

      {/* Hero Section */}
      <section
        style={{
          textAlign: "center",
          padding: "90px 20px"
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            marginBottom: "20px"
          }}
        >
          🚀 مستقبل التعلم يبدأ من هنا
        </h1>

        <p
          style={{
            maxWidth: "700px",
            margin: "auto",
            color: "#94a3b8",
            fontSize: "20px",
            lineHeight: "1.8"
          }}
        >
          منصة تعليمية ذكية تجمع الدراسة الجامعية، المهارات،
          الدورات، المجتمع الطلابي، والذكاء الاصطناعي
          في مكان واحد.
        </p>

        <div
          style={{
            marginTop: "35px",
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            flexWrap: "wrap"
          }}
        >
          <button
            style={{
              background: "#0ea5e9",
              border: "none",
              padding: "15px 30px",
              borderRadius: "12px",
              color: "white",
              fontSize: "18px",
              cursor: "pointer"
            }}
          >
            ابدأ التعلم
          </button>

          <button
            style={{
              background: "transparent",
              border: "1px solid #334155",
              padding: "15px 30px",
              borderRadius: "12px",
              color: "white",
              fontSize: "18px",
              cursor: "pointer"
            }}
          >
            استكشف التخصصات
          </button>
        </div>
      </section>

      {/* Categories */}
      <section
        style={{
          padding: "50px 8%"
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "40px",
            fontSize: "35px"
          }}
        >
          📚 مجالات التعلم
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px,1fr))",
            gap: "20px"
          }}
        >
          {categories.map((item, index) => (
            <div
              key={index}
              style={{
                background: "#0f172a",
                borderRadius: "20px",
                padding: "25px",
                border: "1px solid rgba(255,255,255,0.08)"
              }}
            >
              <h2>{item.icon}</h2>

              <h3>{item.title}</h3>

              <p
                style={{
                  color: "#94a3b8",
                  lineHeight: "1.7"
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "40px",
          color: "#64748b"
        }}
      >
        © 2026 NexPath — منصة التعليم الذكية
      </footer>
    </div>
  );
}
