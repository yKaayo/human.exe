import axios from "axios";

const url = "http://localhost:3000";

export const getQuestions = async (answer) => {
  try {
    const { data } = await axios.post(`${url}/chat`, {
      prompt: answer,
    });

    console.log(data);
    

    
  } catch (err) {
    console.error(err);
    return null;
  }
};
