import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

async function tryModel(name: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey!);
  console.log(`Testing ${name}...`);
  try {
    const model = genAI.getGenerativeModel({ model: name });
    const result = await model.generateContent("Hello");
    console.log(`✅ ${name} WORKS!`, result.response.text());
    return true;
  } catch (e: any) {
    console.log(`❌ ${name} FAILED:`, e.message);
    return false;
  }
}

async function main() {
  await tryModel("gemini-1.5-flash");
  await tryModel("gemini-1.5-flash-001");
  await tryModel("gemini-1.5-flash-002");
  await tryModel("models/gemini-1.5-flash");
  await tryModel("gemini-2.5-flash");
}

main();
