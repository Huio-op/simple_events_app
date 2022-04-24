const routes = require('express').Router();
const knex = require('../database/knex');
const UserController = require('../controllers/UserController');
const ErrorHandler = require('../utils/ErrorHandler');
const Mailer = require('../utils/Mailer');
const readProps = require('../utils/readProps');
const jwt = require('../utils/jwt');
const checkUser = require('../middlewares/checkUser');

// Encontrar um usuário com o email solicitado
routes.get('/', checkUser, async (req, res) => {
  const { email } = req.tokenPayload;
  try {
    const controller = new UserController();
    const user = await controller.findOne({ email });

    if (!user) {
      ErrorHandler.throwError(404, readProps('user_not_created'));
    }

    return res.sendOk(200, { user });
  } catch (e) {
    return res.sendError(e);
  }
});

// Realizar login
routes.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const controller = new UserController();
    const user = await controller.findOne({
      email,
      password,
    });

    if (!user) {
      ErrorHandler.throwError(404, readProps('user_login_error'));
    }
    token = jwt.generate({ email });
    return res.sendOk(200, { token });
  } catch (e) {
    console.log('5 - ', e);
    return res.sendError(e);
  }
});

// Criar um usuário com apenas email e senha
routes.post('/', async (req, res) => {
  const { email, password } = req.body;

  let transaction;

  try {
    const controller = new UserController();
    const createdUser = await controller.findOne({ email });
    console.log('crearearea', createdUser);
    if (createdUser) {
      ErrorHandler.throwError(409, readProps('user_already_created'));
    }
  } catch (e) {
    res.sendError(e);
    return false;
  }

  try {
    transaction = await knex.transaction();
    const controller = new UserController(transaction);

    const user = await controller.create({
      email,
      password,
    });

    const token = jwt.generate({ email: user.email });
    await transaction.commit();

    const mailer = new Mailer();
    mailer.sendUserCreated(email);

    return res.sendOk(201, { token });
  } catch (e) {
    await transaction.rollback();
    res.sendError(e);
  }
});

module.exports = routes;
