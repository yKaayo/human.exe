import { storytellerAgent } from "../config/langchain.js";

export const getStoryAndQuestion = async (prompt, currentLife = 100) => {
  try {
    const isEnding = currentLife <= 0;

    const result = await storytellerAgent.invoke(prompt, {
      isEnding,
      currentLife,
    });

    return result.parsed;
  } catch (error) {
    console.error("Erro no chat service:", error);
    throw new Error("Erro ao processar história: " + error.message);
  }
};
