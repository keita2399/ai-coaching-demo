import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export function getGeminiModel(modelName = "gemini-2.5-flash-preview-05-20") {
  return genAI.getGenerativeModel({ model: modelName });
}
