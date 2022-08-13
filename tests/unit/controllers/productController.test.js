const sinon = require('sinon');
const { expect } = require('chai');

const ProductService = require('../../../services/productService');
const ProductController = require('../../../controllers/productController');
const mockProducts = require('../models/mockProductsTable');

const allProducts = mockProducts.mockAll[0];
const oneProduct = mockProducts.mockOne[0];

describe('Teste Product Controller', () => {
  describe('Ao receber os produtos', () => {
    describe('quando for a lista completa', () => {
      it('se falhar', () => {
        
      });
    });    
  });
});