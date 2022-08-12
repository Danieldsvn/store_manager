const ProductService = require('../services/productService');

const getAll = async (request, response) => {
  const products = await ProductService.getAll();

  if (!products) {
    return response.status(400).json();
  }

  return response.status(200).json(products);
};

const getById = async (request, response) => {
  const { id } = request.params;
  const product = await ProductService.getById(id);
  if (!product) {
    return response.status(404).json({ message: 'Product not found' });
  }

  return response.status(200).json(product);
};

module.exports = {
  getAll,
  getById,
};
