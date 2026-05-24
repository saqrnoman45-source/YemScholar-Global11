import Navbar from "../components/Navbar";

export default function Home() {
  const categories = [
    {
      icon: "💻",
      title: "التقنية والأمن السيبراني",
      desc: "تعلم البرمجة، الشبكات، الأمن السيبراني والذكاء الاصطناعي."
    },
    {
      icon: "🩺",
      title: "الطب والعلوم الصحية",
      desc: "مصادر طبية، دورات، شرح ومجتمع للطلاب الصحيين."
    },
    {
      icon: "🏗️",
      title: "الهندسة",
      desc: "تخصصات الهندسة المختلفة مع محتوى تدريبي متكامل."
    },
    {
      icon: "🌍",
      title: "اللغات",
      desc: "تعلم الإنجليزية، الألمانية، الفرنسية وغيرها."
    },
    {
      icon: "🧠",
      title: "المهارات والتطوير",
      desc: "مهارات العمل الحر، التصميم، الإنتاجية والتطوير الشخصي."
    },
    {
      icon: "🤖",
      title: "المساعد الذكي AI",
      desc: "تلخيص ملفات PDF، شرح الدروس، ومساعد دراسي ذكي."
    }
  ];

  return (
    <div className="bg-slate-950 min-h-screen text-white">
      <Navbar />

      <section className="text-center py-24 px-5">
        <h1 className="text-5xl font-bold mb-5">
          🚀 مستقبل التعلم يبدأ من هنا
        </h1>

        <p className="max-w-3xl mx-auto text-slate-400 text-xl leading-8">
          منصة تعليمية ذكية تجمع الدراسة الجامعية، المهارات،
          الدورات، المجتمع الطلابي، والذكاء الاصطناعي
          في مكان واحد.
        </p>

        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <button className="bg-sky-500 px-7 py-4 rounded-xl text-lg hover:scale-105 transition">
            ابدأ التعلم
          </button>

          <button className="border border-slate-700 px-7 py-4 rounded-xl text-lg hover:bg-slate-800 transition">
            استكشف التخصصات
          </button>
        </div>
      </section>

      <section className="px-[8%] py-14">
        <h2 className="text-center text-4xl mb-10">
          📚 مجالات التعلم
        </h2>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5">
          {categories.map((item, index) => (
            <div
              key={index}
              className="bg-slate-900 rounded-3xl p-6 border border-white/10 hover:scale-105 transition"
            >
              <h2 className="text-4xl mb-3">
                {item.icon}
              </h2>

              <h3 className="text-xl font-bold mb-3">
                {item.title}
              </h3>

              <p className="text-slate-400 leading-7">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center py-10 text-slate-500">
        © 2026 NexPath — منصة التعليم الذكية
      </footer>
    </div>
  );
}
