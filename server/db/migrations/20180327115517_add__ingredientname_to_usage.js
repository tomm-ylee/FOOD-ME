
exports.up = function(knex, Promise) {
  return knex.schema.table('usages', t => {
    t.string('ingredient_name');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('usages', t => {
    t.dropColumn('ingredient_name');
  })
};
