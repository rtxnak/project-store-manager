const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const productsService = require('../../../services/productsService');
const productsModel = require('../../../models/productsModel');

const arrayOfAllSearchedProducts = [
  {
    id: 1,
    name: "produto A",
    quantity: 10
  },
  {
    id: 2,
    name: "produto B",
    quantity: 20
  }
];

const oneProduct = [{
  id: 1,
  name: "produto A",
  quantity: 10
}];

const newProduct = {
  saleid: 1,
  name: "produto A",
  quantity: 10
};

const updateProduct = {
  id: 1,
  name: "produto B",
  quantity: 20
};

describe('products services', () => {
  describe('endpoint GET on /products', () => {
    describe('products are found', () => {
      before(async () => {
        const execute = [arrayOfAllSearchedProducts];
        sinon.stub(connection, 'execute').resolves(execute);
      });
      after(() => connection.execute.restore());

      it('return an array with products', async () => {
        const response = await productsService.getAll();

        expect(response).to.be.equal(arrayOfAllSearchedProducts);
      });
    });
    describe('no product is found', () => {
      before(async () => {
        const execute = [];
        sinon.stub(connection, 'execute').resolves(execute);
      });
      after(() => connection.execute.restore());

      it('return undefined', async () => {
        const response = await productsService.getAll();
        expect(response).to.be.equal(undefined);
      });
    });
  });
  describe('endpoint GET on /products/:id', () => {
    describe('products ID is found', () => {
      before(async () => {
        const execute = [oneProduct];
        sinon.stub(connection, 'execute').resolves(execute);
      });
      after(() => connection.execute.restore());

      it('return the product expected', async () => {
        const response = await productsService.getById(1);

        expect(response).to.be.equal(oneProduct[0]);
      });
    });

    describe('products ID is NOT found', () => {
      before(async () => {
        const execute = [[]];
        sinon.stub(connection, 'execute').resolves(execute);
      });
      after(() => connection.execute.restore());

      it('return undefined', async () => {
        const response = await productsService.getById(1);
        expect(response).to.be.equal(undefined);
      });
    });
  });

  describe('endpoint POST on /products', () => {
    describe('product was created', () => {
      before(async () => {
        const execute = [{ insertId: 1 }];
        sinon.stub(connection, 'execute').resolves(execute);
      });
      after(() => connection.execute.restore());

      it('return the product created', async () => {
        const response = await productsService.create(newProduct);

        expect(response.id).to.be.equal(oneProduct[0].id);
        expect(response.name).to.be.equal(oneProduct[0].name);
        expect(response.quantity).to.be.equal(oneProduct[0].quantity);
      });
    });
  });

  describe('endpoint PUT on /products/:id', () => {
    describe('product was updated', () => {
      before(async () => {
        const { saleid: id, name, quantity } = newProduct;
        sinon.stub(productsModel, 'getById').resolves({ id, name, quantity });
        sinon.stub(productsModel, 'update').resolves(updateProduct);
      });
      after(() => {
        productsModel.getById.restore();
        productsModel.update.restore();
      });

      it('return the product updated', async () => {
        const response = await productsService.update(updateProduct);

        expect(response.id).to.be.equal(updateProduct.id);
        expect(response.name).to.be.equal(updateProduct.name);
        expect(response.quantity).to.be.equal(updateProduct.quantity);
      });
    });
  });

  describe('endpoint DELETE on /products/:id', () => {
    describe('product was deleted', () => {
      before(async () => {
        const { saleid: id, name, quantity } = newProduct;
        sinon.stub(productsModel, 'getById').resolves({ id, name, quantity });
        sinon.stub(productsModel, 'deleteById').resolves();
      });
      after(() => {
        productsModel.getById.restore();
        productsModel.deleteById.restore();
      });

      it('return undefined', async () => {
        const response = await productsService.deleteById(1);
        expect(response).to.be.equal(true);
      });
    });
  });
});