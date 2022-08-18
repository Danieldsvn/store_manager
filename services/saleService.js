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

const create = async (salesData) => {  
  const validationsMap = await Promise.all(salesData.map(async (sale) => {
    const validationResult = await validation(sale.productId, sale.quantity);
    return validationResult;
  }));   
  const item = validationsMap.find((validationOne) => validationOne.valid === false);  
  if (item !== undefined) {
    const { code, message } = item;
    return { code, message };
  }  
  const saleId = await SaleModel.create();  
  await Promise
    .all(salesData
      .map((sale) => SaleProductModel.create(saleId, sale.productId, sale.quantity)));  
  const salesSucess = {
    id: saleId,
    itemsSold: salesData,
  };
  return salesSucess;
};

const getAll = async () => {
  const sales = await SaleProductModel.getAll();  
 
  return sales;
};

const getById = async (id) => {
  const sale = await SaleProductModel.getById(id);

  if (!sale) {
    return { code: 404, message: 'Sale not found' };
  }

  console.log(`sale: ${JSON.stringify(sale)}`);

  return sale;
};



module.exports = {
  create,
  getAll,
  getById
};