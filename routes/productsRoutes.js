const express = require('express');
const productsController = require('../controllers/productsController');

const {
  isValidName,
  isValidProductQuantity,
} = require('../middlewares/productValidation');

const routes = express.Router();

routes
  .get('/', productsController.getAll)
  .get('/:id', productsController.getById)
  .post('/', 
  isValidName,
  isValidProductQuantity, 
  productsController.create);

module.exports = routes;