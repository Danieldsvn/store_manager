const ProductModel = require('../models/productModel');

const getAll = async () => {
  const products = await ProductModel.getAll();

  return products;
};

const getById = async (id) => {
  const product = await ProductModel.getById(id);

  return product;
};

module.exports = {
  getAll,
  getById,
};
