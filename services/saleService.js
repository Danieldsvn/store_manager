const SaleModel = require('../models/saleModel');
const SaleProductModel = require('../models/saleProductModel');
const ProductService = require('./productService');

const validation = async (productId, quantity) => {
  if (productId === undefined) {
    return { message: '"productId" is required', code: 400, valid: false };
  }
  const productExist = await ProductService.getById(productId);
  if (productExist === false) {
    return { message: 'Product not found', code: 404, valid: false };
    console.log('getById em validation');
  }
  if (quantity === undefined) {
    return { message: '"quantity" is required', code: 400, valid: false };
  }
  if (quantity <= 0) {
    return {
      message: '"quantity" must be greater than or equal to 1',
      code: 422,
      valid: false,
    };
  }
  return { valid: true };
};

const create = async (productId, quantity) => {
  const { valid } = await validation(productId, quantity);
  if (!valid) {
    const { code, message } = await validation(productId, quantity);
    return { message, code };
  }
  
  const saleId = await SaleModel.create();  
  const sale = SaleProductModel.create(saleId, productId, quantity);
  return sale;
};

module.exports = {
  create,
};