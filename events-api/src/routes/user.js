const routes = require('express').Router();
const knex = require('../database/knex');
const UserController = require('../controllers/UserController');

// Encontrar um usuário com o email solicitado
routes.get('/', async (req, res) => {
  const { email } = req.body;
  console.log('Caiu no get');
  return res.sendOk(200);
});

// Criar um usuário
routes.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  let transaction;

  try {
    transaction = await knex.transaction();
    const controller = new UserController(transaction);

    const user = await controller.create({ name, email, password });

    return res.sendOk(201, { user });
  } catch (e) {
    await transaction.rollback();
    res.sendError(e);
  }
});

module.exports = routes;
