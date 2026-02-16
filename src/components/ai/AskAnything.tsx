"use client";

import { useState } from "react";
import { useAskAI } from "@/hooks/useAI";
import { TextSkeleton } from "@/components/ui/Skeleton";

interface AskAnythingProps {
  defaultGrade?: number;
}

export default function AskAnything({ defaultGrade = 10 }: AskAnythingProps) {
  const [query, setQuery] = useState("");
  const [grade, setGrade] = useState(defaultGrade);
  const { response, loading, error, subject, ask } = useAskAI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      ask(query.trim(), grade);
    }
  };

  const suggestions = [
    "Explain Newton's Laws in simple words",
    "What is photosynthesis?",
    "How do ionic bonds form?",
    "What are the parts of a cell?",
    "Explain tenses in English grammar",
    "What is Ohm's law?",
  ];

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything... e.g., 'Explain Newton's Laws'"
            className="input-field pl-12 pr-4 py-4 text-base rounded-2xl"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={grade}
            onChange={(e) => setGrade(parseInt(e.target.value))}
            className="input-field !w-auto !py-2 text-sm rounded-xl"
          >
            {[9, 10, 11, 12].map((g) => (
              <option key={g} value={g}>
                Grade {g}
              </option>
            ))}
          </select>
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="btn-primary !py-2.5 flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Thinking...
              </>
            ) : (
              <>
                <span>🤖</span>
                Ask AI
              </>
            )}
          </button>
        </div>
      </form>

      {/* Suggestions */}
      {!response && !loading && (
        <div>
          <p className="text-sm text-muted-foreground mb-3">💡 Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setQuery(s);
                  ask(s, grade);
                }}
                className="text-xs bg-accent text-accent-foreground px-3 py-2 rounded-xl hover:bg-accent/80 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && !response && (
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center animate-pulse">
              <span className="text-white text-sm">🤖</span>
            </div>
            <p className="text-sm text-muted-foreground">AI is thinking...</p>
          </div>
          <TextSkeleton lines={5} />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
          <p className="text-destructive font-medium">⚠️ {error}</p>
        </div>
      )}

      {/* Response */}
      {response && (
        <div className="rounded-2xl border border-border bg-card p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">🤖</span>
              </div>
              <h3 className="font-semibold text-sm">AI Answer</h3>
            </div>
            {subject && (
              <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full capitalize">
                {subject}
              </span>
            )}
          </div>
          <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
            {typeof response === 'string' ? response : JSON.parse(response).response || response}
          </div>
        </div>
      )}
    </div>
  );
}
