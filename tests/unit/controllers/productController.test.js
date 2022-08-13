const sinon = require('sinon');
const { expect } = require('chai');

const ProductService = require('../../../services/productService');
const ProductController = require('../../../controllers/productController');
const mockProducts = require('../models/mockProductsTable');

const allProducts = mockProducts.mockAll[0];
const oneProduct = mockProducts.mockOne[0];