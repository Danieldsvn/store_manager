const connection = require('./connection');

const create = async (saleId, productId, quantity) => {  
  const query = `
  INSERT INTO
   StoreManager.sales_products (sale_id, product_id, quantity)
   VALUES (?, ?, ?)`;
  await connection.execute(query, [saleId, productId, quantity]);  
};

const sequelizeGetAll = (sale_id, date, product_id, quantity) => {  
  const result = {
    saleId: sale_id,
    date,
    productId: product_id,
    quantity,
  };

  // console.log(`result: ${JSON.stringify(result)}`);

  return result;
};

const sequelizeGetbyId = (date, product_id, quantity) => {  
  const result = {    
    date,
    productId: product_id,
    quantity,
  };
  
  // console.log(`result: ${JSON.stringify(result)}`);

  return result;
}

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
  `
  const result  = await connection.execute(query);
  // console.log(`result[0]: ${JSON.stringify(result[0])}`);
  const sales = result[0];    

  const resultSequelized = sales.map((sale) => (    
    sequelizeGetAll(sale.sale_id, sale.date, sale.product_id, sale.quantity)
  ));   
  // console.log(`result[0]: ${JSON.stringify(result[0])}`);
 // console.log(`resultSequelized: ${JSON.stringify(resultSequelized)}`);
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
  `
  const result = await connection.execute(query, [id]);
  if (result[0].length === 0) return false;
  console.log(`result[0]: ${JSON.stringify(result[0])}`);
  const { date, product_id, quantity } = result[0];
  const resultSequelized = sequelizeGetbyId(date, product_id, quantity);
  // console.log(`result[0]: ${JSON.stringify(result[0])}`);
  // console.log(`resultSequelized: ${JSON.stringify(resultSequelized)}`);
  return resultSequelized;
};

module.exports = {
  create,
  getAll,
  getById,
};