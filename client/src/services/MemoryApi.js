import axios from "axios";

// const url = "https://human-exe.onrender.com";
const url = "http://127.0.0.1:3000";

export const getAllMemories = async () => {
  try {
    const { data } = await axios.get(`${url}/memorias/`);

    if (data.success) return data;
    if (data.error) throw new Error(data.error);
  } catch (err) {
    console.error(err);

    if (err.response?.data?.error) {
      return { error: err.response.data.error };
    }

    return { error: err.message || "Erro de conexão. Tente novamente." };
  }
};

export const createMemory = async (id, title, memory) => {
  try {
    const { data } = await axios.post(`${url}/memorias/`, {
      id,
      title,
      memory,
    });

    if (data.success) return data;
    if (data.error) throw new Error(data.error);
  } catch (err) {
    console.error(err);

    if (err.response?.data?.error) {
      return { error: err.response.data.error };
    }

    return { error: err.message || "Erro de conexão. Tente novamente." };
  }
};
