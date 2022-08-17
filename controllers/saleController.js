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

module.exports = {
  create,
};