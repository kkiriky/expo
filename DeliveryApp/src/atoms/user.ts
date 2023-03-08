import {User} from '@/api/user/user.types';
import {atom} from 'recoil';

export const userState = atom<User | null>({
  key: 'userState',
  default: null,
});
