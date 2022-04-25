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
    console.log('valu', values, userId);
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

    if (subscribe) {
      userEvent = await this.db('user_event').insert({
        user_id: userId,
        event_id: eventId,
        attended: false,
        reg_date: new Date(),
      });
      const event = await this.findOne({ id: eventId });

      await this.db('events')
        .where({ id: eventId })
        .update({ num_atendees: event.num_atendees + 1 });
    } else {
      userEvent = await this.db('user_event')
        .where({ user_id: userId, event_id: eventId })
        .delete();

      const event = await this.findOne({ id: eventId });
      await this.db('events')
        .where({ id: eventId })
        .update({ num_atendees: event.num_atendees - 1 });
    }

    return userEvent;
  }

  async generateCertHash({ eventId, userId, userName, userEmail }) {
    const userEvent = this.db('user_event')
      .where({ user_id: userId, event_id: eventId })
      .first();

    const event = this.findOne({ id: eventId });

    return jwt.generate({
      userId: userEvent.user_id,
      eventId: userEvent.event_id,
      id: userEvent.id,
      eventName: event.name,
      userName,
      userEmail,
    });
  }
}

module.exports = EventController;
