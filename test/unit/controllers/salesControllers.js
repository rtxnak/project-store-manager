const { expect } = require('chai');
const sinon = require('sinon');
// const connection = require('../../../models/connection');
const salesController = require('../../../controllers/salesController');
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

const arrayOfSalesById = [
  {
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2,
  },
  {
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 2,
  },
];

const newSaleBody = [
  {
    productId: 1,
    quantity: 2
  },
  {
    productId: 2,
    quantity: 5
  }
]

const newSaleReturn = {
  id: 4,
  itemsSold: [
    {
      productId: 1,
      quantity: 2
    },
    {
      productId: 2,
      quantity: 5
    }
  ]
}

describe('Sales controller', () => {
  describe('endpoint GET on /sales', () => {
    describe('sales are found', () => {
      const response = {};
      const request = {};
      before(() => {
        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns();
        sinon.stub(salesService, 'getAll').resolves(arrayOfAllSeachedSales)
      })

      after(() => salesService.getAll.restore());

      it('return status 200', async () => {
        await salesController.getAll(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true)
      });
      it('return json with product', async () => {
        await salesController.getAll(request, response);
        expect(response.json.calledWith(arrayOfAllSeachedSales)).to.be.equal(true)
      });
    })
  });

  describe('endpoint GET on /sales/:id', () => {
    describe('sale ID is found', () => {
      const response = {};
      const request = { params: { id: 1 } };
      before(() => {
        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns();
        sinon.stub(salesService, 'getById').resolves(arrayOfSalesById)
      })

      after(() => salesService.getById.restore());

      it('return status 200', async () => {
        await salesController.getById(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true)
      });

      it('return json with product', async () => {
        await salesController.getById(request, response);
        expect(response.json.calledWith(arrayOfSalesById)).to.be.equal(true)
      });
    })

    describe('sale ID is not found', () => {
      const response = {};
      const request = {};
      before(() => {
        request.params = { id: 1 };
        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns();
        sinon.stub(salesService, 'getById').resolves([]);
      })

      after(() => salesService.getById.restore());

      it('return status 404', async () => {
        await salesController.getById(request, response);
        expect(response.status.calledWith(404)).to.be.equal(true)
      });
    })
  })

  describe('endpoint POST on /sales', () => {
    describe('sale was created', () => {
      const response = {};
      const request = { body: newSaleBody };
      before(() => {
        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns();
        sinon.stub(salesService, 'create').resolves(newSaleReturn)
      })

      after(() => salesService.create.restore());

      it('return status 201', async () => {
        await salesController.create(request, response);
        expect(response.status.calledWith(201)).to.be.equal(true)
      });
      // it('return json with product', async () => {
      //   await salesController.create(request, response);
      //   expect(response.json.calledWith(newSaleReturn)).to.be.equal(true)
      // });
    });
  });

  describe('endpoint PUT on /sales/:id', () => {
    describe('sale was updated', () => {
      const response = {};
      const request = { body: newSaleBody, params: { id: 4 } };
      before(() => {
        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns();
        sinon.stub(salesService, 'update').resolves(newSaleReturn)
      })

      after(() => salesService.update.restore());

      it('return status 200', async () => {
        await salesController.update(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true)
      });
      it('return json with product', async () => {
        await salesController.update(request, response);
        console.log(response.json)
        expect(response.json.calledWith(newSaleReturn)).to.be.equal(true)
      });
    });
  });
});
