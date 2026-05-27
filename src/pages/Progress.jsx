import { Link } from "react-router-dom";

export default function Progress() {
  const courses = {
    cyber: {
      title: "الأمن السيبراني",
      lessons: 4
    },

    web: {
      title: "تطوير الويب",
      lessons: 4
    }
  };

  const calculateProgress = (courseId, total) => {
    let done = 0;

    for (let i = 0; i < total; i++) {
      const lesson = localStorage.getItem(
        `${courseId}-${i}`
      );

      if (lesson) done++;
    }

    return {
      done,
      percent: Math.round((done / total) * 100)
    };
  };

  return (
    <div style={styles.page}>
      <h1>📊 تقدّمك الدراسي</h1>

      <div style={styles.grid}>
        {Object.entries(courses).map(([id, course]) => {
          const progress =
            calculateProgress(id, course.lessons);

          return (
            <div key={id} style={styles.card}>
              <h2>{course.title}</h2>

              <p>
                {progress.done} / {course.lessons}
                دروس مكتملة
              </p>

              {/* Progress bar */}
              <div style={styles.progressBar}>
                <div
                  style={{
                    ...styles.progressFill,
                    width: `${progress.percent}%`
                  }}
                />
              </div>

              <h3>
                {progress.percent}%
              </h3>

              <Link
                to={`/course/${id}`}
                style={styles.btn}
              >
                متابعة
              </Link>
            </div>
          );
        })}
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

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(250px,1fr))",
    gap: "20px",
    marginTop: "30px"
  },

  card: {
    background: "#111827",
    padding: "20px",
    borderRadius: "15px"
  },

  progressBar: {
    width: "100%",
    height: "12px",
    background: "#1f2937",
    borderRadius: "10px",
    overflow: "hidden",
    marginTop: "15px"
  },

  progressFill: {
    height: "100%",
    background: "#0ea5e9"
  },

  btn: {
    display: "inline-block",
    marginTop: "20px",
    background: "#0ea5e9",
    padding: "10px 20px",
    borderRadius: "10px",
    color: "white",
    textDecoration: "none"
  }
};
