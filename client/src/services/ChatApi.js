import axios from "axios";

const url = "http://localhost:3000";

export const getQuestions = async (answer) => {
  try {
    const { data } = await axios.post(`${url}/chat`, {
      prompt: answer,
    });

    if (data.success) {
      return data.data.message[0];
    }

    if (data.error) {
      return data;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};
