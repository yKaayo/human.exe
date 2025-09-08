// Services
import { getStoryAndQuestion } from "../services/ChatServices.js";

export const promptUser = async (req, rep) => {
  const { prompt } = req.body;
  console.log(prompt);
  

  try {
    const res = await getStoryAndQuestion(prompt);
    return rep.status(200).send({ success: true, data: res, error: null });
  } catch (error) {
    return rep
      .status(500)
      .send({ success: false, data: null, error: error.message });
  }
};
