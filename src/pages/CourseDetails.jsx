import { useParams, Link } from "react-router-dom";

export default function CourseDetails() {
  const { id } = useParams();

  const course = {
    title: "الأمن السيبراني للمبتدئين",
    desc: "تعلم أساسيات الاختراق الأخلاقي، الحماية، الشبكات والأمن الرقمي.",
    lessons: [
      "مقدمة في الأمن السيبراني",
      "أنواع الهجمات الإلكترونية",
      "حماية الأنظمة",
      "أساسيات الشبكات",
      "اختبار الاختراق"
    ]
  };

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.header}>
        <h1>📘 {course.title}</h1>
        <p>{course.desc}</p>
      </div>

      {/* LESSONS */}
      <div style={styles.box}>
        <h2>📚 الدروس</h2>

        {course.lessons.map((l, i) => (
          <div key={i} style={styles.lesson}>
            <span>📌</span>
            <p>{l}</p>
          </div>
        ))}
      </div>

      {/* BUTTON */}
      <div style={styles.actions}>
        <Link to="/" style={styles.btn}>
          ⬅ العودة للرئيسية
        </Link>
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

  box: {
    background: "#111827",
    padding: "20px",
    borderRadius: "15px"
  },

  lesson: {
    display: "flex",
    gap: "10px",
    padding: "10px",
    borderBottom: "1px solid rgba(255,255,255,0.05)"
  },

  actions: {
    marginTop: "20px",
    textAlign: "center"
  },

  btn: {
    background: "#0ea5e9",
    padding: "10px 20px",
    borderRadius: "10px",
    color: "white",
    textDecoration: "none"
  }
};
