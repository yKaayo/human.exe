import { storytellerAgent } from "../config/langchain.js";
import OpenAI from "openai";

export const getStoryAndQuestion = async (prompt) => {
  try {
    // const res = await storytellerAgent.invoke(prompt);

    const openai = new OpenAI({
      // baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENAI_API_KEY,
    });
    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: "What is the meaning of life?",
        },
      ],
    });

    res.then((result) => console.log(result.output_text));
    return res;
  } catch (err) {
    console.error("Erro em getStoryAndQuestion:", err);
    return null;
  }
};
