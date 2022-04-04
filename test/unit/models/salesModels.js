const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const salesModel = require('../../../models/salesModel');

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

const updateSale = [
  {
    productId: 1,
    quantity: 6
  }
];

describe('sales models', () => {
  describe('endpoint GET on /sales', () => {
    describe('sales are found', () => {
      before(async () => {
        const execute = [arrayOfAllSeachedSales];
        sinon.stub(connection, 'execute').resolves(execute);
      });
      after(() => connection.execute.restore());

      it('return an array with sales', async () => {
        const response = await salesModel.getAll();

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
        const response = await salesModel.getAll();
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
        const response = await salesModel.getById(1);
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
        const response = await salesModel.getById(1);
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

      it('return the sales created', async () => {
        const response = await salesModel.create(newSale);
        expect(response.saleId).to.be.equal(newSaleReturn.saleId);
        expect(response.productId).to.be.equal(newSaleReturn.productId);
        expect(response.quantity).to.be.equal(newSaleReturn.quantity);
      });
    });
  });

  describe('endpoint PUT on /sales/:id', () => {
    describe('sales was updated', () => {
      before(async () => {
        const execute = [{ insertId: 1 }];
        sinon.stub(connection, 'execute').resolves(execute);
      });
      after(() => connection.execute.restore());

      it('return the sales updated', async () => {
        const saleId = 1;
        const response = await salesModel.update(saleId, updateSale);
        expect(response.saleId).to.be.equal(saleId);        expect(response.itemUpdated).to.be.equal(updateSale);
      });
    });
  });

  describe('endpoint DELETE on /sales/:id', () => {
    describe('sale was deleted', () => {
      before(async () => {
        const execute = updateSale;
        sinon.stub(connection, 'execute').resolves(execute);
      });
      after(() => connection.execute.restore());

      it('return undefined', async () => {
        const response = await salesModel.deleteById(1);
        expect(response).to.be.equal(undefined);
      });
    });
  });
});
