const connection = require('./connection');

const getAll = async () => {
  const result = await connection.execute(
    'SELECT id, name FROM StoreManager.products ORDER BY id',
  );

  return result[0];
};

const getById = async (id) => {
  const [result] = await connection.execute(
    'SELECT id, name FROM StoreManager.products WHERE id = ?', [id],
  );

  return result[0];
};

const create = async (name) => {
  const result = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)', [name],
  );
  
  return { id: result[0].insertId, name };
};

const update = async (id, name) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?', [name, id],
  );
  
  return { code: 200 };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};