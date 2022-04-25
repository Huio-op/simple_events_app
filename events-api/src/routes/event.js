const routes = require('express').Router();
const knex = require('../database/knex');
const EventController = require('../controllers/EventController');
const UserController = require('../controllers/UserController');
const ErrorHandler = require('../utils/ErrorHandler');
const checkUser = require('../middlewares/checkUser');
const readProps = require('../utils/readProps');

// Busca todos os eventos
routes.get('/', checkUser, async (req, res) => {
  const { email } = req.tokenPayload;

  try {
    const controller = new EventController();
    const events = await controller.fetchEvents();

    const subscribedevents = await controller.findSubscribedEvents({ email });

    events.forEach((event) => {
      const found = subscribedevents.find((sub) => sub.id === event.id);
      event.subscribed = !!found;
    });

    return res.sendOk(200, { events });
  } catch (e) {
    console.error(e);
    return res.sendError(e);
  }
});

// Busca os eventos que um usuário está inscrito
routes.get('/subscribed', checkUser, async (req, res) => {
  const { email } = req.tokenPayload;

  try {
    const controller = new EventController();
    const events = await controller.findSubscribedEvents({ email });

    events.map((event) => {
      return { ...event, subscribed: true };
    });

    return res.sendOk(200, { events });
  } catch (e) {
    return res.sendError(e);
  }
});

routes.put('/subscribe', checkUser, async (req, res) => {
  const { email } = req.tokenPayload;
  const { eventId, subscribe } = req.body;

  let transaction;
  try {
    transaction = await knex.transaction();

    const userController = new UserController();
    const user = await userController.findOne({ email });
    const controller = new EventController(transaction);

    await controller.subscribe({ eventId, userId: user.id }, subscribe);

    await transaction.commit();
    return res.sendOk(200);
  } catch (e) {
    console.error(e);
    await transaction.rollback();
    return res.sendError(e);
  }
});

module.exports = routes;
