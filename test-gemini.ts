import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

async function testGemini() {
  console.log("Testing Gemini API...");
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error("❌ GEMINI_API_KEY is missing in environment variables.");
    return;
  }
  
  console.log(`API Key found: ${apiKey.substring(0, 5)}...`);

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "Explain 'Gravity' in one sentence.";
    console.log(`Sending prompt: "${prompt}"`);

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    console.log("✅ API Response Request Successful!");
    console.log("Response:", response);
  } catch (error: any) {
    console.error("❌ Gemini API Error:", error.message);
    if (error.response) {
      console.error("Error Details:", JSON.stringify(error.response, null, 2));
    }
  }
}

testGemini();
