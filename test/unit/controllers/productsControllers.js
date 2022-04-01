const { expect } = require('chai');
const sinon = require('sinon');
// const connection = require('../../../models/connection');
const productsController = require('../../../controllers/productsController');
const productsService = require('../../../services/productsService');

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

const oneProduct = {
  id: 1,
  name: "produto A",
  quantity: 10
};

const newProduct = {
  name: "produto A",
  quantity: 10
};


describe('Products controller', () => {
  describe('endpoint GET on /products', () => {
    describe('products are found', () => {
      const response = {};
      const request = {};
      before(() => {
        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns();
        sinon.stub(productsService, 'getAll').resolves(arrayOfAllSearchedProducts)
      })

      after(() => productsService.getAll.restore());

      it('return status 200', async () => {
        await productsController.getAll(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true)
      });
      it('return json with product', async () => {
        await productsController.getAll(request, response);
        expect(response.json.calledWith(arrayOfAllSearchedProducts)).to.be.equal(true)
      });
    });
  });

  describe('endpoint GET on /product/:id', () => {
    describe('products are found', () => {
      const response = {};
      const request = { params: { id: 1 } };
      before(() => {
        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns();
        sinon.stub(productsService, 'getById').resolves(oneProduct)
      })

      after(() => productsService.getById.restore());

      it('return status 200', async () => {
        await productsController.getById(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true)
      });
      it('return json with product', async () => {
        await productsController.getById(request, response);
        expect(response.json.calledWith(oneProduct)).to.be.equal(true)
      });
    });

    describe('product is not found', () => {
      const response = {};
      const request = { params: { id: 1 } };
      before(() => {
        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns();
        sinon.stub(productsService, 'getById').resolves(null)
      })

      after(() => productsService.getById.restore());

      it('return status 404', async () => {
        await productsController.getById(request, response);
        expect(response.status.calledWith(404)).to.be.equal(true)
      });
    });
  });

  describe('endpoint POST on /product', () => {
    describe('product was created', () => {
      const response = {};
      const request = { body: newProduct };
      before(() => {
        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns();
        sinon.stub(productsService, 'create').resolves(oneProduct)
      })

      after(() => productsService.create.restore());

      it('return status 201', async () => {
        await productsController.create(request, response);
        expect(response.status.calledWith(201)).to.be.equal(true)
      });
      it('return json with product', async () => {
        await productsController.create(request, response);
        expect(response.json.calledWith(oneProduct)).to.be.equal(true)
      });
    });
  });
});