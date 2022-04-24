const knex = require('../database/knex');

class EventController {
  constructor(transaction) {
    if (transaction) {
      this.db = transaction;
    } else {
      this.db = knex;
    }
  }

  async fetchEvents() {
    const events = await this.db('events').select();
    console.log('uauauaua', events);
    return events;
  }

  async findSubscribedEvents({ email }) {
    console.log('email', email);
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

  async subscribe({ eventId, userId }) {
    const userEvent = this.db('user_event')
      .insert({
        user_id: userId,
        event_id: eventId,
        attended: false,
        reg_date: new Date(),
      })
      .then(() => {
        this.db('events')
          .where({ id: eventId })
          .update({ num_atendees: knex.raw('num_atendees + 1') });
      });

    return userEvent;
  }
}

module.exports = EventController;
