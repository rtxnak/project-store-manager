const productsService = require('../services/productsService');

const isValidName = async (req, res, next) => {
  const { name } = req.body;
  
  if (!name) {
    return res.status(400).json({ message: '"name" is required' }); 
  }

  if (name.length <= 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' }); 
  }

  next();
};

const isNameExist = async (req, res, next) => {
  const { name } = req.body;

  const products = await productsService.getAll();
  const exist = products.some(({ name: DBname }) => DBname === name);

  if (exist) {
    return res.status(409).json({ message: 'Product already exists' }); 
  }

  next();
};

const isValidProductQuantity = (req, res, next) => {
  const { quantity } = req.body;
  
  if (quantity === undefined) {
    return res.status(400).json({ message: '"quantity" is required' }); 
  }

  if (quantity <= 0) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' }); 
  }

  next();
};

module.exports = {
  isValidName,
  isNameExist,
  isValidProductQuantity,
};