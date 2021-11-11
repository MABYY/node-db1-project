const db = require('../../data/db-config') // this is where the connection via code is happening

const getAll = () => {
  return db('accounts');
}

const getById = id => {
  return db('accounts').where('id',id).first(); // this return a collection so we pick the first one
  // return db('accounts').where(id == id);
}

const create = async account => {
  const [id] = await db('accounts').insert(account) // insert the account
  return getById(id) // return the account just created
}

const updateById = async (id, account) => {
  const newdata = await db('accounts').where('id', id).update(account)
  return getById(id)
}

const deleteById = id => {
  return db('accounts').where('id', id).del();
}

const getByName = name => {
  return db('accounts')
  .where('name',name)
  .first(); // this return a collection so we pick the first one
  // return db('accounts').where(id == id);
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  getByName,
}
