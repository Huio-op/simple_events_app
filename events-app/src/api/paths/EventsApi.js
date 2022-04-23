import { Axios } from '../Utils';

class EventsApi {
  static fetchEvents = async (email) => {
    const { data } = await Axios.get('/events');
    return data;
  };
}

export default EventsApi;
