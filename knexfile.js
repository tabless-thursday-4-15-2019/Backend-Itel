const localPg = {
  host: 'localhost',
  database: 'stash',
  user: 'tabber',
  password: 'pass'
}
const productionDbConnection = process.env.DATABASE_URL || localPg;

module.exports = {

    development: {
      client: 'sqlite3',
      useNullAsDefault: true,
      connection: {
        filename: './stash.db3'
      },
      pool: {
        afterCreate: (conn, done) => {
          conn.run('PRAGMA foreign_keys = ON', done);
        },
      },
      migrations: {
        directory: './database/migrations'
      },
      seeds: {
        directory: './database/seeds'
      }
    },
    production: {
      client: 'pg',
      connection: productionDbConnection,
      migrations: {
        directory: './database/migrations',
      },
      seeds: {
        directory: './database/seeds',
      },
  }
};