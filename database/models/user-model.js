const db = require('../dbConfig');

module.exports = {
    addUser,
    getUser,
    findBy,
    getUsers
}

async function addUser(user) {
    const [id] = await db('users')
    .insert(user)
    return getUser(id);
}


function getUser(id) {
    return db('users')
        .where({ id })
        .first();
}

function findBy(filter) {
    return db('users').where(filter).first();
  }

  function getUsers(id) {
    return db('users');
}