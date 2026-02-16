import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey!);
  console.log("Testing gemini-2.0-flash...");
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent("Hello");
    console.log("✅ GEMINI-2.0-FLASH WORKS!", result.response.text());
  } catch (e: any) {
    console.log("❌ GEMINI-2.0-FLASH FAILED:", e.message);
  }
}
main();
