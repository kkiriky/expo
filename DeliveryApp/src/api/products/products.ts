import {client} from '..';
import {Pagination, PaginationParams} from '../api.types';
import {Product} from './products.types';

export const getProducts = async (params?: PaginationParams) => {
  const _count = {count: params?.count ?? 20};
  const {data} = await client.get<Pagination<Product>>('/product', {
    params: params?.after ? {after: params?.after, ..._count} : _count,
  });
  return data;
};
