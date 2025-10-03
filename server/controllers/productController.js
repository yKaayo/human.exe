import Product from "../models/productModel.js";

export const create = async (req, res) => {
  try {
    const product = new Product(req.body);
    const result = await product.create();
    console.log(result);

    res.status(201).send({ success: true, data: result, error: null });
  } catch (error) {
    console.error("Erro ao criar memória:", error);
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const result = await Product.findAll();
    res.status(201).send({ success: true, data: result, error: null });
  } catch (error) {
    console.error("Erro ao buscar memórias:", error);
    res.status(201).send({ success: false, data: null, error: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Product.findById(id);

    res.status(200).json(result);
  } catch (error) {
    console.error("Erro ao buscar memória:", error);

    if (error.message.includes("não encontrada")) {
      return res.status(404).send({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const memory = new Product(req.body);
    const result = await memory.update(id);

    res.status(200).send(result);
  } catch (error) {
    console.error("Erro ao atualizar memória:", error);

    if (error.message.includes("não encontrada")) {
      return res.status(404).send({
        success: false,
        message: error.message,
      });
    }

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Product.delete(id);

    res.status(200).json(result);
  } catch (error) {
    console.error("Erro ao deletar memória:", error);

    if (error.message.includes("não encontrada")) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
