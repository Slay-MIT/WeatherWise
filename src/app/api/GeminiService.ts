// GeminiService.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "YOUR_GEMINI_API_KEY";
const genAI = new GoogleGenerativeAI(API_KEY);

export async function getGeminiResponse(weatherData: any) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Given the following weather data, provide advice and information about the weather conditions:
  ${JSON.stringify(weatherData, null, 2)}
  Please include:
  1. A brief description of the current weather
  2. Any potential weather-related risks or warnings
  3. Recommendations for activities or precautions based on the weather
  4. Any interesting weather facts related to the current conditions`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}