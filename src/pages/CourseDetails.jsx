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

      <h2>📚 الدروس</h2>
      {course.lessons.map((l, i) => (
  <Link
    key={i}
    to={`/course/${id}/${i}`}
    style={styles.lesson}
  >
    📌 {l}
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
  display: "block",
  background: "#111827",
  padding: "14px",
  margin: "10px 0",
  borderRadius: "10px",
  textDecoration: "none",
  color: "white",
  transition: "0.3s",
  cursor: "pointer"
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
