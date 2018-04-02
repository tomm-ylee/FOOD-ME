
exports.up = function(knex, Promise) {
  return knex.schema.table('users', t => {
    t.string('diet');
    t.dropColumn('guest');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', t => {
    t.dropColumn('diet');
    t.boolean('guest').defaultTo(false);
  })
};
