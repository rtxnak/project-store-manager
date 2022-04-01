const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
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

describe('products models', () => {
  describe('endpoint GET on /products', () => {
    describe('products are found', () => {
      before(async () => {
        const execute = [arrayOfAllSearchedProducts];
        sinon.stub(connection, 'execute').resolves(execute);
      });
      after(() => connection.execute.restore());

      it('return an array with products', async () => {
        const response = await productsModel.getAll();

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
        const response = await productsModel.getAll();
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
        const response = await productsModel.getById(1);

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
        const response = await productsModel.getById(1);

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
        const response = await productsModel.create(newProduct);

        expect(response.id).to.be.equal(oneProduct[0].id);
        expect(response.name).to.be.equal(oneProduct[0].name);
        expect(response.quantity).to.be.equal(oneProduct[0].quantity);
      });
    });
  });
});
