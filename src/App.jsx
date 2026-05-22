import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Courses from "./pages/Courses";
import Community from "./pages/Community";
import Messages from "./pages/Messages";
import Jobs from "./pages/Jobs";
import Scholarships from "./pages/Scholarships";
import Skills from "./pages/Skills";
import AI from "./pages/AI";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/community" element={<Community />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/scholarships" element={<Scholarships />} />
      <Route path="/skills" element={<Skills />} />
      <Route path="/ai" element={<AI />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}
