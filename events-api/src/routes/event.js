const routes = require('express').Router();
const knex = require('../database/knex');
const EventController = require('../controllers/EventController');
const ErrorHandler = require('../utils/ErrorHandler');
const checkUser = require('../middlewares/checkUser');
const readProps = require('../utils/readProps');

// Busca todos os eventos
routes.get('/', checkUser, async (req, res) => {
  try {
    const controller = new EventController();
    const events = await controller.fetchEvents();

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

    return res.sendOk(200, { events });
  } catch (e) {
    return res.sendError(e);
  }
});

module.exports = routes;
