const db = require('../dbConfig');

module.exports = {
  get,
  getById,
  insert,
  update,
  remove,
};

function get() {
  return db('tabs');
}

function getById(id) {
  return db('tabs')
    .where({ id })
    .first();
}

function insert(tab) {
  return db('tabs')
  .insert(tab)
  .returning("id")
}

function update(id, changes) {
  return db('tabs')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('tabs')
    .where('id', id)
    .del();
}