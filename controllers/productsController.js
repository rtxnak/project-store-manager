const productsService = require('../services/productsService');

const getAll = async (_req, res) => {
  try {
    const products = await productsService.getAll();
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await productsService.getById(id);
    if (!products) throw new Error('404 message: Product not found');
    return res.status(200).json(products);
  } catch (err) {
    console.log(err);
    return res.status(404).send({ message: 'Product not found' });
  }
};

module.exports = {
  getAll,
  getById,
};