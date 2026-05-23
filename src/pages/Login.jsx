import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [name, setName] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login(name);
    navigate("/dashboard");
  };

  return (
    <div style={{ color: "white", padding: "40px" }}>
      <h1>🔐 تسجيل الدخول</h1>

      <input
        placeholder="اسم المستخدم"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: "10px", marginTop: "10px" }}
      />

      <br />

      <button
        onClick={handleLogin}
        style={{ marginTop: "10px", padding: "10px" }}
      >
        دخول
      </button>
    </div>
  );
}
