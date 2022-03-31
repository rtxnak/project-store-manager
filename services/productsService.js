const productsModel = require('../models/productsModel');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getById = async (id) => {
  try {
    const products = await productsModel.getById(id);
    return products;
  } catch (error) {
    console.log(error);
    return { error: 500, message: 'Erro no Servidor' };
  }
};

const create = async (product) => {
  try {
    const { name, quantity } = product;

    const created = await productsModel.create({ name, quantity });

    return created;
  } catch (error) {
    console.log(error);
    return { error: 500, message: 'Erro no Servidor' };
  }
};

module.exports = { 
  getAll, 
  getById,
  create,
};