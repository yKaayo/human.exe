import {
  createOrder,
  createOrderItem,
  findOrdersByUser,
  findOrderById,
  findOrderItems,
  updateOrderStatus,
  deleteOrder,
} from "../models/orderModel.js";

export const createOrderFromCart = async (req, rep) => {
  const { userId, items, totalAmount, paymentMethod } = req.body;

  if (!userId || !items || !items.length || !totalAmount) {
    return rep.status(400).send({
      success: false,
      error: "Dados incompletos (userId, items, totalAmount são obrigatórios)",
    });
  }

  try {
    const createdAt = new Date();

    const orderId = await createOrder(
      userId,
      totalAmount,
      paymentMethod,
      createdAt
    );

    for (const item of items) {
      const subtotal = item.quantity * item.unitPrice;
      await createOrderItem(
        orderId,
        item.productId,
        item.productName,
        item.quantity,
        item.unitPrice,
        subtotal,
        createdAt
      );
    }

    return rep.status(201).send({
      success: true,
      data: { orderId },
      error: null,
    });
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    return rep.status(500).send({
      success: false,
      error: "Erro ao criar pedido",
    });
  }
};

export const getUserOrders = async (req, rep) => {
  const { userId } = req.params;

  if (!userId) {
    return rep.status(400).send({
      success: false,
      error: "User ID é obrigatório",
    });
  }

  try {
    const orders = await findOrdersByUser(userId);

    return rep.status(200).send({
      success: true,
      data: orders,
      error: null,
    });
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    return rep.status(500).send({
      success: false,
      error: "Erro ao buscar pedidos",
    });
  }
};

export const getOrderDetails = async (req, rep) => {
  const { orderId } = req.params;

  if (!orderId) {
    return rep.status(400).send({
      success: false,
      error: "Order ID é obrigatório",
    });
  }

  try {
    const order = await findOrderById(orderId);

    if (!order) {
      return rep.status(404).send({
        success: false,
        error: "Pedido não encontrado",
      });
    }

    const items = await findOrderItems(orderId);

    return rep.status(200).send({
      success: true,
      data: { order, items },
      error: null,
    });
  } catch (error) {
    console.error("Erro ao buscar detalhes do pedido:", error);
    return rep.status(500).send({
      success: false,
      error: "Erro ao buscar detalhes do pedido",
    });
  }
};

export const updateOrder = async (req, rep) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const validStatuses = [
    "pending",
    "paid",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ];

  if (!orderId || !status) {
    return rep.status(400).send({
      success: false,
      error: "Order ID e status são obrigatórios",
    });
  }

  if (!validStatuses.includes(status)) {
    return rep.status(400).send({
      success: false,
      error: `Status inválido. Use: ${validStatuses.join(", ")}`,
    });
  }

  try {
    const result = await updateOrderStatus(orderId, status, new Date());

    if (!result) {
      return rep.status(404).send({
        success: false,
        error: "Pedido não encontrado",
      });
    }

    return rep.status(200).send({
      success: true,
      message: "Status atualizado com sucesso",
      error: null,
    });
  } catch (error) {
    console.error("Erro ao atualizar pedido:", error);
    return rep.status(500).send({
      success: false,
      error: "Erro ao atualizar pedido",
    });
  }
};

export const cancelOrder = async (req, rep) => {
  const { orderId } = req.params;

  if (!orderId) {
    return rep.status(400).send({
      success: false,
      error: "Order ID é obrigatório",
    });
  }

  try {
    const result = await deleteOrder(orderId);

    if (!result) {
      return rep.status(404).send({
        success: false,
        error: "Pedido não encontrado",
      });
    }

    return rep.status(200).send({
      success: true,
      message: "Pedido cancelado com sucesso",
      error: null,
    });
  } catch (error) {
    console.error("Erro ao cancelar pedido:", error);
    return rep.status(500).send({
      success: false,
      error: "Erro ao cancelar pedido",
    });
  }
};
