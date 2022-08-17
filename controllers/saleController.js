const SaleService = require('../services/saleService');

const create = async (request, response) => {
  const salesData = request.body;  
  const sales = await Promise
    .all(salesData
      .map((sale) => SaleService.create(sale.productId, sale.quantity)));
  const errorMessage = sales.find((sale) => sale.message);
  if (errorMessage) {
    const { message, code } = errorMessage;
    return response.status(code).json({ message });
  }

  return response.status(201).json(sales);
};

module.exports = {
  create,
};