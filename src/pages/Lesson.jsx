import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Lesson() {
  const { courseId, lessonId } = useParams();

  const lessons = {
    cyber: ["مقدمة", "هجمات", "حماية", "شبكات"],
    web: ["HTML", "CSS", "JS", "React"]
  };

  const lesson = lessons[courseId]?.[lessonId];

  const [done, setDone] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`${courseId}-${lessonId}`);
    if (saved) setDone(JSON.parse(saved));
  }, []);

  const markDone = () => {
    localStorage.setItem(
      `${courseId}-${lessonId}`,
      JSON.stringify(true)
    );
    setDone(true);
  };

  if (!lesson) {
    return <h2 style={{ color: "white" }}>درس غير موجود</h2>;
  }

  return (
    <div style={styles.page}>

      <h1>📘 {lesson}</h1>

      <p style={{ color: "#94a3b8" }}>
        هذا درس داخل دورة {courseId}
      </p>

      <div style={styles.box}>
        <h3>📖 محتوى الدرس</h3>
        <p>
          سيتم هنا إضافة فيديو + شرح + ملفات PDF لاحقًا.
        </p>
      </div>

      {/* Progress */}
      <div style={styles.progressBox}>
        <h3>📊 الحالة</h3>

        <p>
          {done ? "✅ مكتمل" : "⏳ غير مكتمل"}
        </p>

        <button onClick={markDone} style={styles.btn}>
          ✔ تعليم كمكتمل
        </button>
      </div>

      <Link to={`/course/${courseId}`} style={styles.back}>
        ⬅ العودة
      </Link>

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

  box: {
    background: "#111827",
    padding: "20px",
    borderRadius: "15px",
    marginTop: "20px"
  },

  progressBox: {
    marginTop: "20px",
    background: "#1f2937",
    padding: "15px",
    borderRadius: "12px"
  },

  btn: {
    marginTop: "10px",
    padding: "10px 15px",
    background: "#0ea5e9",
    border: "none",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer"
  },

  back: {
    display: "inline-block",
    marginTop: "20px",
    color: "#0ea5e9",
    textDecoration: "none"
  }
};
