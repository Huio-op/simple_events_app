import { Axios } from '../Utils';

class UserApi {

  static findUser = async () => {
    const { data } = await Axios.get('/user', {
      headers: { authorization: localStorage.getItem('ACCESS_TOKEN') },
    });
    return data;
  };

  static userLogin = async (email, password) => {
    const { data } = await Axios.post('/user/login', { email, password });
    return data;
  };

  static createUser = async (email, password) => {
    const { data } = await Axios.post('/user', { email, password });
    return data;
  };

  static editUser = async (email) => {
    const { data } = await Axios.put('/user', { email });
    return data;
  };

}

export default UserApi;
