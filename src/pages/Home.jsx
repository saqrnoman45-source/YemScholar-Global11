import Navbar from "../components/Navbar";

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
            marginTop: "35
