
exports.up = function(knex, Promise) {
  return knex.schema.table('ingredients', t => {
    t.boolean('non_key').defaultTo(false);
    t.dropColumn('recipe_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('ingredients', t => {
    t.dropColumn('non_key');
    t.integer('recipe_id').references('recipes.id');
  })
};
