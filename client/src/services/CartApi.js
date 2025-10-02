import axios from "axios";
import { toast } from "react-toastify";

// const url = "https://human-exe.onrender.com";
const url = "http://127.0.0.1:3000";

export const getItems = async (userId) => {
  try {
    const { data } = await axios.get(`${url}/carrinho/${userId}`);

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

export const addItem = async (userId, productId) => {
  try {
    const { data } = await axios.post(`${url}/carrinho/`, {
      userId,
      productId,
    });

    if (data.success) {
      toast.success("Item adicionado ao carrinho!");
      return data;
    }
    if (data.error) throw new Error(data.error);
  } catch (err) {
    toast.error("Erro ao remover item ao carrinho.");

    console.error(err);

    if (err.response?.data?.error) {
      return { error: err.response.data.error };
    }

    return { error: err.message || "Erro de conexão. Tente novamente." };
  }
};

export const removeItem = async (productId, userId) => {
  try {
    const { data } = await axios.delete(`${url}/carrinho/${productId}`, {
      data: { userId },
    });

    if (data.success) {
      toast.success("Removido do carrinho!");
      return data;
    }
    if (data.error) throw new Error(data.error);
  } catch (err) {
    console.error(err);

    if (err.response?.data?.error) {
      return { error: err.response.data.error };
    }

    return { error: err.message || "Erro de conexão. Tente novamente." };
  }
};
