import { useParams, Link } from "react-router-dom";

export default function Lesson() {
  const { courseId, lessonId } = useParams();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b1220",
        color: "white",
        padding: "40px",
        paddingRight: "260px"
      }}
    >
      <h1>
        📘 درس {Number(lessonId) + 1}
      </h1>

      <p>
        أنت داخل دورة:
        <strong> {courseId}</strong>
      </p>

      <div
        style={{
          background: "#111827",
          padding: "20px",
          borderRadius: "15px",
          marginTop: "20px"
        }}
      >
        <h3>محتوى الدرس</h3>
        <p>
          هنا سيتم إضافة فيديوهات،
          ملفات PDF، وشرح الدرس.
        </p>
      </div>

      <Link
        to={`/course/${courseId}`}
        style={{
          display: "inline-block",
          marginTop: "20px",
          background: "#0ea5e9",
          color: "white",
          padding: "10px 20px",
          borderRadius: "10px",
          textDecoration: "none"
        }}
      >
        ⬅ العودة للدورة
      </Link>
    </div>
  );
}
