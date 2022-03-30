const express = require('express');
const salesController = require('../controllers/salesController');

const routes = express.Router();

routes
  .get('/', salesController.getAll)
  .get('/:id', salesController.getById);

module.exports = routes;