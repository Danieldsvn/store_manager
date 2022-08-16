const SaleService = require('../services/saleService');

const create = async (request, response) => {
  const salesData = request.body;  
  const sales = await Promise
    .all(salesData
      .map((sale) => SaleService.create(sale.productId, sale.quantity)));
  if (sales.message) {
    const { message, code } = sales;
    return response.status(code).json({ message });
  }

  return response.status(201).json(sales);
};

module.exports = {
  create,
};