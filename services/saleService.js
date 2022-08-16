const SaleModel = require('../models/saleModel');
const SaleProductModel = require('../models/saleProductModel');

const validation = (productId, quantity) => {
  if (!productId) {
    return { message: '"productId" is required', code: 400, valid: false };
  }
  if (!quantity) {
    return { message: '"quantity" is required', code: 400, valid: false };
  }
  if (quantity.length <= 0) {
    return {
      message: '"quantity" must be greater than or equal to 1',
      code: 422,
      valid: false,
    };
  }
  return { valid: true };
};

const create = async (productId, quantity) => {
  const { valid } = validation(productId, quantity);
  if (!valid) {
    const { code, message } = validation(productId, quantity);
    return { message, code };
  }
  const saleId = await SaleModel.create();
  const sale = SaleProductModel.create(saleId, productId, quantity);
  return sale;
};

module.exports = {
  create,
};