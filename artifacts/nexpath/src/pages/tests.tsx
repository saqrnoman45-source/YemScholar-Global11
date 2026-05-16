import { useState, useEffect, useRef } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { useAuth } from "@/contexts/auth-context";
import {
  FlaskConical, Clock, CheckCircle, XCircle, RotateCcw, ChevronRight,
  Trophy, Target, BarChart2, Star, TrendingUp, Save, Check,
} from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface Quiz {
  id: string;
  title: string;
  topic: string;
  topicColor: string;
  duration: number;
  questions: Question[];
}

const quizzes: Quiz[] = [
  {
    id: "ai-fundamentals",
    title: "AI Fundamentals",
    topic: "Artificial Intelligence",
    topicColor: "bg-violet-500/15 text-violet-400",
    duration: 10,
    questions: [
      { id: 1, question: "What does 'ML' stand for in the context of AI?", options: ["Machine Language", "Machine Learning", "Managed Logic", "Meta Learning"], correct: 1, explanation: "ML stands for Machine Learning — a subset of AI where systems learn from data." },
      { id: 2, question: "Which of the following is a supervised learning algorithm?", options: ["K-Means Clustering", "DBSCAN", "Linear Regression", "Principal Component Analysis"], correct: 2, explanation: "Linear Regression is supervised because it trains on labeled input-output pairs." },
      { id: 3, question: "What is overfitting in machine learning?", options: ["When a model performs poorly on training data", "When a model memorises training data but fails on new data", "When a model has too few parameters", "When training takes too long"], correct: 1, explanation: "Overfitting occurs when a model fits training data too closely, hurting generalisation." },
      { id: 4, question: "Which activation function outputs values between 0 and 1?", options: ["ReLU", "Tanh", "Sigmoid", "Leaky ReLU"], correct: 2, explanation: "The Sigmoid function maps any real value to the range (0, 1), making it useful for probabilities." },
    ],
  },
  {
    id: "web-dev-basics",
    title: "Web Development Basics",
    topic: "Web Dev",
    topicColor: "bg-sky-500/15 text-sky-400",
    duration: 8,
    questions: [
      { id: 1, question: "Which HTTP method is used to retrieve data from a server?", options: ["POST", "PUT", "DELETE", "GET"], correct: 3, explanation: "GET is the HTTP method for retrieving data without modifying server state." },
      { id: 2, question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style System", "Coded Style Sheets"], correct: 0, explanation: "CSS stands for Cascading Style Sheets, used to style HTML documents." },
      { id: 3, question: "Which JavaScript method removes the last element from an array?", options: ["shift()", "splice()", "pop()", "slice()"], correct: 2, explanation: "pop() removes and returns the last element of an array." },
    ],
  },
  {
    id: "data-structures",
    title: "Data Structures",
    topic: "Computer Science",
    topicColor: "bg-emerald-500/15 text-emerald-400",
    duration: 12,
    questions: [
      { id: 1, question: "What is the time complexity of searching in a balanced Binary Search Tree?", options: ["O(1)", "O(n)", "O(log n)", "O(n²)"], correct: 2, explanation: "A balanced BST has height O(log n), so search takes O(log n) time." },
      { id: 2, question: "Which data structure follows the FIFO principle?", options: ["Stack", "Queue", "Heap", "Tree"], correct: 1, explanation: "A Queue follows First-In-First-Out — the first element added is the first removed." },
      { id: 3, question: "What is the worst-case time complexity of QuickSort?", options: ["O(n log n)", "O(n)", "O(n²)", "O(log n)"], correct: 2, explanation: "QuickSort degrades to O(n²) in the worst case, e.g. when the pivot is always the smallest or largest element." },
      { id: 4, question: "Which traversal of a BST gives sorted output?", options: ["Pre-order", "Post-order", "Level-order", "In-order"], correct: 3, explanation: "In-order traversal (left → root → right) of a BST visits nodes in ascending sorted order." },
    ],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity Basics",
    topic: "Security",
    topicColor: "bg-rose-500/15 text-rose-400",
    duration: 10,
    questions: [
      { id: 1, question: "What does XSS stand for in web security?", options: ["Cross-Site Scripting", "Extra Session Security", "Cross-Server Synchronization", "Extended Script System"], correct: 0, explanation: "XSS (Cross-Site Scripting) is an attack that injects malicious scripts into trusted websites." },
      { id: 2, question: "Which encryption standard is commonly used for HTTPS?", options: ["DES", "MD5", "TLS", "BASE64"], correct: 2, explanation: "TLS (Transport Layer Security) is the cryptographic protocol used to secure HTTPS connections." },
      { id: 3, question: "What is a SQL injection attack?", options: ["Injecting SQL into CSS", "Inserting malicious SQL into input fields to manipulate databases", "Overloading a SQL server with queries", "Using SQL to crack passwords"], correct: 1, explanation: "SQL injection exploits poorly sanitised inputs to run arbitrary SQL code against a database." },
    ],
  },
];

function QuizCard({ quiz, onStart }: { quiz: Quiz; onStart: (quiz: Quiz) => void }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-600 hover:shadow-lg hover:shadow-black/30 transition-all flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className={`text-[11px] px-2.5 py-1 rounded-full font-medium ${quiz.topicColor}`}>
            {quiz.topic}
          </span>
          <h3 className="font-semibold text-white mt-2">{quiz.title}</h3>
        </div>
        <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0">
          <FlaskConical className="w-5 h-5 text-zinc-400" />
        </div>
      </div>
      <div className="flex items-center gap-4 text-xs text-zinc-500">
        <span className="flex items-center gap-1.5"><Target className="w-3.5 h-3.5" />{quiz.questions.length} questions</span>
        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{quiz.duration} min</span>
      </div>
      <button
        onClick={() => onStart(quiz)}
        className="flex items-center justify-center gap-2 w-full py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl transition-colors"
      >
        Start Quiz <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

function QuizRunner({ quiz, onFinish }: { quiz: Quiz; onFinish: (score: number, total: number, seconds: number) => void }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(quiz.questions.length).fill(null));
  const [revealed, setRevealed] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const q = quiz.questions[current];
  const isLast = current === quiz.questions.length - 1;

  const handleCheck = () => {
    if (selected === null) return;
    const newAnswers = [...answers];
    newAnswers[current] = selected;
    setAnswers(newAnswers);
    setRevealed(true);
  };

  const handleNext = () => {
    if (isLast) {
      if (timerRef.current) clearInterval(timerRef.current);
      const score = answers.filter((a, i) => a === quiz.questions[i].correct).length;
      onFinish(score, quiz.questions.length, elapsed);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setRevealed(false);
    }
  };

  const mins = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const secs = String(elapsed % 60).padStart(2, "0");

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between text-xs text-zinc-500 mb-2">
          <span>Question {current + 1} of {quiz.questions.length}</span>
          <span className="flex items-center gap-1.5 font-mono"><Clock className="w-3 h-3" /> {mins}:{secs}</span>
        </div>
        <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-violet-500 to-sky-500 rounded-full transition-all duration-500" style={{ width: `${((current + 1) / quiz.questions.length) * 100}%` }} />
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-4">
        <p className="text-white font-medium text-base leading-relaxed mb-6">{q.question}</p>
        <div className="space-y-2.5">
          {q.options.map((option, idx) => {
            let style = "border-zinc-700/60 bg-zinc-800/40 text-zinc-300 hover:border-violet-500/50 hover:bg-violet-500/5";
            if (revealed) {
              if (idx === q.correct) style = "border-emerald-500/50 bg-emerald-500/10 text-emerald-300";
              else if (idx === selected) style = "border-rose-500/50 bg-rose-500/10 text-rose-300";
              else style = "border-zinc-700/30 bg-zinc-800/20 text-zinc-500";
            } else if (selected === idx) {
              style = "border-violet-500/60 bg-violet-500/15 text-white";
            }
            return (
              <button key={idx} onClick={() => { if (!revealed) setSelected(idx); }}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all flex items-center justify-between gap-3 ${style}`}
              >
                <span>{option}</span>
                {revealed && idx === q.correct && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
                {revealed && idx === selected && idx !== q.correct && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
              </button>
            );
          })}
        </div>
        {revealed && (
          <div className="mt-4 p-4 bg-zinc-800/50 border border-zinc-700/50 rounded-xl">
            <p className="text-xs font-semibold text-zinc-400 mb-1">Explanation</p>
            <p className="text-sm text-zinc-300">{q.explanation}</p>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        {!revealed ? (
          <button onClick={handleCheck} disabled={selected === null}
            className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl transition-colors"
          >Check Answer</button>
        ) : (
          <button onClick={handleNext}
            className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl transition-colors flex items-center gap-2"
          >
            {isLast ? "See Results" : "Next Question"} <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function Results({ score, total, quizTitle, timeTaken, onRestart, onBack, isAuthenticated }: {
  score: number; total: number; quizTitle: string; timeTaken: number;
  onRestart: () => void; onBack: () => void; isAuthenticated: boolean;
}) {
  const pct = Math.round((score / total) * 100);
  const grade = pct >= 80 ? "Excellent" : pct >= 60 ? "Good" : pct >= 40 ? "Fair" : "Keep Practicing";
  const gradeColor = pct >= 80 ? "text-emerald-400" : pct >= 60 ? "text-sky-400" : pct >= 40 ? "text-amber-400" : "text-rose-400";
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    try {
      await fetch("/api/test-scores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizTitle, score, maxScore: total, timeTakenSeconds: timeTaken }),
      });
      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  const mins = Math.floor(timeTaken / 60);
  const secs = timeTaken % 60;

  return (
    <div className="max-w-md mx-auto text-center">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
        <div className="w-16 h-16 rounded-2xl bg-violet-500/15 border border-violet-500/20 flex items-center justify-center mx-auto mb-5">
          <Trophy className="w-8 h-8 text-violet-400" />
        </div>
        <h2 className="text-xl font-bold text-white mb-1">Quiz Complete!</h2>
        <p className="text-zinc-500 text-sm mb-6">{quizTitle}</p>

        <div className="bg-zinc-800/50 rounded-2xl p-6 mb-4">
          <p className="text-5xl font-bold text-white mb-1">{score}<span className="text-zinc-500 text-2xl">/{total}</span></p>
          <p className={`text-lg font-semibold mt-1 ${gradeColor}`}>{grade}</p>
          <p className="text-zinc-400 text-sm mt-1">{pct}% correct</p>
          <p className="text-zinc-600 text-xs mt-2 flex items-center justify-center gap-1">
            <Clock className="w-3 h-3" /> {mins > 0 ? `${mins}m ` : ""}{secs}s
          </p>
        </div>

        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden mb-6">
          <div className="h-full bg-gradient-to-r from-violet-500 to-sky-500 rounded-full transition-all duration-1000" style={{ width: `${pct}%` }} />
        </div>

        {isAuthenticated && !saved && (
          <button onClick={handleSave} disabled={saving}
            className="w-full flex items-center justify-center gap-2 py-2 mb-4 bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-600/30 text-sm font-medium rounded-xl transition-colors disabled:opacity-50"
          >
            {saving ? "Saving…" : <><Save className="w-3.5 h-3.5" /> Save Score to Profile</>}
          </button>
        )}
        {saved && (
          <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-400 mb-4">
            <Check className="w-3.5 h-3.5" /> Score saved to your profile
          </div>
        )}

        <div className="flex gap-3">
          <button onClick={onRestart}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white text-sm font-medium rounded-xl transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Retry
          </button>
          <button onClick={onBack}
            className="flex-1 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl transition-colors"
          >
            All Tests
          </button>
        </div>
      </div>
    </div>
  );
}

function ScoreHistory({ scores }: { scores: { quizTitle: string; score: number; maxScore: number; completedAt: string; timeTakenSeconds?: number | null }[] }) {
  if (scores.length === 0) return null;
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-6">
      <h2 className="font-semibold text-white text-sm flex items-center gap-2 mb-4">
        <TrendingUp className="w-4 h-4 text-violet-400" /> Score History
      </h2>
      <div className="space-y-2">
        {scores.slice(0, 5).map((s, i) => {
          const pct = Math.round((s.score / s.maxScore) * 100);
          const color = pct >= 80 ? "text-emerald-400" : pct >= 60 ? "text-sky-400" : pct >= 40 ? "text-amber-400" : "text-rose-400";
          return (
            <div key={i} className="flex items-center gap-3 text-sm">
              <span className="text-zinc-400 flex-1 truncate">{s.quizTitle}</span>
              <div className="w-24 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${pct >= 80 ? "bg-emerald-500" : pct >= 60 ? "bg-sky-500" : pct >= 40 ? "bg-amber-500" : "bg-rose-500"}`} style={{ width: `${pct}%` }} />
              </div>
              <span className={`text-xs font-semibold w-10 text-right ${color}`}>{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Tests() {
  const { isAuthenticated } = useAuth();
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [result, setResult] = useState<{ score: number; total: number; title: string; timeTaken: number } | null>(null);
  const [scores, setScores] = useState<{ quizTitle: string; score: number; maxScore: number; completedAt: string; timeTakenSeconds?: number | null }[]>([]);

  useEffect(() => {
    if (!isAuthenticated) return;
    fetch("/api/test-scores").then(r => r.ok ? r.json() : []).then(setScores).catch(() => {});
  }, [isAuthenticated, result]);

  const handleFinish = (score: number, total: number, timeTaken: number) => {
    setResult({ score, total, title: activeQuiz!.title, timeTaken });
    setActiveQuiz(null);
  };

  return (
    <AppLayout pageTitle="Tests & Quizzes" pageSubtitle="Test your knowledge across topics and track your progress.">
      <div className="p-6">
        {result ? (
          <Results
            score={result.score} total={result.total} quizTitle={result.title} timeTaken={result.timeTaken}
            isAuthenticated={isAuthenticated}
            onRestart={() => { const q = quizzes.find(q => q.title === result.title); if (q) setActiveQuiz(q); setResult(null); }}
            onBack={() => setResult(null)}
          />
        ) : activeQuiz ? (
          <QuizRunner quiz={activeQuiz} onFinish={handleFinish} />
        ) : (
          <>
            {isAuthenticated && <ScoreHistory scores={scores} />}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {quizzes.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} onStart={setActiveQuiz} />
              ))}
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
}
