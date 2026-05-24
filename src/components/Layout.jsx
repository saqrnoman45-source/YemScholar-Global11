import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      background: "#0f172a",
      color: "white"
    }}>
      
      <Sidebar />

      <main style={{
        flex: 1,
        marginRight: "260px",
        padding: "20px"
      }}>
        {children}
      </main>

    </div>
  );
}
