"use client";

import { useState, useCallback } from "react";
import { useAI } from "@/hooks/useAI";
import type { AIAction } from "@/lib/gemini";
import { ConceptSkeleton } from "@/components/ui/Skeleton";

interface AIExplainerProps {
  concept: string;
  grade: number;
  subject: string;
}

const AI_ACTIONS: { action: AIAction; label: string; icon: string; color: string }[] = [
  { action: "explain", label: "Explain", icon: "🧠", color: "from-blue-500 to-indigo-600" },
  { action: "simplify", label: "Explain Simpler", icon: "✨", color: "from-green-500 to-emerald-600" },
  { action: "exam_tips", label: "Exam Tips", icon: "🎯", color: "from-amber-500 to-orange-600" },
  { action: "practice", label: "Practice Questions", icon: "📚", color: "from-purple-500 to-pink-600" },
  { action: "summarize", label: "Summarize", icon: "🔁", color: "from-teal-500 to-cyan-600" },
];

export default function AIExplainer({ concept, grade, subject }: AIExplainerProps) {
  const { response, loading, error, generate } = useAI({ concept, grade, subject });
  const [activeAction, setActiveAction] = useState<AIAction | null>(null);

  const handleAction = useCallback(
    (action: AIAction) => {
      setActiveAction(action);
      generate(action);
    },
    [generate]
  );

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {AI_ACTIONS.map(({ action, label, icon, color }) => (
          <button
            key={action}
            onClick={() => handleAction(action)}
            disabled={loading}
            className={`relative overflow-hidden rounded-2xl p-4 text-left transition-all duration-300 group
              ${activeAction === action
                ? `bg-gradient-to-br ${color} text-white shadow-lg`
                : "bg-card border border-border hover:border-primary/30 hover:shadow-md"
              }
              ${loading ? "opacity-70 cursor-wait" : "cursor-pointer active:scale-95"}
            `}
          >
            <div className="text-2xl mb-2">{icon}</div>
            <div className="text-sm font-medium leading-tight">{label}</div>
            {activeAction === action && loading && (
              <div className="absolute inset-0 bg-white/10 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Response Area */}
      {loading && !response && <ConceptSkeleton />}

      {error && (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
          <p className="text-destructive font-medium">⚠️ {error}</p>
          <p className="text-sm text-muted-foreground mt-2">
            Please try again. If the issue persists, check your connection.
          </p>
        </div>
      )}

      {response && (
        <div className="rounded-2xl border border-border bg-card p-6 animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">🤖</span>
            </div>
            <h3 className="font-semibold text-sm">AI Response</h3>
            {activeAction && (
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                {AI_ACTIONS.find((a) => a.action === activeAction)?.label}
              </span>
            )}
          </div>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
              {response}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
