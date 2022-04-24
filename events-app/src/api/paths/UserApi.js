import { Axios } from '../Utils';

class UserApi {
  static findUser = async (email) => {
    const { data } = await Axios.get('/user', { params: { email: email } });
    return data;
  };

  static userLogin = async (email, password) => {
    const { data } = await Axios.post('/user/login', { email, password });
    console.log("why tho:", data.token);
    return data;
  }

  static createUser = async (email, password) => {
    const { data } = await Axios.post('/user', { email, password });
    return data;
  };
}

export default UserApi;
