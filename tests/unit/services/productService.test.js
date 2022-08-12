const sinon = require('sinon');
const { expect } = require('chai');

const ProductModel = require('../../../models/productModel');
const ProductService = require('../../../services/productService');
const mockProducts = require('./mockProductsTable');

const allProducts = mockProducts.mockAll[0][0];
const oneProduct = mockProducts.mockOne[0][0];

describe('Camada service recebe dados com possíveis validações', () => {
  
  describe('da listagem de todos os produtos', () => {
    before(async () => {
      sinon.stub(ProductModel, 'getAll').resolves(allProducts);
    });
    after(async () => {
      ProductModel.getAll.restore();
    });
    describe('quando a lista de produtos é carregada com sucesso', () => {
      it('Seu retorno é um objeto', () => {
        const products = ProductService.getAll();
        expect(products).to.be.an('object');
      })
    }) 
  });
  describe('do produto por id', () => {

  });
});
