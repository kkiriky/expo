import {applyToken} from '@/api';
import authStorage from '@/storages/authStorage';
import {useEffect} from 'react';
import {useGetMe} from './useUser';

export const useInitialize = () => {
  const {mutate: getMe} = useGetMe();

  useEffect(() => {
    const init = async () => {
      const accessToken = await authStorage.getAccessToken();
      if (!accessToken) {
        return;
      }

      applyToken(accessToken);
      getMe();
    };
    init();
  }, [getMe]);
};
