
exports.up = function(knex, Promise) {
  return knex.schema.createTable('to_buys', t => {
    t.increments('id').primary();
    t.string('ingredient_name');
    t.integer('user_id').references('users.id');
    t.timestamps(false,true);
  })
};


exports.down = function(knex, Promise) {
  return knex.schema.dropTable('to_buys')
};
