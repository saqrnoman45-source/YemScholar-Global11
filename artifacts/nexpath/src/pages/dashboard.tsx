export default function Dashboard() {
  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold">📊 NexPath Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

        <div className="bg-zinc-900 p-6 rounded-2xl">
          <h2 className="text-2xl">📚 Courses</h2>
          <p className="text-zinc-400 mt-2">
            تعلم مهارات حديثة
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl">
          <h2 className="text-2xl">🎓 Scholarships</h2>
          <p className="text-zinc-400 mt-2">
            ابحث عن المنح الدراسية
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl">
          <h2 className="text-2xl">🧪 Tests</h2>
          <p className="text-zinc-400 mt-2">
            اختبارات قدرات ومهارات
          </p>
        </div>

      </div>
    </main>
  );
}
