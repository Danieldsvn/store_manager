const ProductModel = require('../models/productModel');

const getAll = async () => {
  const products = await ProductModel.getAll();
  
  return products;
};

const getById = async (id) => {
  const product = await ProductModel.getById(id);
  if (!product) return false;
  
  return product;
};

const nameValid = (name) => {
  if (!name) {
    return { message: '"name" is required', code: 400, valid: false };
  }
  if (name.length < 5) {
    return {
      message: '"name" length must be at least 5 characters long',
      code: 422,
      valid: false,
    };
  }
  return { valid: true };
};

const create = async (name) => {
  const { valid } = nameValid(name);
  if (!valid) { 
    const { code, message } = nameValid(name);
    return { message, code };
  } 
  const product = await ProductModel.create(name);  
  return product;
};

module.exports = {
  getAll,
  getById,
  create,
};
