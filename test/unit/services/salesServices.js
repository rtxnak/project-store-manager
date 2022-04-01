const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const salesService = require('../../../services/salesService');

const arrayOfAllSeachedSales = [
  {
    saleId: 1,
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2
  },
  {
    saleId: 1,
    date: "2021-09-09T04:54:54.000Z",
    productId: 2,
    quantity: 2
  }
];

const newSale = {
  ID: 1,
  productId: 1,
  quantity: 2
};

const newSaleReturn = {
  saleId: 1,
  productId: 1,
  quantity: 2
};


describe('sales models', () => {
  describe('endpoint GET on /sales', () => {
    describe('sales are found', () => {
      before(async () => {
        const execute = [arrayOfAllSeachedSales];
        sinon.stub(connection, 'execute').resolves(execute);
      });
      after(() => connection.execute.restore());

      it('return an array with sales', async () => {
        const response = await salesService.getAll();

        expect(response).to.be.equal(arrayOfAllSeachedSales);
      });
    });

    describe('no sales is found', () => {
      before(async () => {
        const execute = [];
        sinon.stub(connection, 'execute').resolves(execute);
      });
      after(() => connection.execute.restore());

      it('return undefined', async () => {
        const response = await salesService.getAll();
        expect(response).to.be.equal(undefined);
      });
    });
  });


  describe('endpoint GET on /sales/:id', () => {
    describe('sale ID is found', () => {
      before(async () => {
        const execute = [arrayOfAllSeachedSales];
        sinon.stub(connection, 'execute').resolves(execute);
      });
      after(() => connection.execute.restore());

      it('return the sale expected', async () => {
        const response = await salesService.getById(1);
        expect(response).to.be.equal(arrayOfAllSeachedSales);
      });
    });

    describe('sale ID is NOT found', () => {
      before(async () => {
        const execute = [];
        sinon.stub(connection, 'execute').resolves(execute);
      });
      after(() => connection.execute.restore());

      it('return undefined', async () => {
        const response = await salesService.getById(1);
        expect(response).to.be.equal(undefined);
      });
    });
  });

  describe('endpoint POST on /sales', () => {
    describe('sales was created', () => {
      before(async () => {
        const execute = [{ insertId: 1 }];
        sinon.stub(connection, 'execute').resolves(execute);
      });
      after(() => connection.execute.restore());

      it('return the product created', async () => {
        const response = await salesService.create(newSale);

        expect(response.saleId).to.be.equal(newSaleReturn.saleId);
        expect(response.productId).to.be.equal(newSaleReturn.productId);
        expect(response.quantity).to.be.equal(newSaleReturn.quantity);
      });
    });
  });
});
