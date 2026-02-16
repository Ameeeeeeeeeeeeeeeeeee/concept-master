import { NextRequest, NextResponse } from "next/server";
import { askAnything } from "@/lib/gemini";
import { checkRateLimit, sanitizeInput } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const clientIP = req.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(clientIP, 20, 60000)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment." },
        { status: 429 }
      );
    }

    const { query, grade } = await req.json();

    if (!query) {
      return NextResponse.json(
        { error: "Query is required" },
        { status: 400 }
      );
    }

    const sanitizedQuery = sanitizeInput(query);
    const { response, subject } = await askAnything(sanitizedQuery, grade || 10);

    return new NextResponse(
      JSON.stringify({ response, subject }),
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=3600",
        },
      }
    );
  } catch (error: any) {
    console.error("Ask AI Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to get answer" },
      { status: 500 }
    );
  }
}
