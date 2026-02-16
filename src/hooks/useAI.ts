"use client";

import { useState, useCallback } from "react";
import type { AIAction } from "@/lib/gemini";

interface UseAIOptions {
  concept: string;
  grade?: number;
  subject?: string;
}

export function useAI({ concept, grade = 10, subject }: UseAIOptions) {
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(
    async (action: AIAction) => {
      setLoading(true);
      setError(null);
      setResponse("");

      try {
        const res = await fetch("/api/ai/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ concept, action, grade, subject }),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to generate response");
        }

        // Handle streaming response
        const reader = res.body?.getReader();
        const decoder = new TextDecoder();

        if (reader) {
          let fullText = "";
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            fullText += chunk;
            setResponse(fullText);
          }
        } else {
          const data = await res.json();
          setResponse(data.response);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [concept, grade, subject]
  );

  return { response, loading, error, generate };
}

export function useAskAI() {
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [subject, setSubject] = useState<string | null>(null);

  const ask = useCallback(async (query: string, grade: number = 10) => {
    setLoading(true);
    setError(null);
    setResponse("");

    try {
      const res = await fetch("/api/ai/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, grade }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to get answer");
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        let fullText = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          fullText += chunk;
          setResponse(fullText);
        }
      } else {
        const data = await res.json();
        setResponse(data.response);
        setSubject(data.subject);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { response, loading, error, subject, ask };
}
