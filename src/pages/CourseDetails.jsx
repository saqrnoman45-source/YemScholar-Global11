import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetch(
      `https://yem-scholar-global11-api-server-nm8upm5at-saqr-s-projects11.vercel.app/course/${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("API DATA:", data);
        setCourse(data);
      })
      .catch((err) => {
        console.error("API Error:", err);
      });
  }, [id]);

  if (!course) {
    return (
      <h2 style={{ color: "white", padding: "40px" }}>
        جاري التحميل...
      </h2>
    );
  }

  return (
    <div style={styles.page}>
      <h1>📘 {course.title}</h1>

      <p>{course.desc}</p>

      <h2 style={{ marginTop: "30px" }}>
        📚 الدروس ({course.lessons?.length || 0})
      </h2>

      {course.lessons?.map((lesson, i) => (
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
              {lesson}
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

/* STYLE */
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
    border: "1px solid rgba(255,255,255,0.05)"
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
