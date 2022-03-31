const isValidProductId = (req, res, next) => {
  const array = req.body;
  const productIdisNull = array.some(({ productId }) => !productId);
  if (productIdisNull) {
    res.status(400).json({ message: '"productId" is required' });
  }
  next();
};

const isValidSalesQuantity = (req, res, next) => {
  const array = req.body;
  const quantityisNull = array.some(({ quantity }) => !quantity);
  if (quantityisNull) {
    res.status(400).json({ message: '"quantity" is required' });
  }

  const quantityLessThanZero = array.some(({ quantity }) => quantity <= 0);
  if (quantityLessThanZero) {
    res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

module.exports = {
  isValidProductId,
  isValidSalesQuantity,
};