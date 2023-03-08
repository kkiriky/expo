import {applyToken, clearToken} from '@/api';
import {CommonError} from '@/api/api.types';
import {login, reIssueAccessToken} from '@/api/auth/auth';
import {userState} from '@/atoms/user';
import authStorage from '@/storages/authStorage';
import {useCallback, useState} from 'react';
import {ToastAndroid} from 'react-native';
import {useMutation} from 'react-query';
import {useSetRecoilState} from 'recoil';
import {useGetMe} from './useUser';

export const useLogin = () => {
  const {mutate: getMe} = useGetMe();

  return useMutation(login, {
    async onSuccess({accessToken, refreshToken}) {
      await Promise.all([
        authStorage.setAccessToken(accessToken),
        authStorage.setRefreshToken(refreshToken),
      ]);

      applyToken(accessToken);

      getMe();
    },
    onError(err: CommonError) {
      if (err.response) {
        ToastAndroid.show(err.response.data.message, ToastAndroid.SHORT);
      }
    },
  });
};

export const useReIssueAccessToken = () => {
  return useMutation(reIssueAccessToken, {
    onSuccess({accessToken}) {
      applyToken(accessToken);
    },
  });
};

export const useLogout = () => {
  const setUser = useSetRecoilState(userState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const mutate = useCallback(async () => {
    try {
      setIsLoading(true);
      setUser(null);
      await authStorage.clear();
      clearToken();
    } catch (err) {
      setError('로그아웃에 실패하였습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [setUser]);

  return {mutate, isLoading, error};
};
