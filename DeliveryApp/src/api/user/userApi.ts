import {client} from '..';
import {User} from './userApi.types';

export const getMe = async () => {
  const {data} = await client.get<User>('/user/me');
  return data;
};
