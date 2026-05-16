import { Router, type IRouter } from "express";
import { openai } from "@workspace/integrations-openai-ai-server";
import { requireAuth } from "../middleware/auth";

const router: IRouter = Router();

const PROMPTS: Record<string, string> = {
  summarize: "You are an expert educational content summarizer. Summarize the following text concisely in 3-5 paragraphs, preserving the key ideas and maintaining educational clarity:\n\n",
  keypoints: "Extract the main key points from the following educational text as a numbered list. Each point should be clear, concise, and actionable. Output 5-10 key points:\n\n",
  keywords:  "Extract the most important keywords, terms, and concepts from the following educational text. Group them by theme if possible. Present them clearly:\n\n",
  quiz:      "Generate 5 multiple-choice quiz questions based on the following educational text. For each question, provide: the question, 4 options (A, B, C, D), and mark the correct answer. Format clearly:\n\n",
};

router.post("/ai/summarize", requireAuth, async (req, res): Promise<void> => {
  const { text, mode } = req.body;
  if (!text || !mode) { res.status(400).json({ error: "text and mode are required" }); return; }
  if (!PROMPTS[mode]) { res.status(400).json({ error: "Invalid mode. Use: summarize, keypoints, keywords, quiz" }); return; }
  if (text.length > 50000) { res.status(400).json({ error: "Text too long. Max 50,000 characters." }); return; }

  const response = await openai.chat.completions.create({
    model: "gpt-5-mini",
    max_completion_tokens: 2048,
    messages: [{ role: "user", content: PROMPTS[mode] + text }],
  });

  const result = response.choices[0]?.message?.content ?? "No output generated.";
  res.json({ result, mode });
});

export default router;
