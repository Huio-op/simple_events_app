import EventsApi from './paths/EventsApi';
import UserApi from './paths/UserApi';

class Api {
  static User = UserApi;
  static Events = EventsApi;
}

export default Api;
