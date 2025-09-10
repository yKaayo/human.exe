import axios from "axios";

const url = "http://localhost:3000";

export const getQuestions = async (answer, currentLife = 100) => {
  try {
    const { data } = await axios.post(`${url}/chat`, {
      prompt: answer,
      currentLife: currentLife,
    });

    if (data.success) {
      return data.data;
    }

    if (data.error) {
      return data;
    }
  } catch (err) {
    console.error("Erro na API:", err);
    return null;
  }
};
