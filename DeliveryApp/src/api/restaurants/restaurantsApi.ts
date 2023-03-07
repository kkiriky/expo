import {client} from '..';
import {PaginationParams as PaginationParams, Pagination} from '../api.types';
import {Restaurant} from './restaurantsApi.types';

export const getRestaurants = async (params?: PaginationParams) => {
  const _count = {count: params?.count ?? 20};
  const {data} = await client.get<Pagination<Restaurant>>('/restaurant', {
    params: params?.after ? {after: params.after, ..._count} : _count,
  });
  return data;
};
