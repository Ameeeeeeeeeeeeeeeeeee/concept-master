import { NextRequest, NextResponse } from "next/server";
import { generateAIResponse } from "@/lib/gemini";
import { checkRateLimit, sanitizeInput } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const clientIP = req.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(clientIP, 15, 60000)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment." },
        { status: 429 }
      );
    }

    const { topic, grade, subject } = await req.json();

    if (!topic) {
      return NextResponse.json(
        { error: "Topic is required" },
        { status: 400 }
      );
    }

    const sanitizedTopic = sanitizeInput(topic);
    const response = await generateAIResponse(
      sanitizedTopic,
      "quiz",
      grade || 10,
      subject
    );

    // Try to parse JSON from the response
    let questions;
    try {
      // Extract JSON array from the response
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        questions = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch {
      // Fallback: return raw response
      return NextResponse.json({
        questions: [],
        raw: response,
        error: "Could not parse quiz questions",
      });
    }

    return NextResponse.json({ questions });
  } catch (error: any) {
    console.error("Quiz Generation Error:", error);
    return NextResponse.json(
      { error: error.message || "Quiz generation failed" },
      { status: 500 }
    );
  }
}
