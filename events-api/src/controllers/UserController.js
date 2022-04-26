const knex = require('../database/knex');

class UserController {
  constructor(transaction) {
    if (transaction) {
      this.db = transaction;
    } else {
      this.db = knex;
    }
  }

  async findOne(values) {
    const user = await this.db('user')
      .where(values)
      .where({ deleted: false })
      .first();
    if (user) {
      delete user.password;
    }
    return user;
  }

  async create(values) {
    const user = await this.db('user').where({ email: values.email });
    if (user.length > 0) {
      return null;
    }

    const [newUser] = await this.db('user')
      .insert({ ...values })
      .returning('*');

    delete newUser.password;
    return newUser;
  }

  async edit({ values }) {
    const newUser = await this.db('user')
      .where({ email: values.email })
      .update({
        name: values.name || null,
        phone: values.phone || null,
        country: values.country || null,
      });

    return newUser;
  }
}

module.exports = UserController;
