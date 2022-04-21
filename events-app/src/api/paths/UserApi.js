import { Axios } from '../Utils';

class UserApi {
  static findUser = async (email) => {
    const { data } = await Axios.get('/user', { params: { email: email } });
    return data;
  };
}

export default UserApi;
