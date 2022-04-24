import { Axios } from '../Utils';

class EventsApi {
  static fetchEvents = async () => {
    const { data } = await Axios.get('/event', {
      headers: { authorization: localStorage.getItem('ACCESS_TOKEN') },
    });
    return data.events;
  };

  static findSubscribed = async () => {
    const { data } = await Axios.get('/event/subscribed', {
      headers: { authorization: localStorage.getItem('ACCESS_TOKEN') },
    });
    console.log('veio oqoqoqoq', data);
    return data.events;
  };

  static subscribe = async (eventId) => {
    const { data } = await Axios.put(
      '/event/subscribe',
      {
        eventId: eventId,
      },
      {
        headers: { authorization: localStorage.getItem('ACCESS_TOKEN') },
      },
    );
    return data;
  };
}

export default EventsApi;
