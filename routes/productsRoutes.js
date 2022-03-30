const express = require('express');
const productsController = require('../controllers/productsController');

const routes = express.Router();

routes
  .get('/', productsController.getAll)
  .get('/:id', productsController.getById);

module.exports = routes;