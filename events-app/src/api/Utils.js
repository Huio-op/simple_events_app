import axios from 'axios';
import j from 'jquery';

export const Axios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  paramsSerializer(params) {
    if (!params) return '';
    return j.param(params);
  },
});
