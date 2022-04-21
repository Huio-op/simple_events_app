exports.up = async function (knex) {
  await knex.schema.createTable('user_event', function (t) {
    t.increments();
    t.integer('user_id').references('id').inTable('user').notNullable();
    t.integer('event_id').references('id').inTable('events').notNullable();
    t.boolean('attended').notNullable().defaultTo(false);
    t.timestamp('reg_date').defaultTo(knex.fn.now());
    t.timestamps();
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTable('user_event');
};
