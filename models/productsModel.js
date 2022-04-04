const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

const getById = async (id) => {
  const [products] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return products[0];
};

const create = async ({ name, quantity }) => {
  const [{ insertId }] = await connection
    .execute('INSERT INTO products (name, quantity) VALUES (?, ?)',
      [name, quantity]);

  return {
    id: insertId,
    name,
    quantity,
  };
};

const update = async ({ id, name, quantity }) => {
  try {
    const query = ('UPDATE products SET name = ?, quantity = ? WHERE id = ?');

    await connection.execute(query, [name, quantity, id]);

    return {
      id,
      name,
      quantity,
    };
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};