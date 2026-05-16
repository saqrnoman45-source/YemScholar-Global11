import { useState, useRef } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { Sparkles, FileText, AlignLeft, Key, HelpCircle, Upload, X, Copy, Check, Loader2, Zap } from "lucide-react";

type Mode = "summarize" | "keypoints" | "keywords" | "quiz";

const MODES: { key: Mode; label: string; icon: React.ElementType; desc: string; color: string; bg: string }[] = [
  { key: "summarize", label: "Summarize",    icon: AlignLeft,   desc: "Generate a concise summary",       color: "text-violet-400", bg: "bg-violet-500/15 border-violet-500/30" },
  { key: "keypoints", label: "Key Points",   icon: FileText,    desc: "Extract main ideas as bullet points",color: "text-sky-400",    bg: "bg-sky-500/15 border-sky-500/30" },
  { key: "keywords",  label: "Keywords",     icon: Key,         desc: "Extract important keywords & terms", color: "text-amber-400",  bg: "bg-amber-500/15 border-amber-500/30" },
  { key: "quiz",      label: "Generate Quiz",icon: HelpCircle,  desc: "Create quiz questions from content", color: "text-emerald-400",bg: "bg-emerald-500/15 border-emerald-500/30" },
];

const EXAMPLES = [
  "Machine learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed. It focuses on developing computer programs that can access data and use it to learn for themselves...",
  "The water cycle, also known as the hydrological cycle, describes the continuous movement of water within the Earth and atmosphere. It is a complex system that includes many processes. Liquid water evaporates into water vapor, condenses to form clouds, and precipitates back to earth as rain or snow...",
  "The French Revolution was a period of radical political and societal change in France that began with the Estates General of 1789 and ended with the formation of the French Consulate in November 1799...",
];

export default function AI() {
  const [mode, setMode] = useState<Mode>("summarize");
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleSubmit() {
    if (!text.trim()) { setError("Please enter or paste some text first."); return; }
    setError("");
    setLoading(true);
    setResult("");
    try {
      const res = await fetch("/api/ai/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text.trim(), mode }),
      });
      if (!res.ok) throw new Error("AI request failed");
      const data = await res.json();
      setResult(data.result);
    } catch {
      setError("AI processing failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type === "text/plain" || file.name.endsWith(".txt") || file.name.endsWith(".md")) {
      const reader = new FileReader();
      reader.onload = (ev) => setText(ev.target?.result as string ?? "");
      reader.readAsText(file);
    } else {
      setError("Only .txt and .md files are supported for direct upload. For PDFs, paste the text content.");
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <AppLayout pageTitle="AI Assistant" pageSubtitle="Summarize, extract, and analyze educational content using AI.">
      <div className="p-6 space-y-5">

        {/* Mode selector */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
          {MODES.map(({ key, label, icon: Icon, desc, color, bg }) => (
            <button
              key={key}
              onClick={() => setMode(key)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                mode === key ? bg : "bg-zinc-900 border-zinc-800 hover:border-zinc-600"
              }`}
            >
              <Icon className={`w-4 h-4 mb-2 ${mode === key ? color : "text-zinc-500"}`} />
              <p className={`text-sm font-semibold ${mode === key ? "text-white" : "text-zinc-400"}`}>{label}</p>
              <p className="text-xs text-zinc-600 mt-0.5 leading-relaxed">{desc}</p>
            </button>
          ))}
        </div>

        {/* Main workspace */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          {/* Input panel */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
              <p className="text-sm font-medium text-white">Input Text</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-600">{wordCount} words · {charCount} chars</span>
                <input ref={fileRef} type="file" accept=".txt,.md" className="hidden" onChange={handleFileUpload} />
                <button
                  onClick={() => fileRef.current?.click()}
                  className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
                >
                  <Upload className="w-3 h-3" /> Upload .txt
                </button>
                {text && (
                  <button onClick={() => { setText(""); setResult(""); }} className="text-zinc-600 hover:text-zinc-400 transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
            <textarea
              value={text}
              onChange={e => { setText(e.target.value); setError(""); }}
              placeholder="Paste your text, article, or notes here…&#10;&#10;Or try one of the example texts below."
              className="flex-1 bg-transparent px-4 py-3 text-sm text-zinc-300 placeholder:text-zinc-600 focus:outline-none resize-none min-h-[280px]"
            />
            {/* Example texts */}
            <div className="border-t border-zinc-800 p-3 space-y-1.5">
              <p className="text-[11px] text-zinc-600 font-medium uppercase tracking-wider px-1">Try an example</p>
              {EXAMPLES.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => setText(ex)}
                  className="w-full text-left text-xs text-zinc-500 hover:text-zinc-300 truncate px-1 py-0.5 transition-colors"
                >
                  {ex.slice(0, 80)}…
                </button>
              ))}
            </div>
          </div>

          {/* Output panel */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                <p className="text-sm font-medium text-white">AI Output</p>
              </div>
              {result && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
                >
                  {copied ? <><Check className="w-3 h-3 text-emerald-400" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
                </button>
              )}
            </div>

            <div className="flex-1 px-4 py-3 min-h-[280px] flex flex-col">
              {loading ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-violet-500/15 flex items-center justify-center">
                    <Loader2 className="w-5 h-5 text-violet-400 animate-spin" />
                  </div>
                  <p className="text-sm text-zinc-500">Processing with AI…</p>
                </div>
              ) : result ? (
                <div className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">{result}</div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-zinc-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-400">AI output appears here</p>
                    <p className="text-xs text-zinc-600 mt-1">Select a mode and paste text to get started</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
            <X className="w-4 h-4 shrink-0" />{error}
          </div>
        )}

        {/* Action button */}
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={loading || !text.trim()}
            className="flex items-center gap-2.5 px-8 py-3 bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-500 hover:to-violet-600 text-white font-semibold rounded-2xl text-sm transition-all shadow-lg shadow-violet-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing…</>
              : <><Sparkles className="w-4 h-4" /> Run AI — {MODES.find(m => m.key === mode)?.label}</>}
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
