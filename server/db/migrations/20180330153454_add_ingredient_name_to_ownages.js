
exports.up = function(knex, Promise) {
  return knex.schema.table('ownages', t => {
    t.string('ingredient_name');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('ownages', t => {
    t.dropColumn('ingredient_name');
  })
};
