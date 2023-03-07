import axios from 'axios';
import {Platform} from 'react-native';

const localhost = Platform.OS === 'android' ? '192.168.219.136' : '127.0.0.1';
export const baseURL = `http://${localhost}:3000`;

export const client = axios.create({
  baseURL,
});

export const applyToken = (token: string) => {
  client.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  client.defaults.headers.common.Authorization = '';
};
