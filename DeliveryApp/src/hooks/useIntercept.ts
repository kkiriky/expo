import {useEffect} from 'react';
import authStorage from '@/storages/authStorage';
import {applyToken, client} from '@/api';
import {CommonError} from '@/api/api.types';
import {useLogout} from './useAuth';
import {reIssueAccessToken} from '@/api/auth/auth';

export const useIntercept = () => {
  const {mutate: logout} = useLogout();

  useEffect(() => {
    client.interceptors.request.use(req => {
      const params = new URLSearchParams(req.params).toString();
      console.log(
        `[${req.method?.toUpperCase()}] ${req.url}${
          params ? `?${params}` : ''
        }`,
      );
      return req;
    });

    client.interceptors.response.use(
      res => res,
      async (error: CommonError) => {
        if (!error.config || !error.response) {
          return Promise.reject(error);
        }
        console.log(
          `ERROR[${error.config.method?.toUpperCase()}] ${error.config.url}`,
        );

        const isUnauthorized = error.response.data.statusCode === 401;
        if (!isUnauthorized) {
          return Promise.reject(error);
        }

        const isReIssueRequest = error.config.url === '/auth/token';
        if (isReIssueRequest) {
          await logout();
          return Promise.reject(error);
        }

        const refreshToken = await authStorage.getRefreshToken();
        if (!refreshToken) {
          return Promise.reject(error);
        }
        const {accessToken} = await reIssueAccessToken(refreshToken);

        authStorage.setAccessToken(accessToken);
        applyToken(accessToken);

        const response = await client({
          ...error.config,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        return response;
      },
    );
  }, [logout]);
};
