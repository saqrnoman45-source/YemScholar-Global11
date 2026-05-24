import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#0f172a",
        color: "white"
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          marginRight:
            window.innerWidth < 768
              ? "80px"
              : "256px",
          padding: "20px"
        }}
      >
        {children}
      </div>
    </div>
  );
}
