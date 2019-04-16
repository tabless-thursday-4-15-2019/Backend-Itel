exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', tbl => {
      //Primary key
      tbl
        .increments()
        .primary()
        .notNullable();
      tbl
        .string('username', 255)
        .notNullable()
        .unique();
      tbl
        .string('password', 255).notNullable();
      tbl
        .string('name', 128);
      tbl
        .string('email', 255);
      tbl
        .string('phone', 128)
        .notNullable();
    });
  };
  
  exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('users');
  };