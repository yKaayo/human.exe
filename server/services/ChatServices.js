// services/storyService.js
import { storytellerAgent } from "../config/langchain.js";

export const getStoryAndQuestion = async (prompt) => {
  try {
    const res = await storytellerAgent.invoke(prompt);

    // A API pode retornar texto com JSON dentro, aqui tentamos parsear
    let parsed;
    try {
      parsed = JSON.parse(res.content);
    } catch {
      console.warn("Resposta não veio como JSON estrito:", res.content);
      return res.content;
    }

    console.log("História gerada:", parsed);
    return parsed;
  } catch (err) {
    console.error("Erro em getStoryAndQuestion:", err);
    return null;
  }
};
