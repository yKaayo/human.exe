// Services
import { getStoryAndQuestion } from "../services/ChatServices.js";

export const promptUser = async (req, rep) => {
  const { prompt, currentLife = 100 } = req.body;

  try {
    const res = await getStoryAndQuestion(prompt, currentLife);

    return rep.status(200).send({
      success: true,
      data: res,
      error: null,
    });
  } catch (error) {
    console.error("Erro no controller:", error);
    return rep.status(500).send({
      success: false,
      data: null,
      error: error.message,
    });
  }
};
