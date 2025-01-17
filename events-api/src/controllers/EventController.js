const knex = require('../database/knex');
const jwt = require('../utils/jwt');
require('dotenv').config();

class EventController {
  constructor(transaction) {
    if (transaction) {
      this.db = transaction;
    } else {
      this.db = knex;
    }
  }

  async findOne(values, userId) {
    const event = await this.db('events').where(values).first();
    if (userId) {
      const userEvent = await this.db('user_event')
        .select('user_event.id')
        .where({ user_id: userId, event_id: event.id })
        .first();
      if (userEvent) {
        event.subscribed = true;
      }
    }

    return event;
  }

  async fetchEvents() {
    const events = await this.db('events').select();
    return events;
  }

  async findSubscribedEvents({ email }) {
    return await this.db('user_event')
      .select(
        'events.id',
        'events.name',
        'events.description',
        'events.num_atendees',
        'events.date',
        'events.country',
      )
      .innerJoin('user', 'user_event.user_id', 'user.id')
      .innerJoin('events', 'user_event.event_id', 'events.id')
      .where({ 'user.email': email });
  }

  async subscribe({ eventId, userId }, subscribe) {
    let userEvent;
    let event;

    if (subscribe) {
      userEvent = await this.db('user_event').insert({
        user_id: userId,
        event_id: eventId,
        attended: false,
        reg_date: new Date(),
      });
      event = await this.findOne({ id: eventId });

      await this.db('events')
        .where({ id: eventId })
        .update({ num_atendees: event.num_atendees + 1 });
    } else {
      userEvent = await this.db('user_event')
        .where({ user_id: userId, event_id: eventId })
        .delete();

      event = await this.findOne({ id: eventId });
      await this.db('events')
        .where({ id: eventId })
        .update({ num_atendees: event.num_atendees - 1 });
    }

    return event;
  }

  async generateCertHash({ eventId, userId, userName, userEmail }) {
    const userEvent = await this.db('user_event')
      .where({ user_id: userId, event_id: eventId })
      .first();

    const event = await this.findOne({ id: eventId });

    return {
      certToken: jwt.generate({
        userId: userEvent.user_id,
        id: userEvent.id,
        userEmail,
        eventId: userEvent.event_id,
        eventName: event.name,
      }),
      eventName: event.name,
    };
  }

  async verifyToken(token) {
    const userEvent = await this.db('user_event')
      .where({
        user_id: token.userId,
        event_id: token.eventId,
        id: token.id,
        attended: true,
      })
      .first();

    return !!userEvent;
  }
}

module.exports = EventController;
