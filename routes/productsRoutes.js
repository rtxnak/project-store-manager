const express = require('express');
const productsController = require('../controllers/productsController');

const {
  isValidName,
  isNameExist,
  isValidProductQuantity,
} = require('../middlewares/productValidation');

const routes = express.Router();

routes
  .get('/', productsController.getAll)
  .get('/:id', productsController.getById)
  .post('/',
    isValidProductQuantity,
    isValidName,
    isNameExist,
    productsController.create)
  .put('/:id',
    isValidProductQuantity,
    isValidName,
    productsController.update)
  .delete('/:id', productsController.deleteById);

module.exports = routes;