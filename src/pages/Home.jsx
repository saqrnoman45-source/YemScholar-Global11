import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div
      style={{
        background: "#020617",
        minHeight: "100vh",
        color: "white"
      }}
    >
      <Navbar />

      <div
        style={{
          textAlign: "center",
          paddingTop: "120px"
        }}
      >
        <h1
          style={{
            fontSize: "55px"
          }}
        >
          🚀 NexPath by YemScholar
        </h1>

        <p
          style={{
            color: "#94a3b8",
            fontSize: "20px"
          }}
        >
          تعلم • تواصل • طوّر مستقبلك
        </p>
      </div>
    </div>
  );
}
