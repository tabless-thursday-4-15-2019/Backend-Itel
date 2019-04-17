const db = require('../dbConfig');

module.exports = {
    addUser,
    getUser,
    findBy
}

// async function addUser(user) {
//     const {id} = await db('users')
//     .insert(user).returning('id');
        
//     const users = await getUser(id)
//     return users;

async function addUser(user) {
    const [id] = await db('users')
    .insert(user)
    return getUser(id);
}

    // .then(ids => {
    //     return getUser(ids[0]);
    // })
// }

function getUser(id) {
    return db('users')
        .where({ id })
        .first();
}

function findBy(filter) {
    return db('users').where(filter);
  }