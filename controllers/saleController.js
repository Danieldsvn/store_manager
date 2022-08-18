const SaleService = require('../services/saleService');

const create = async (request, response) => {
  const salesData = request.body;  
  const sales = await SaleService.create(salesData);  
  if (sales.message) {
    const { code, message } = sales;
    return response.status(code).json({ message });
  }

  return response.status(201).json(sales);
};

const getAll = async (request, response) => {
  const sales = await SaleService.getAll();

  if (sales.message) {
    const { code, message } = sales;
    return response.status(code).json({ message });
  }

  return response.status(200).json(sales);
};

const getById = async (request, response) => {
  const { id } = request.params;
  const sales = await SaleService.getById(id);

  if (sales.message) {
    const { code, message } = sales;
    return response.status(code).json({ message });
  }

  return response.status(200).json(sales);
}
module.exports = {
  create,
  getAll,
  getById,
};