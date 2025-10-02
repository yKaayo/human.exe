import { getConnection } from "../config/oracle.js";

export const createOrder = async (
  userId,
  totalAmount,
  paymentMethod,
  createdAt
) => {
  const conn = await getConnection();

  try {
    const result = await conn.execute(
      `INSERT INTO cyberpunk_orders (id, id_user, total_amount, status, payment_method, created_at) 
       VALUES (seq_orders.NEXTVAL, :id_user, :total_amount, 'pending', :payment_method, :created_at)
       RETURNING id INTO :id`,
      {
        id_user: { val: userId },
        total_amount: { val: totalAmount },
        payment_method: { val: paymentMethod },
        created_at: { val: createdAt },
        id: { dir: conn.BIND_OUT, type: conn.NUMBER },
      },
      { autoCommit: false }
    );

    return result.outBinds.id[0];
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    await conn.close();
  }
};

export const createOrderItem = async (
  orderId,
  productId,
  productName,
  quantity,
  unitPrice,
  subtotal,
  createdAt
) => {
  const conn = await getConnection();

  try {
    const result = await conn.execute(
      `INSERT INTO cyberpunk_order_items (id, id_order, product_id, product_name, quantity, unit_price, subtotal, created_at)
       VALUES (seq_order_items.NEXTVAL, :id_order, :product_id, :product_name, :quantity, :unit_price, :subtotal, :created_at)`,
      {
        id_order: { val: orderId },
        product_id: { val: productId },
        product_name: { val: productName },
        quantity: { val: quantity },
        unit_price: { val: unitPrice },
        subtotal: { val: subtotal },
        created_at: { val: createdAt },
      },
      { autoCommit: true }
    );

    return result.rowsAffected;
  } finally {
    await conn.close();
  }
};

export const findOrdersByUser = async (userId) => {
  const conn = await getConnection();

  try {
    const result = await conn.execute(
      `SELECT * FROM cyberpunk_orders 
       WHERE id_user = :id_user 
       ORDER BY created_at DESC`,
      {
        id_user: { val: userId },
      }
    );

    return result.rows;
  } finally {
    await conn.close();
  }
};

export const findOrderById = async (orderId) => {
  const conn = await getConnection();

  try {
    const result = await conn.execute(
      `SELECT * FROM cyberpunk_orders WHERE id = :id`,
      {
        id: { val: orderId },
      }
    );

    return result.rows[0];
  } finally {
    await conn.close();
  }
};

export const findOrderItems = async (orderId) => {
  const conn = await getConnection();

  try {
    const result = await conn.execute(
      `SELECT * FROM cyberpunk_order_items WHERE id_order = :id_order`,
      {
        id_order: { val: orderId },
      }
    );

    return result.rows;
  } finally {
    await conn.close();
  }
};

export const updateOrderStatus = async (orderId, status, updatedAt) => {
  const conn = await getConnection();

  try {
    const result = await conn.execute(
      `UPDATE cyberpunk_orders 
       SET status = :status, updated_at = :updated_at
       WHERE id = :id`,
      {
        status: { val: status },
        updated_at: { val: updatedAt },
        id: { val: orderId },
      },
      { autoCommit: true }
    );

    return result.rowsAffected;
  } finally {
    await conn.close();
  }
};

export const deleteOrder = async (orderId) => {
  const conn = await getConnection();

  try {
    const result = await conn.execute(
      `DELETE FROM cyberpunk_orders WHERE id = :id`,
      {
        id: { val: orderId },
      },
      { autoCommit: true }
    );

    return result.rowsAffected;
  } finally {
    await conn.close();
  }
};
