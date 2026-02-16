"use client";

import { useState, useCallback } from "react";
import type { QuizQuestion } from "@/types";
import { QuizSkeleton } from "@/components/ui/Skeleton";

interface QuizGeneratorProps {
  topic: string;
  grade: number;
  subject: string;
}

export default function QuizGenerator({ topic, grade, subject }: QuizGeneratorProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const generateQuiz = useCallback(async () => {
    setLoading(true);
    setError(null);
    setQuestions([]);
    setSelected({});
    setShowResults(false);
    setCurrentQ(0);

    try {
      const res = await fetch("/api/quiz/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, grade, subject }),
      });

      if (!res.ok) throw new Error("Failed to generate quiz");

      const data = await res.json();
      if (data.questions?.length > 0) {
        setQuestions(data.questions);
      } else {
        throw new Error("No questions generated");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [topic, grade, subject]);

  const selectAnswer = (questionIndex: number, optionIndex: number) => {
    if (showResults) return;
    setSelected((prev) => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const submitQuiz = () => {
    setShowResults(true);
  };

  const score = questions.reduce((acc, q, i) => {
    return acc + (selected[i] === q.answer ? 1 : 0);
  }, 0);

  const scorePercentage = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  if (questions.length === 0) {
    return (
      <div className="space-y-4">
        {loading ? (
          <QuizSkeleton />
        ) : error ? (
          <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
            <p className="text-destructive font-medium">⚠️ {error}</p>
            <button onClick={generateQuiz} className="btn-secondary mt-3 text-sm">
              Try Again
            </button>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-bold mb-2">Ready to Test Your Knowledge?</h3>
            <p className="text-muted-foreground mb-6">
              Generate a quiz on &quot;{topic}&quot; and see how well you understand it!
            </p>
            <button onClick={generateQuiz} className="btn-primary">
              🎯 Generate Quiz
            </button>
          </div>
        )}
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="space-y-6 animate-fade-in">
        {/* Score Card */}
        <div className="rounded-2xl border border-border bg-card p-8 text-center">
          <div className="text-6xl mb-4">
            {scorePercentage >= 80 ? "🏆" : scorePercentage >= 60 ? "👍" : scorePercentage >= 40 ? "📖" : "💪"}
          </div>
          <h3 className="text-3xl font-bold mb-2">
            {score}/{questions.length}
          </h3>
          <div className="w-full max-w-xs mx-auto bg-secondary rounded-full h-3 mb-4">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${
                scorePercentage >= 80
                  ? "bg-gradient-to-r from-green-500 to-emerald-500"
                  : scorePercentage >= 60
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                  : scorePercentage >= 40
                  ? "bg-gradient-to-r from-amber-500 to-orange-500"
                  : "bg-gradient-to-r from-red-500 to-pink-500"
              }`}
              style={{ width: `${scorePercentage}%` }}
            ></div>
          </div>
          <p className="text-muted-foreground text-sm">
            {scorePercentage >= 80
              ? "Excellent! You've mastered this topic! 🎉"
              : scorePercentage >= 60
              ? "Good job! Keep studying to improve."
              : scorePercentage >= 40
              ? "Not bad! Review the concepts again."
              : "Keep practicing! You'll get better! 💪"}
          </p>
        </div>

        {/* Answer Review */}
        <div className="space-y-4">
          {questions.map((q, i) => (
            <div
              key={i}
              className={`rounded-2xl border p-5 ${
                selected[i] === q.answer
                  ? "border-green-500/30 bg-green-500/5"
                  : "border-red-500/30 bg-red-500/5"
              }`}
            >
              <p className="font-medium text-sm mb-3">
                {i + 1}. {q.question}
              </p>
              <div className="space-y-2 mb-3">
                {q.options.map((opt, j) => (
                  <div
                    key={j}
                    className={`text-sm px-4 py-2 rounded-xl ${
                      j === q.answer
                        ? "bg-green-500/20 text-green-700 dark:text-green-300 font-medium"
                        : j === selected[i] && j !== q.answer
                        ? "bg-red-500/20 text-red-700 dark:text-red-300 line-through"
                        : "text-muted-foreground"
                    }`}
                  >
                    {String.fromCharCode(65 + j)}. {opt}
                    {j === q.answer && " ✓"}
                    {j === selected[i] && j !== q.answer && " ✗"}
                  </div>
                ))}
              </div>
              {q.explanation && (
                <p className="text-xs text-muted-foreground bg-secondary/50 rounded-xl p-3">
                  💡 {q.explanation}
                </p>
              )}
            </div>
          ))}
        </div>

        <button onClick={generateQuiz} className="btn-primary w-full">
          🔄 Generate New Quiz
        </button>
      </div>
    );
  }

  const question = questions[currentQ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Progress */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          Question {currentQ + 1} of {questions.length}
        </span>
        <span className="text-muted-foreground">
          {Object.keys(selected).length} answered
        </span>
      </div>
      <div className="w-full bg-secondary rounded-full h-2">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500"
          style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <h4 className="text-lg font-semibold mb-6">{question.question}</h4>
        <div className="space-y-3">
          {question.options.map((option, i) => (
            <button
              key={i}
              onClick={() => selectAnswer(currentQ, i)}
              className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 text-sm ${
                selected[currentQ] === i
                  ? "border-primary bg-primary/10 text-primary font-medium"
                  : "border-border hover:border-primary/30 hover:bg-accent"
              }`}
            >
              <span className="font-medium mr-3">
                {String.fromCharCode(65 + i)}.
              </span>
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
          disabled={currentQ === 0}
          className="btn-secondary !py-2 text-sm disabled:opacity-40"
        >
          ← Previous
        </button>

        {currentQ === questions.length - 1 ? (
          <button
            onClick={submitQuiz}
            disabled={Object.keys(selected).length < questions.length}
            className="btn-primary !py-2 text-sm disabled:opacity-40"
          >
            Submit Quiz ✓
          </button>
        ) : (
          <button
            onClick={() => setCurrentQ(Math.min(questions.length - 1, currentQ + 1))}
            className="btn-primary !py-2 text-sm"
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
}
