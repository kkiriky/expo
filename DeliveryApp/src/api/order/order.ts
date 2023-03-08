import {client} from '..';
import {Pagination, PaginationParams} from '../api.types';
import {CreateOrder, Order} from './order.types';

export const getOrders = async (params?: PaginationParams) => {
  const _count = {count: params?.count ?? 20};
  const {data} = await client.get<Pagination<Order>>('/order', {
    params: params?.after ? {after: params.after, ..._count} : _count,
  });
  return data;
};

export const createOrder = async (createOrderPayload: CreateOrder) => {
  const {data} = await client.post<Order>('/order', createOrderPayload);
  return data;
};
