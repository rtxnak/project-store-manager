const salesService = require('../services/salesService');

const getAll = async (_req, res) => {
  try {
    const sales = await salesService.getAll();
    return res.status(200).json(sales);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const sales = await salesService.getById(id);
    if (!sales) throw new Error('404 message: Product not found');
    return res.status(200).json(sales);
  } catch (err) {
    console.log(err);
    return res.status(404).send({ message: 'Sale not found' });
  }
};

const create = async (req, res) => {
  try {
    const array = req.body;
    const ID = await salesService.createSalesDate();
    array.forEach(async ({ productId, quantity }) => {
      if (productId && quantity) {
        await salesService.create({ ID, productId, quantity });
      } 
    });
    return res.status(201).json(
      {
        id: ID,
        itemsSold: array,
      },
    );
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
};

module.exports = {
  getAll,
  getById,
  create,
};