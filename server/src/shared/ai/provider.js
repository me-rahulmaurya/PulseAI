import { GoogleGenAI } from "@google/genai";
import config from "../../core/config/env.js";

const ai = new GoogleGenAI({
  apiKey: config.gemini.apiKey,
});

export const generateText = async (prompt) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
};

export default ai;