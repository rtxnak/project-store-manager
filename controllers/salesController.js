const salesService = require('../services/salesService');

const getAll = async (_req, res) => {
  try {
    const sales = await salesService.getAll();
    return res.status(200).json(sales);
  } catch (err) {
    return res.status(500).json({ message: 'Erro no Servidor' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const sales = await salesService.getById(id);
    if (sales.length < 1) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    return res.status(200).json(sales);
  } catch (err) {
    return res.status(500).json({ message: 'Erro no Servidor' });
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
      { id: ID, itemsSold: array },
    );
  } catch (err) {
    return res.status(500).json({ message: 'Erro no Servidor' });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    // a validação deste controller está sendo feita pelo middlware nas rotas

    const product = await salesService.update(id, body);

    return res.status(200).json(product);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Erro no Servidor' });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};