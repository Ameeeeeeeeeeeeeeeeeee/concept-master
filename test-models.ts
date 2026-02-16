import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return console.error("No API key");

  const genAI = new GoogleGenerativeAI(apiKey);
  try {
    const models = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Placeholder
    // Actually need to list models cleanly?
    // The current SDK doesn't expose listModels directly on GenAI instance?
    // It does. genAI.getGenerativeModel() returns a model.
    // listModels might be on genAI manager or need REST call?
    // Let's use a try/catch loop on common models.
  } catch (e) {
    // ignore
  }
}

// Better approach: Just try gemini-pro.
async function tryModel(name: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey!);
  const model = genAI.getGenerativeModel({ model: name });
  try {
    await model.generateContent("Test");
    console.log(`✅ Model ${name} works!`);
  } catch (e: any) {
    console.log(`❌ Model ${name} failed: ${e.message}`);
  }
}

async function main() {
  await tryModel("gemini-1.5-flash");
  await tryModel("gemini-pro");
  await tryModel("gemini-1.0-pro");
}

main();
