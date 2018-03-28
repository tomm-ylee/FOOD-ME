
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', t => {
      t.increments('id').primary();
      t.string('email');
      t.string('username');
      t.boolean('admin').defaultTo(false);
      t.boolean('guest').defaultTo(false);
      t.timestamps(false,true);
    }),
    knex.schema.createTable('recipes', t => {
      t.increments('id').primary();
      t.string('title');
      t.text('description');
      t.integer('duration');
      t.boolean('vegetarian').defaultTo(false);
      t.integer('user_id').references('users.id');
      t.timestamps(false,true);
    }),
    knex.schema.createTable('directions', t => {
      t.increments('id').primary();
      t.integer('step_number');
      t.text('body');
      t.integer('recipe_id').references('recipes.id');
      t.timestamps(false,true);
    }),
    knex.schema.createTable('ingredients', t => {
      t.increments('id').primary();
      t.string('name');
      t.boolean('meat').defaultTo(false);
      t.integer('recipe_id').references('recipes.id');
      t.timestamps(false,true);
    }),
    knex.schema.createTable('comments', t => {
      t.increments('id').primary();
      t.text('body');
      t.integer('rating');
      t.integer('recipe_id').references('recipes.id');
      t.integer('user_id').references('users.id');
      t.timestamps(false,true);
    }),
    knex.schema.createTable('usages', t => {
      t.increments('id').primary();
      t.boolean('key_ingredient').defaultTo(false);
      t.integer('ingredient_id').references('ingredients.id');
      t.integer('recipe_id').references('recipes.id');
      t.timestamps(false,true);
    }),
    knex.schema.createTable('ownages', t => {
      t.increments('id').primary();
      t.boolean('key_ingredient').defaultTo(false);
      t.integer('ingredient_id').references('ingredients.id');
      t.integer('user_id').references('users.id');
      t.timestamps(false,true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
      knex.schema.dropTable('users'),
      knex.schema.dropTable('recipes'),
      knex.schema.dropTable('directions'),
      knex.schema.dropTable('ingredients'),
      knex.schema.dropTable('comments'),
      knex.schema.dropTable('usages'),
      knex.schema.dropTable('ownages')
    ]);
};
