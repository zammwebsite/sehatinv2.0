
import { GoogleGenAI, Chat } from "@google/genai";
import { ChatMessage } from '../types';

const apiKey = process.env.API_KEY;

if (!apiKey) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey });

const model = ai.chats.create({
  model: 'gemini-2.5-flash',
  config: {
    systemInstruction: `You are Sehatin AI, a friendly and helpful medical assistant. 
    Your goal is to provide general health information, tips, and answer user questions about health in a clear and supportive way.
    You are not a substitute for a professional medical doctor. Always advise users to consult with a healthcare professional for diagnosis and treatment.
    Keep your answers concise and easy to understand for a general audience.
    Respond in Indonesian unless the user asks in another language.`,
  }
});

export const getAiChatResponse = async (history: ChatMessage[], newMessage: string): Promise<string> => {
  try {
    const chat: Chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }]
      })),
      config: {
        systemInstruction: `You are Sehatin AI, a friendly and helpful medical assistant. 
        Your goal is to provide general health information, tips, and answer user questions about health in a clear and supportive way.
        You are not a substitute for a professional medical doctor. Always advise users to consult with a healthcare professional for diagnosis and treatment.
        Keep your answers concise and easy to understand for a general audience.
        Respond in Indonesian unless the user asks in another language.`,
      }
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text;
  } catch (error) {
    console.error("Error getting AI response:", error);
    return "Maaf, terjadi kesalahan saat menghubungi asisten AI. Coba lagi nanti.";
  }
};
