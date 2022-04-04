const salesModel = require('../models/salesModel');

const ERROR = { error: 500, message: 'Erro no Servidor' };

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
    return ERROR;
  }
};

const createSalesDate = async () => {
  try {
    const createSalesID = await salesModel.createSalesDate();

    return createSalesID;
  } catch (error) {
    console.log(error);
    return ERROR;
  }
};

const create = async (product) => {
  try {
    const { ID, productId, quantity } = product;

    const created = await salesModel.create({ ID, productId, quantity });

    return created;
  } catch (error) {
    console.log(error);
    return ERROR;
  }
};

const update = async (saleId, products) => {
  try {
    const exist = await salesModel.getById(saleId);

    if (!exist) {
      return { error: 404, message: 'Product not found' };
    }

    const updated = await salesModel.update(saleId, products);

    return updated;
  } catch (error) {
    return ERROR;
  }
};

const deleteById = async (id) => {
  try {
    const exist = await salesModel.getById(id);
    if (exist.length <= 0) {
      return false;
    }
    await salesModel.deleteById(id);
    return true;
  } catch (error) {
    return ERROR;
  }
};

module.exports = {
  getAll,
  getById,
  createSalesDate,
  create,
  update,
  deleteById,
};