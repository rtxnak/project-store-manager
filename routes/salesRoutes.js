const express = require('express');
const salesController = require('../controllers/salesController');

const {
  isValidProductId,
  isValidSalesQuantity,
} = require('../middlewares/salesValidation ');

const routes = express.Router();

routes
  .get('/', salesController.getAll)
  .get('/:id', salesController.getById)
  .post('/',
  isValidSalesQuantity,
    isValidProductId,
    salesController.create)
  .put('/:id',
  isValidSalesQuantity,
    isValidProductId,
    salesController.update);
module.exports = routes;