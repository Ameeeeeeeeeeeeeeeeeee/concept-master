import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey!);
  console.log("Testing gemini-pro...");
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent("Hello");
    console.log("✅ GEMINI-PRO WORKS!", result.response.text());
  } catch (e: any) {
    console.log("❌ GEMINI-PRO FAILED:", e.message);
  }
}
main();
