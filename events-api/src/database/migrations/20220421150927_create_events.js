exports.up = async function (knex) {
  await knex.schema.createTable('events', function (t) {
    t.increments();
    t.string('name', 50).notNullable();
    t.string('description', 200);
    t.integer('num_atendees');
    t.timestamp('date').notNullable();
    t.string('country', 45);
    t.boolean('deleted').notNullable().defaultTo(0);
    t.timestamp('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTable('events');
};
