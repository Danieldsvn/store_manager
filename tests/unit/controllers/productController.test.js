const sinon = require('sinon');
const { expect } = require('chai');

const ProductService = require('../../../services/productService');
const ProductController = require('../../../controllers/productController');
const mockProducts = require('../models/mockProductsTable');

const allProducts = mockProducts.mockAll[0];
const oneProduct = mockProducts.mockOne[0];

describe('Teste Product Controller', () => {
  describe('Ao receber os produtos', () => {
    describe('quando a lista completa não for retornada', () => {
      before( async () => { 
        sinon.stub(ProductService, 'getAll').resolves(undefined);        
      });
      after(async () => {
        ProductService.getAll.restore();
      });
      it('O status da response seja 400', async () => {
        const request = {};
        const response = {};

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        await ProductController.getAll(request, response);        
        expect(response.status.calledWith(400)).to.be.true;
      });
    });    
    describe('quando a lista completa for retornada', () => {
      before(async () => {
        sinon.stub(ProductService, 'getAll').resolves(allProducts);              
      });
      after(async () => {
        ProductService.getAll.restore();
      });
      it('O status da response seja 200', async () => {
        const request = {};
        const response = {};  

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        await ProductController.getAll(request, response);
        expect(response.status.calledWith(200)).to.be.true;
      })
    });
  });
});