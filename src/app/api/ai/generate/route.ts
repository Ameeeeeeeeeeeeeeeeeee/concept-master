import { NextRequest, NextResponse } from "next/server";
import { generateAIResponse, type AIAction } from "@/lib/gemini";
import { checkRateLimit, sanitizeInput } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const clientIP = req.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(clientIP, 30, 60000)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment." },
        { status: 429 }
      );
    }

    const { concept, action, grade, subject } = await req.json();

    if (!concept || !action) {
      return NextResponse.json(
        { error: "Concept and action are required" },
        { status: 400 }
      );
    }

    const validActions: AIAction[] = [
      "explain", "simplify", "exam_tips", "practice", "summarize", "quiz"
    ];

    if (!validActions.includes(action)) {
      return NextResponse.json(
        { error: "Invalid action" },
        { status: 400 }
      );
    }

    const sanitizedConcept = sanitizeInput(concept);
    const response = await generateAIResponse(
      sanitizedConcept,
      action as AIAction,
      grade || 10,
      subject
    );

    // Return as streaming-like text response
    return new NextResponse(response, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error: any) {
    console.error("AI Generation Error:", error);
    return NextResponse.json(
      { error: error.message || "AI generation failed" },
      { status: 500 }
    );
  }
}
