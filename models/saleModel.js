const connection = require('./connection');

const create = async () => {
  const result = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );  
  return result[0].insertId;
};

module.exports = {
  create,
};
