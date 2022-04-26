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
    return data.events;
  };

  static toggleSubscribe = async (eventId, subscribe) => {
    const { data } = await Axios.put(
      '/event/subscribe',
      {
        eventId: eventId,
        subscribe: subscribe,
      },
      {
        headers: { authorization: localStorage.getItem('ACCESS_TOKEN') },
      },
    );
    return data;
  };

  static findEvent = async (eventId) => {
    const { data } = await Axios.get('/event/detailed', {
      params: { eventId },
      headers: { authorization: localStorage.getItem('ACCESS_TOKEN') },
    });
    return data.event;
  };

  static findCertificate = async (eventId) => {
    const { data } = await Axios.get('/event/certificate', {
      params: { eventId: eventId },
      headers: { authorization: localStorage.getItem('ACCESS_TOKEN') },
    });
    return data.certToken;
  };

  static sendCertificate = async (eventId) => {
    await Axios.post(
      '/event/certificate',
      {},
      {
        params: { eventId: eventId },
        headers: { authorization: localStorage.getItem('ACCESS_TOKEN') },
      },
    );
  };
}

export default EventsApi;
