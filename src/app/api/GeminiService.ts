// GeminiService.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;

const genAI = new GoogleGenerativeAI(API_KEY);

export async function getInitialMessage() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are WeatherWise, an AI assistant specializing in weather information. Start with a friendly, inviting greeting. Then ask the user what location they'd like to know about the weather for and mention that you can offer specific advice and suggestions based on the weather.`;

    const result = await model.generateContent(prompt);
    const response = await result?.response;
    return response ? response.text() : "Hello! I’m here to provide weather insights. Let me know your location!";
  } catch (error) {
    console.error("Error in getInitialMessage:", error);
    return "Hello! I'm WeatherWise. It seems I'm having trouble fetching the initial message. Please tell me your location, and I can provide weather information!";
  }
}

export async function getGeminiResponse(weatherData: any, userMessage: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `You are WeatherWise, an AI assistant specializing in weather information. Your main job is to respond to the **user's specific weather-related question or comment** and provide relevant weather insights, avoiding unrelated information.

**User's Message**: "${userMessage}"

**Current Weather Data**:
${JSON.stringify(weatherData, null, 2)}

When crafting your response:
1. **If the user's question is clearly weather-related**, answer directly, focusing on the user’s intent (e.g., explanations for hazy conditions or advice based on weather conditions).
2. If the user’s question is unrelated to weather (e.g., questions about celebrities, phones, or non-weather topics), respond politely, explaining that you specialize in weather information and invite them to ask about the weather instead.
3. If needed, provide **only the most relevant weather details** to address the question. Avoid repeating the entire weather dataset unless explicitly asked.
4. If the user follows up with additional relevant questions, stay focused on providing clear explanations or practical advice.

Respond conversationally, warmly, and **keep the response focused on weather-related information**.`

    const result = await model.generateContent(prompt);
    const response = await result?.response;
    return response ? response.text() : "I'm sorry, I'm having trouble processing that. Can you try asking again or rephrasing your question?";
  } catch (error) {
    console.error("Error in getGeminiResponse:", error);
    return "Oops, I'm having trouble providing a response at the moment. Please try again soon!";
  }
}



export async function extractLocation(message: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Identify the location mentioned in the user's message and return only the location name if it is clearly present. If no clear location is mentioned, return "None." Ensure that abbreviations or nicknames are expanded to the full name if possible.
Message: "${message}"
Location:`;

    const result = await model.generateContent(prompt);
    const response = await result?.response;
    const location = response ? response.text().trim() : "None";
    return location === "None" ? null : location;
  } catch (error) {
    console.error("Error in extractLocation:", error);
    return null;
  }
}
