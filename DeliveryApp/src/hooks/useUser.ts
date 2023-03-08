import {getMe} from '@/api/user/user';
import {userState} from '@/atoms/user';
import {useMutation} from 'react-query';
import {useSetRecoilState} from 'recoil';

export const useGetMe = () => {
  const setUser = useSetRecoilState(userState);

  return useMutation(getMe, {
    onSuccess(user) {
      setUser(user);
    },
  });
};
