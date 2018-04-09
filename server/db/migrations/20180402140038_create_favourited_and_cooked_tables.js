
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('favourites', t => {
      t.increments('id').primary();
      t.integer('user_id').references('users.id');
      t.integer('recipe_id');
      t.string('recipe_title');
      t.string('image');
      t.timestamps(false,true);
    }),
    knex.schema.createTable('completes', t => {
      t.increments('id').primary();
      t.integer('user_id').references('users.id');
      t.integer('recipe_id');
      t.string('recipe_title');
      t.string('image');
      t.string('notes');
      t.timestamps(false,true);
    }),
    knex.schema.dropTable('directions'),
    knex.schema.dropTable('comments'),
    knex.schema.dropTable('usages')
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('favourites'),
    knex.schema.dropTable('completes'),
    knex.schema.createTable('directions', t => {
      t.increments('id').primary();
    }),
    knex.schema.createTable('comments', t => {
      t.increments('id').primary();
    }),
    knex.schema.createTable('usages', t => {
      t.increments('id').primary();
    })
  ]);
};
