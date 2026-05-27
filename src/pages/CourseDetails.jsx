import { useParams, Link } from "react-router-dom";

export default function CourseDetails() {
  const { id } = useParams();

  const courses = {
    cyber: {
      title: "الأمن السيبراني للمبتدئين",
      desc: "تعلم الاختراق الأخلاقي والحماية",
      lessons: ["مقدمة", "الهجمات", "الحماية", "الشبكات"]
    },
    web: {
      title: "تطوير الويب",
      desc: "React + JS مشاريع",
      lessons: ["HTML", "CSS", "JS", "React"]
    },
    med: {
      title: "الطب الأساسي",
      desc: "مبادئ الطب",
      lessons: ["تشريح", "أعضاء الجسم", "أمراض", "علاج"]
    },
    eng: {
      title: "الهندسة",
      desc: "الهندسة الحديثة",
      lessons: ["رياضيات", "فيزياء", "تصميم", "تطبيق"]
    },
    ai: {
      title: "الذكاء الاصطناعي",
      desc: "Machine Learning",
      lessons: ["Data", "Models", "Training", "AI Apps"]
    }
  };

  const course = courses[id];

  if (!course) {
    return <h2 style={{ color: "white" }}>الدورة غير موجودة</h2>;
  }

  return (
    <div style={styles.page}>
      <h1>📘 {course.title}</h1>
      <p>{course.desc}</p>

      <h2 style={{ marginTop: "30px" }}>
  📚 الدروس ({course.lessons.length})
</h2>

{course.lessons.map((l, i) => (
  <Link
    key={i}
    to={`/course/${id}/${i}`}
    style={styles.lesson}
  >
    <div>
      <h3 style={{ margin: 0 }}>
        📖 الدرس {i + 1}
      </h3>

      <p style={{ color: "#94a3b8" }}>
        {l}
      </p>
    </div>

    <span>▶</span>
  </Link>
))}

      <Link to="/courses" style={styles.btn}>
        ⬅ رجوع
      </Link>
    </div>
  );
}

const styles = {
  page: {
    background: "#0b1220",
    minHeight: "100vh",
    color: "white",
    padding: "40px",
    paddingRight: "260px"
  },
  lesson: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "#111827",
  padding: "18px",
  margin: "12px 0",
  borderRadius: "14px",
  textDecoration: "none",
  color: "white",
  border: "1px solid rgba(255,255,255,0.05)",
  transition: "0.3s"
},
  btn: {
    display: "inline-block",
    marginTop: "20px",
    padding: "10px 20px",
    background: "#0ea5e9",
    color: "white",
    textDecoration: "none",
    borderRadius: "10px"
  }
};
