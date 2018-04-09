
exports.up = function(knex, Promise) {
  return knex.schema.table('usages', t => {
    t.integer('quantity');
    t.string('unit');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('usages', t => {
    t.dropColumn('quantity');
    t.dropColumn('unit');
  })
};
