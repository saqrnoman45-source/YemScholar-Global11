import Navbar from "../components/Navbar";

export default function Home() {
  const stats = [
    { num: "10K+", label: "طالب" },
    { num: "250+", label: "مادة تعليمية" },
    { num: "15+", label: "تخصص" },
  ];

  const categories = [
    { icon: "💻", title: "الأمن السيبراني" },
    { icon: "🩺", title: "الطب" },
    { icon: "🏗️", title: "الهندسة" },
    { icon: "🤖", title: "الذكاء الاصطناعي" },
  ];

  return (
    <div className="bg-slate-950 text-white min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="text-center py-24 px-4">
        <h1 className="text-5xl font-bold mb-4">
          🚀 منصة التعلم الذكية
        </h1>

        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          تعلم، طور مهاراتك، وابنِ مستقبلك في مكان واحد
          بطريقة حديثة وسهلة.
        </p>

        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <button className="bg-sky-500 px-6 py-3 rounded-xl hover:scale-105 transition">
            ابدأ الآن
          </button>

          <button className="border border-slate-700 px-6 py-3 rounded-xl hover:bg-slate-800 transition">
            استكشف
          </button>
        </div>
      </section>

      {/* STATS */}
      <section className="grid grid-cols-3 gap-4 px-6 max-w-4xl mx-auto text-center">
        {stats.map((s, i) => (
          <div key={i} className="bg-slate-900 p-6 rounded-2xl">
            <h2 className="text-3xl font-bold text-sky-400">
              {s.num}
            </h2>
            <p className="text-slate-400">{s.label}</p>
          </div>
        ))}
      </section>

      {/* CATEGORIES */}
      <section className="mt-16 px-6">
        <h2 className="text-3xl text-center mb-10">
          📚 التخصصات
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {categories.map((c, i) => (
            <div
              key={i}
              className="bg-slate-900 p-6 rounded-2xl text-center hover:scale-105 transition"
            >
              <div className="text-4xl mb-3">{c.icon}</div>
              <h3 className="font-bold">{c.title}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
