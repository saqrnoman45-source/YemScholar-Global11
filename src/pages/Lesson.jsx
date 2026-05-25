import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Lesson() {
  const { courseId, lessonId } = useParams();

  const lessons = {
    cyber: [
      "مقدمة في الأمن السيبراني",
      "أنواع الهجمات الإلكترونية",
      "حماية الأنظمة",
      "الشبكات الأساسية"
    ],
    web: [
      "HTML",
      "CSS",
      "JavaScript",
      "React"
    ]
  };

  const currentLesson =
    lessons[courseId]?.[lessonId] || "الدرس غير موجود";

  const totalLessons =
    lessons[courseId]?.length || 1;

  const progressKey = `progress-${courseId}`;

  const [completed, setCompleted] =
    useState([]);

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem(progressKey)) || [];
    setCompleted(saved);
  }, []);

  const markComplete = () => {
    if (!completed.includes(lessonId)) {
      const updated = [...completed, lessonId];

      setCompleted(updated);

      localStorage.setItem(
        progressKey,
        JSON.stringify(updated)
      );
    }
  };

  const progress =
    Math.round(
      (completed.length / totalLessons) * 100
    );

  return (
    <div style={styles.page}>

      <h1>📘 {currentLesson}</h1>

      {/* Progress */}
      <div style={styles.progressBox}>
        <h3>
          تقدمك: {progress}%
        </h3>

        <div style={styles.progressBar}>
          <div
            style={{
              ...styles.progressFill,
              width: `${progress}%`
            }}
          />
        </div>

        <p>
          {completed.length} / {totalLessons}
          دروس مكتملة
        </p>
      </div>

      {/* Lesson */}
      <div style={styles.box}>
        <h2>📚 محتوى الدرس</h2>

        <p>
          هنا سيتم وضع شرح الدرس،
          الفيديوهات، وملفات PDF لاحقًا.
        </p>
      </div>

      {/* Buttons */}
      <div style={styles.buttons}>
        <button
          style={styles.completeBtn}
          onClick={markComplete}
        >
          ✅ تم إنهاء الدرس
        </button>

        <Link
          to={`/course/${courseId}`}
          style={styles.backBtn}
        >
          ⬅ العودة للدورة
        </Link>
      </div>

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

  progressBox: {
    background: "#111827",
    padding: "20px",
    borderRadius: "15px",
    marginBottom: "20px"
  },

  progressBar: {
    background: "#1f2937",
    height: "12px",
    borderRadius: "10px",
    overflow: "hidden"
  },

  progressFill: {
    background: "#0ea5e9",
    height: "100%"
  },

  box: {
    background: "#111827",
    padding: "20px",
    borderRadius: "15px"
  },

  buttons: {
    display: "flex",
    gap: "15px",
    marginTop: "20px",
    flexWrap: "wrap"
  },

  completeBtn: {
    background: "#16a34a",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "10px",
    cursor: "pointer"
  },

  backBtn: {
    background: "#0ea5e9",
    color: "white",
    padding: "10px 20px",
    borderRadius: "10px",
    textDecoration: "none"
  }
};
