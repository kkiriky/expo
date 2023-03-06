import {baseURL} from '@/common/constants';
import axios from 'axios';

export const client = axios.create({
  baseURL,
});

export const applyToken = (token: string) => {
  client.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  client.defaults.headers.common.Authorization = '';
};
