/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable('user', function (t) {
    t.increments();
    t.string('name');
    t.string('email');
    t.string('password');
    t.boolean('deleted').notNullable().defaultTo(0);
    t.timestamp('createdAt').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable('user');
};
