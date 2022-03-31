const connection = require('./connection');

const getAll = async () => {
  const [sales] = await connection.execute('SELECT * FROM sales');
  return sales;
};

const getById = async (id) => {
  const [sales] = await connection.execute('SELECT * FROM sales WHERE id = ?', [id]);
  return sales[0];
};

const createSalesDate = async () => {
  const [{ insertId }] = await connection
    .execute(
      'INSERT INTO sales (date) VALUES (now())',
    );
  return insertId;
};

const create = async ({ ID, productId, quantity }) => {
  await connection
    .execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [ID, productId, quantity],
    );

  return {
    saleId: ID,
    productId,
    quantity,
  };
};

module.exports = {
  getAll,
  getById,
  createSalesDate,
  create,
};

/*
       'INSERT INTO sales_products (sale_Id, product_id, quantity) VALUES (?, ?, ?)',
      [productId, quantity],
*/