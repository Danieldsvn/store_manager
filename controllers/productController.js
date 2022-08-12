const ProductService = require('../services/productService');

const getAll = async (request, response) => {
  const products = await ProductService.getAll();

  if (!products) {
    return response.status().json();
  }

  return response.status(200).json(products);
};

const getById = async (request, response) => {
  const { id } = request.params;
  const product = await ProductService.getById(id);

  return response.status(200).json(product);
};

module.exports = {
  getAll,
  getById,
};
