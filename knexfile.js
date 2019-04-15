module.exports = {

    development: {
      client: 'sqlite3',
      connection: {
        filename: './user.sqlite3'
      },
      useNullAsDefault: true,
    },
  };