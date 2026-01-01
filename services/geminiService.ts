
import { GoogleGenAI } from "@google/genai";

export const getNewsSummary = async (content: string): Promise<string | undefined> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `দয়া করে নিচের সংবাদটির একটি সংক্ষেপ (Summary) প্রদান করুন ৩-৪টি বুলেট পয়েন্টে। ভাষা হবে সহজ বাংলা:\n\n${content}`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return undefined;
  }
};

export const searchNewsGrounded = async (query: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `নওগাঁ বা বাংলাদেশ সম্পর্কিত এই প্রশ্নটির উত্তর দিন: ${query}`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });
    
    return {
      text: response.text,
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("Gemini Search Error:", error);
    return null;
  }
};
