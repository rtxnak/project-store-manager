const salesModel = require('../models/salesModel');

const getAll = async () => {
  const sales = await salesModel.getAll();
  return sales;
};

const getById = async (id) => {
  try {
    const sales = await salesModel.getById(id);
    return sales;
  } catch (error) {
    console.log(error);
    return { error: 500, message: 'Erro no Servidor' };
  }
};

const createSalesDate = async () => {
  try {
    const createSalesID = await salesModel.createSalesDate();

    return createSalesID;
  } catch (error) {
    console.log(error);
    return { error: 500, message: 'Erro no Servidor' };
  }
};

const create = async (product) => {
  try {
    const { ID, productId, quantity } = product;

    const created = await salesModel.create({ ID, productId, quantity });

    return created;
  } catch (error) {
    console.log(error);
    return { error: 500, message: 'Erro no Servidor' };
  }
};

module.exports = { 
  getAll, 
  getById,
  createSalesDate,
  create,
};