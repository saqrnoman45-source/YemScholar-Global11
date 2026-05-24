import { Link } from "react-router-dom";

export default function Courses() {
  const courses = [
  {
    id: "cyber",
    title: "الأمن السيبراني للمبتدئين",
    desc: "تعلم أساسيات الاختراق الأخلاقي والحماية",
    level: "مبتدئ",
    icon: "🛡️"
  },
  {
    id: "web",
    title: "تطوير الويب",
    desc: "React + JavaScript + مشاريع حقيقية",
    level: "متوسط",
    icon: "💻"
  },
  {
    id: "med",
    title: "الطب الأساسي",
    desc: "مبادئ التشريح والعلوم الطبية",
    level: "مبتدئ",
    icon: "🩺"
  },
  {
    id: "eng",
    title: "الهندسة الحديثة",
    desc: "مفاهيم الهندسة العملية والبرمجية",
    level: "متوسط",
    icon: "🏗️"
  },
  {
    id: "ai",
    title: "الذكاء الاصطناعي",
    desc: "تعلم AI وMachine Learning من الصفر",
    level: "متقدم",
    icon: "🤖"
  }
];

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.header}>
        <h1>📚 الدورات التعليمية</h1>
        <p>اختر الدورة وابدأ التعلم فورًا</p>
      </div>

      {/* GRID */}
      <div style={styles.grid}>
        {courses.map((c, i) => (
          <div key={i} style={styles.card}>
            <h2>{c.icon}</h2>
            <h3>{c.title}</h3>
            <p>{c.desc}</p>

            <span style={styles.level}>
              {c.level}
            </span>

            <Link to={`/course/${c.id}`} style={styles.btn}>
             ابدأ الدورة
              </Link>

          </div>
        ))}
      </div>

    </div>
  );
}

/* 🎨 STYLE */
const styles = {
  page: {
    background: "#0b1220",
    minHeight: "100vh",
    color: "white",
    padding: "40px",
    paddingRight: "260px"
  },

  header: {
    textAlign: "center",
    marginBottom: "30px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px,1fr))",
    gap: "20px"
  },

  card: {
    background: "#111827",
    padding: "20px",
    borderRadius: "15px",
    border: "1px solid rgba(255,255,255,0.05)"
  },

  level: {
    display: "inline-block",
    marginTop: "10px",
    padding: "5px 10px",
    borderRadius: "8px",
    background: "#0ea5e9",
    fontSize: "12px"
  },

  btn: {
    display: "block",
    marginTop: "15px",
    textAlign: "center",
    padding: "10px",
    background: "#1f2937",
    borderRadius: "10px",
    color: "white",
    textDecoration: "none"
  }
};
