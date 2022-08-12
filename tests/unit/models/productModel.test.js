const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const ProductModel = require('../../../models/productModel');
const mockProducts = require('./mockProductsTable'); 

describe('Obtem lista de produtos do banco de dados', () => {
  
  describe('Quando retorna produtos com sucesso', () => {
    describe('em toda a lista', () => {
      before(async () => {
        sinon.stub(connection, 'execute').resolves(mockProducts.mockAll);
      });
      after(async () => {
        connection.execute.restore();
      });
      it('Retorna um array', async () => {
        const products = await ProductModel.getAll();
        expect(products).to.be.an('array');
      });
    });
    describe('em um id específico', () => {
      before(async () => {
        sinon.stub(connection, 'execute').resolves(mockProducts.mockOne);
      });
      after(async () => {
        connection.execute.restore();
      });
      it('Retorna um objeto', async () => {
        const [[{ id }]] = mockProducts.mockOne;        
        const products = await ProductModel.getById(id);
        expect(products).to.be.an('object');
      });
    }); 
  });
});
