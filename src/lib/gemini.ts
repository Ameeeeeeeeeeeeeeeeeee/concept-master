import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { cache, cacheKey, AI_CACHE_TTL } from "./redis";
import { detectSubject } from "./utils";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const MODELS_TO_TRY = [
  "gemini-2.5-flash",
  "gemini-2.5-pro",
  "gemini-2.0-flash", 
  "gemini-2.0-flash-001",
  "gemini-1.5-flash-8b",
  "gemini-1.5-flash",
];

const GENERATION_CONFIG = {
  temperature: 0.7,
  topP: 0.9,
  maxOutputTokens: 2048,
};

const SAFETY_SETTINGS = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
];

async function generateContentWithFallback(prompt: string) {
  let lastError: any;
  for (const modelName of MODELS_TO_TRY) {
    try {
      console.log(`Trying Gemini model: ${modelName}`);
      const model = genAI.getGenerativeModel({ 
        model: modelName,
        generationConfig: GENERATION_CONFIG,
        safetySettings: SAFETY_SETTINGS,
      });
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error: any) {
      console.warn(`Model ${modelName} failed:`, error.message);
      lastError = error;
    }
  }
  throw lastError || new Error("All AI models failed");
}

async function generateStreamWithFallback(prompt: string) {
  let lastError: any;
  for (const modelName of MODELS_TO_TRY) {
    try {
      console.log(`Trying Gemini model (stream): ${modelName}`);
      const model = genAI.getGenerativeModel({ 
        model: modelName,
        generationConfig: GENERATION_CONFIG,
        safetySettings: SAFETY_SETTINGS,
      });
      const result = await model.generateContentStream(prompt);
      return result.stream;
    } catch (error: any) {
      console.warn(`Model ${modelName} stream failed:`, error.message);
      lastError = error;
    }
  }
  throw lastError || new Error("All AI models failed to stream");
}

const SYSTEM_PROMPT = (grade: number) => `You are an expert high school teacher named ConceptMaster. 
Explain concepts in simple English suitable for Grade ${grade} students. 
Use examples relevant to African students, especially Ethiopian context when possible. 
Keep explanations short, clear, and engaging. 
Use bullet points and numbered lists for clarity.
If explaining science concepts, include relevant formulas in plain text format.`;

export type AIAction = "explain" | "simplify" | "exam_tips" | "practice" | "summarize" | "quiz";

const ACTION_PROMPTS: Record<AIAction, string> = {
  explain: `Explain this concept thoroughly but simply. Include:
1. A clear definition
2. A real-life example
3. Key points to remember
4. Any relevant formulas (for science subjects)`,
  
  simplify: `Explain this concept as if you're talking to a younger student. Use very simple words, analogies, and everyday examples. Make it fun and easy to understand.`,
  
  exam_tips: `Give practical exam tips for this concept. Include:
1. Common exam question types
2. Key points examiners look for
3. Common mistakes to avoid
4. Memory tricks or mnemonics
5. Time management tips for this topic`,
  
  practice: `Generate 5 practice questions about this concept. For each question:
- Provide the question
- Give 4 options (A, B, C, D)
- Mark the correct answer
- Give a brief explanation
Format as JSON array with structure: [{"question": "", "options": ["A", "B", "C", "D"], "answer": 0, "explanation": ""}]`,
  
  summarize: `Summarize this concept in exactly 5 clear, concise lines. Each line should capture a key point. Number each line.`,
  
  quiz: `Generate a quiz with 5 multiple-choice questions about this topic. 
Return ONLY valid JSON in this exact format:
[{"question": "question text", "options": ["option A", "option B", "option C", "option D"], "answer": 0, "explanation": "why this is correct"}]
The "answer" field is the zero-based index of the correct option.`,
};

export async function generateAIResponse(
  concept: string,
  action: AIAction,
  grade: number = 10,
  subject?: string
): Promise<string> {
  const key = cacheKey("ai", action, concept, grade.toString(), subject || "");
  const cached = await cache.get(key);
  if (cached) return cached;

  try {
    const prompt = `${SYSTEM_PROMPT(grade)}

Subject: ${subject || "General"}
Concept: ${concept}

${ACTION_PROMPTS[action]}`;

    const response = await generateContentWithFallback(prompt);

    await cache.set(key, response, AI_CACHE_TTL);
    return response;
  } catch (error: any) {
    console.error("Gemini AI Integration Error:", error);
    throw new Error(`AI generation failed: ${error.message}`);
  }
}

export async function generateStreamingResponse(
  concept: string,
  action: AIAction,
  grade: number = 10,
  subject?: string
) {
  const prompt = `${SYSTEM_PROMPT(grade)}

Subject: ${subject || "General"}
Concept: ${concept}

${ACTION_PROMPTS[action]}`;

  return generateStreamWithFallback(prompt);
}

export async function askAnything(
  query: string,
  grade: number = 10
): Promise<{ response: string; subject: string | null }> {
  const subject = detectSubject(query);

  const key = cacheKey("ask", query, grade.toString());
  const cached = await cache.get(key);
  if (cached) {
    return { response: cached, subject };
  }

  const prompt = `${SYSTEM_PROMPT(grade)}

A student asks: "${query}"

Provide a clear, helpful answer. If relevant, suggest related topics they should study.
At the end, add a section "📚 Related Topics:" with 3-5 related topics they can explore.`;

  const response = await generateContentWithFallback(prompt);

  await cache.set(key, response, AI_CACHE_TTL);

  return { response, subject };
}
