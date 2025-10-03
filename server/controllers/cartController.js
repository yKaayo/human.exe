import {
  findCartByUser,
  addToCart,
  deleteCartItem,
} from "../models/cartModel.js";

export const getCart = async (req, rep) => {
  const { userId } = req.params;

  if (!userId) {
    return rep
      .status(400)
      .send({ success: false, error: "User ID é obrigatório" });
  }

  const cart = await findCartByUser(userId);
  const cartWithNumbers = cart.map((item) => ({
    ...item,
    PRODUCT_ID: Number(item.PRODUCT_ID),
  }));

  return rep.status(200).send({ success: true, data: cartWithNumbers });
};

export const createCartItem = async (req, rep) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return rep.status(400).send({ success: false, error: "Dados incompletos" });
  }

  const result = await addToCart(userId, productId, new Date());
  console.log(result);

  if (!result) {
    return rep
      .status(500)
      .send({ success: false, error: "Erro ao adicionar item ao carrinho" });
  }

  return rep
    .status(201)
    .send({ success: true, message: "Item adicionado com sucesso" });
};

export const removeCartItem = async (req, rep) => {
  const { productId } = req.params;
  const { userId } = req.body;

  if (!productId || !userId) {
    return rep
      .status(400)
      .send({ success: false, error: "Product ID e User ID são obrigatórios" });
  }

  const result = await deleteCartItem(productId, userId);

  if (!result) {
    return rep
      .status(500)
      .send({ success: false, error: "Erro ao remover item" });
  }

  return rep
    .status(200)
    .send({ success: true, message: "Item removido com sucesso" });
};
