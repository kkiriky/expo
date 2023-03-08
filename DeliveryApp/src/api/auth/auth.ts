import {client} from '..';
import {LoginResponse, ReIssueAccesTokenResponse} from './auth.types';

export const login = async (loginInfo: string) => {
  const {data} = await client.post<LoginResponse>('/auth/login', null, {
    headers: {
      Authorization: `Basic ${loginInfo}`,
    },
  });

  return data;
};

export const reIssueAccessToken = async (refreshToken: string) => {
  const {data} = await client.post<ReIssueAccesTokenResponse>(
    '/auth/token',
    null,
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    },
  );

  return data;
};
