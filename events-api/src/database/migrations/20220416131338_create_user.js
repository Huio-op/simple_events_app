/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable('user', function (t) {
    t.increments();
    t.string('name', 120);
    t.string('email', 120).notNullable().unique();
    t.string('password', 120).notNullable();
    t.string('country', 45);
    t.string('phone', 25);
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
