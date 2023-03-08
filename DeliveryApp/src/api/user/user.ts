import {client} from '..';
import {User} from './user.types';

export const getMe = async () => {
  const {data} = await client.get<User>('/user/me');
  return data;
};
