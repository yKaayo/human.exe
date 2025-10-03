import axios from "axios";

const url = "https://human-exe.onrender.com";
// const url = "http://127.0.0.1:3000";

export const createProduct = async (productData) => {
  console.log(productData);

  try {
    const { data } = await axios.post(`${url}/produtos`, {
      title: productData.title.trim(),
      description: productData.description.trim(),
      price: parseFloat(productData.price),
      type: productData.type.trim(),
      image: productData.image.trim(),
      producerId: parseInt(productData.producerId),
    });

    if (data.success) return data;
    if (data.error) throw new Error(data.error);
  } catch (err) {
    console.error(err);

    if (err.response?.data?.error) {
      return { error: err.response.data.error };
    }

    if (err.response?.data?.message) {
      return { error: err.response.data.message };
    }

    return { error: err.message || "Erro de conexão. Tente novamente." };
  }
};

export const getAllProducts = async () => {
  try {
    const { data } = await axios.get(`${url}/produtos`);

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

export const getProductById = async (id) => {
  try {
    const { data } = await axios.get(`${url}/produtos/${id}`);

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
