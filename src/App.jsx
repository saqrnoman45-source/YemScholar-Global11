import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Courses from "./pages/Courses";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import CourseDetails from "./pages/CourseDetails";
import Lesson from "./pages/Lesson";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />

        {/* Courses */}
        <Route
          path="/course/:id"
          element={<CourseDetails />}
        />

        <Route
          path="/course/:courseId/:lessonId"
          element={<Lesson />}
        />
      </Routes>
    </Layout>
  );
}
