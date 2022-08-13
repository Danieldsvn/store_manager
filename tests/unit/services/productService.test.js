const sinon = require('sinon');
const { expect } = require('chai');

const ProductModel = require('../../../models/productModel');
const ProductService = require('../../../services/productService');
const mockProducts = require('../models/mockProductsTable');

const allProducts = mockProducts.mockAll[0];
const oneProduct = mockProducts.mockOne[0];

describe('Teste Product Service -Camada service recebe dados com possíveis validações', () => {
  
  describe('da lista de todos os produtos', () => {
    before(async () => {
      sinon.stub(ProductModel, 'getAll').resolves(allProducts);
    });
    after(async () => {
      ProductModel.getAll.restore();
    });
    describe('quando a lista de produtos é carregada com sucesso', () => {
      it('Seu retorno é um array', async () => {
        const products = await ProductService.getAll();
        console.log(products);
        expect(products).to.be.an('array');
      });
    }); 
  });
  describe('do produto por id', () => {
    before(async () => {
      sinon.stub(ProductModel, 'getById').resolves(oneProduct);
    });
    after(async () => {
      ProductModel.getById.restore();
    });
    describe('quando o produto é carregado com sucesso', () => {
      it('Seu retorno é um array', async () => {
        const product = await ProductService.getById();
        console.log(product);
        expect(product).to.be.an('array');
      });
    }); 
  });
});
