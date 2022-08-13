const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT id, name FROM StoreManager.products ORDER BY id',
  );

  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute(
    'SELECT id, name FROM StoreManager.products WHERE id = ?', [id],
  );

  return result;
};

module.exports = {
  getAll,
  getById,
};