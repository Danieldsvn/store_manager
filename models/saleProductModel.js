const connection = require('./connection');

const create = async (saleId, productId, quantity) => {  
  const query = `
  INSERT INTO
   StoreManager.sales_products (sale_id, product_id, quantity)
   VALUES (?, ?, ?)`;
  await connection.execute(query, [saleId, productId, quantity]);  
};

const sequelizeGetAll = (saleId, date, productId, quantity) => {  
  const result = {
    saleId,
    date,
    productId,
    quantity,
  };
  
  return result;
};

const sequelizeGetbyId = (date, productId, quantity) => {
  const result = {
    date,
    productId,
    quantity,
  };
    
  return result;
};

const getAll = async () => {
  const query = `
  SELECT
    sale_id,
    date,
    product_id,
    quantity
  FROM StoreManager.sales_products AS sales_products
  INNER JOIN StoreManager.sales AS sales
  ON sales_products.sale_id = sales.id
  ORDER BY sale_id, product_id;
  `;
  const result = await connection.execute(query);  
  const sales = result[0];    

  const resultSequelized = sales.map((sale) => (    
    sequelizeGetAll(sale.sale_id, sale.date, sale.product_id, sale.quantity)
  ));   
  
  return resultSequelized;
};

const getById = async (id) => {
  const query = `
  SELECT    
    date,
    product_id,
    quantity
  FROM StoreManager.sales_products AS sales_products
  INNER JOIN StoreManager.sales AS sales
  ON sales_products.sale_id = sales.id
  WHERE sales_products.sale_id = ?
  ORDER BY sale_id, product_id;
  `;
  const result = await connection.execute(query, [id]);  
  const sales = result[0];

  //  const resultSequelized = sales.map((sale) => (
  //    sequelizeGetAll(sale.sale_id, sale.date, sale.product_id, sale.quantity)
  //  ));   
  if (sales.length === 0) return false;    
  const resultSequelized = sales.map((sale) => (
    sequelizeGetbyId(sale.date, sale.product_id, sale.quantity)
  ));  
  return resultSequelized;
};

module.exports = {
  create,
  getAll,
  getById,
};