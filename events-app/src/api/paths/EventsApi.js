import { Axios } from '../Utils';

class EventsApi {
  static fetchEvents = async () => {
    const { data } = await Axios.get('/event', {
      headers: { authorization: localStorage.getItem('ACCESS_TOKEN') },
    });
    return data.events;
  };
}

export default EventsApi;
