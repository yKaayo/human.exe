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

  return rep.status(200).send({ success: true, data: cart });
};

export const createCartItem = async (req, rep) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return rep.status(400).send({ success: false, error: "Dados incompletos" });
  }

  const result = await addToCart(userId, productId, new Date());

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
  const { cartId } = req.body;

  if (!cartId) {
    return rep
      .status(400)
      .send({ success: false, error: "Cart ID é obrigatório" });
  }

  const result = await deleteCartItem(cartId);

  if (!result) {
    return rep
      .status(500)
      .send({ success: false, error: "Erro ao remover item" });
  }

  return rep
    .status(200)
    .send({ success: true, message: "Item removido com sucesso" });
};
