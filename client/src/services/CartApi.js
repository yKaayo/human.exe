import axios from "axios";

const url = "https://human-exe.onrender.com";

export const getItems = async (userId) => {
  try {
    const { data } = await axios.post(`${url}/carrinho/${userId}`);

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

export const addItem = async (userId, itemId) => {
  try {
    const { data } = await axios.post(`${url}/carrinho/`, {
      userId,
      itemId,
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
