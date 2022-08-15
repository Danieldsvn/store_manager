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

const create = async (name) => {
  const product = await ProductModel.create(name);
  if (!product) return false;

  return product;
};

module.exports = {
  getAll,
  getById,
  create,
};
