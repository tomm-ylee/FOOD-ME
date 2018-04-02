
exports.up = function(knex, Promise) {
  return knex.schema.createTable('intolerances', t => {
    t.increments('id').primary();
    t.string('title');
    t.integer('user_id').references('users.id');
    t.timestamps(false,true);
  })
};


exports.down = function(knex, Promise) {
  return knex.schema.dropTable('intolerances')
};
