const ProductService = require('../services/productService');

const getAll = async (request, response) => {
  const products = await ProductService.getAll();

  return response.status(200).json()
}

const getById = async (request, response) => {
  const { id } = request.params;
  const product = await ProductService.getAll(id);

  return response.status(200).json()
}