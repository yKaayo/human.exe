import axios from "axios";

const url = "https://human-exe.onrender.com";

export const login = async (email, password) => {
  try {
    const { data } = await axios.post(`${url}/usuarios/entrar`, {
      email,
      password,
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

export const register = async (name, email, password) => {
  try {
    const { data } = await axios.post(`${url}/usuarios/registrar`, {
      name,
      email,
      password,
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
