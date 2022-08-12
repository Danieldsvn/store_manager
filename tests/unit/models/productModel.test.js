const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const ProductModel = require('../../../models/productModel');
const mockProducts = require('./mockProductsTable'); 

describe('Obtem lista de produtos do banco de dados', () => {
  before(async () => {    
    sinon.stub(connection, 'execute').resolves(mockProducts);
  })
  after(async () => {
    connection.execute.restore();
  });
  describe('Quando retorna produtos com sucesso', () => {
    describe('em toda a lista', () => {
      it('Retorna um array', async () => {
        const products = await ProductModel.getAll();
        expect(products).to.be.an('array');
      });
    });
    describe('em um id específico', () => {
      it('Retorna um array', async () => {
        const products = await ProductModel.getById();
        expect(products).to.be.an('array');
      });
    }); 
  });
});
