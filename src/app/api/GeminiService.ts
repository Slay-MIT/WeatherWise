// GeminiService.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;

const genAI = new GoogleGenerativeAI(API_KEY);

export async function getInitialMessage() {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `You are WeatherWise, an AI assistant specializing in weather information. Give a friendly greeting and ask the user what location they'd like to know about the weather for.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

export async function getGeminiResponse(weatherData: any, userMessage: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `You are WeatherWise, an AI assistant specializing in weather information. The user's message is: "${userMessage}"

Current weather data:
${JSON.stringify(weatherData, null, 2)}

Based on this information and the user's message, provide a response that:
1. Directly addresses the user's specific question or comment about the weather in a friendly and casual tone
2. Gives a brief description of the current weather conditions as if you are chatting with a friend. Mentioning stats is also fine.
3. Mentions any potential weather-related risks or warnings in a straightforward manner
4. Provides practical recommendations for activities or precautions based on the weather
5. Shares an interesting weather fact related to the current conditions or the location, but only if it's relevant and fits naturally into the conversation

Keep your response conversational, friendly, and engaging. Imagine you're having a casual chat with the user. If the user asks a follow-up question that doesn't require new weather data, answer based on the information you already have. If the user asks an unrelated question, gently steer the conversation back to the weather.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

export async function extractLocation(message: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Extract the location name from the following message Return only the location name if it is present. If there's no clear location, return "None".
Message: "${message}"
Location:`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const location = response.text().trim();
  return location === "None" ? null : location;
}