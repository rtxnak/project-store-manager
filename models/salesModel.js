const connection = require('./connection');

const getAll = async () => {
  // eslint-disable-next-line max-len
  const query = `select
  salesproducts.sale_id as saleId,
  salesproducts.product_id as productId,
  salesproducts.quantity as quantity,
  sales.date as date
  from StoreManager.sales_products as salesproducts
  join StoreManager.sales as sales on sales.id = salesproducts.sale_id
  order by saleId, productId asc`;
  const [sales] = await connection.execute(query);
  return sales;
};

const getById = async (saleId) => {
  const query = `select
  sales.product_id as productId,
  sales.quantity as quantity,
  dates.date as date
  from StoreManager.sales_products as sales
  join StoreManager.sales as dates on dates.id = sales.sale_id
  WHERE id = ?
  order by productId asc;`;
  const [sales] = await connection.execute(query, [saleId]);
  return sales;
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
  const [sales] = await connection.execute('SELECT * FROM sales');

    const [sales] = await connection.execute('SELECT * FROM sales WHERE id = ?', [id]);
*/