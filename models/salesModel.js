const connection = require('./connection');

const getAll = async () => {
  const [sales] = await connection.execute('SELECT * FROM sales');
  return sales;
};

const getById = async (id) => {
  const [sales] = await connection.execute('SELECT * FROM sales WHERE id = ?', [id]);
  return sales[0];
};

module.exports = {
  getAll,
  getById,
};