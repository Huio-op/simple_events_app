import { Axios } from '../Utils';

class UserApi {
  static findUser = async (email) => {
    const { data } = await Axios.get('/user', { params: { email: email } });
    return data;
  };

  static createUser = async (email, password) => {
    const { data } = await Axios.post('/user', { email, password });
    console.log('dadadadada', data);
    return data;
  };
}

export default UserApi;
