"use client";

import { useState } from "react";
import QuizGenerator from "@/components/quiz/QuizGenerator";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function QuizContent() {
  const searchParams = useSearchParams();
  const [topic, setTopic] = useState(searchParams.get("topic") || "");
  const [grade, setGrade] = useState(parseInt(searchParams.get("grade") || "10"));
  const [subject, setSubject] = useState(searchParams.get("subject") || "physics");
  const [started, setStarted] = useState(!!searchParams.get("topic"));

  const subjects = [
    { value: "english", label: "📖 English" },
    { value: "physics", label: "⚡ Physics" },
    { value: "chemistry", label: "🧪 Chemistry" },
    { value: "biology", label: "🧬 Biology" },
  ];

  if (!started) {
    return (
      <div className="space-y-6">
        {/* Setup Form */}
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <h2 className="text-xl font-bold mb-6">Configure Your Quiz</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Topic / Concept</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Newton's Laws, Photosynthesis, Periodic Table..."
                className="input-field"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Grade</label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(parseInt(e.target.value))}
                  className="input-field"
                >
                  {[9, 10, 11, 12].map((g) => (
                    <option key={g} value={g}>Grade {g}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="input-field"
                >
                  {subjects.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={() => topic.trim() && setStarted(true)}
              disabled={!topic.trim()}
              className="btn-primary w-full disabled:opacity-50"
            >
              🎯 Start Quiz
            </button>
          </div>
        </div>

        {/* Quick Topics */}
        <div>
          <p className="text-sm text-muted-foreground mb-3">💡 Quick topics:</p>
          <div className="flex flex-wrap gap-2">
            {[
              "Newton's Laws of Motion",
              "Photosynthesis",
              "Periodic Table",
              "Tenses in English",
              "Cell Biology",
              "Chemical Bonding",
              "Equations of Motion",
              "DNA Structure",
            ].map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTopic(t);
                  setStarted(true);
                }}
                className="text-xs bg-accent text-accent-foreground px-3 py-2 rounded-xl hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <span className="capitalize">{subject}</span>
            <span>•</span>
            <span>Grade {grade}</span>
          </div>
          <h2 className="text-xl font-bold">{topic}</h2>
        </div>
        <button onClick={() => setStarted(false)} className="btn-ghost text-sm">
          ← Change Topic
        </button>
      </div>
      <QuizGenerator topic={topic} grade={grade} subject={subject} />
    </div>
  );
}

export default function QuizPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="text-5xl mb-4">📝</div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">Smart Quiz</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Test your knowledge with AI-generated quizzes. Choose a topic and get instant multiple-choice questions.
        </p>
      </div>

      <Suspense fallback={<div className="animate-pulse bg-muted rounded-2xl h-64"></div>}>
        <QuizContent />
      </Suspense>
    </div>
  );
}
