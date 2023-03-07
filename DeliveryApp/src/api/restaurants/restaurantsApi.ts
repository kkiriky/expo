import {client} from '..';
import {PaginationParams as PaginationParams, Pagination} from '../api.types';
import {
  GetReviewsParams,
  Restaurant,
  RestaurantDetail,
  Review,
} from './restaurantsApi.types';

export const getRestaurants = async (params?: PaginationParams) => {
  const _count = {count: params?.count ?? 20};
  const {data} = await client.get<Pagination<Restaurant>>('/restaurant', {
    params: params?.after ? {after: params.after, ..._count} : _count,
  });
  return data;
};

export const getRestaurantDetail = async (rid: string) => {
  const {data} = await client.get<RestaurantDetail>(`/restaurant/${rid}`);
  return data;
};

export const getReviews = async ({rid, after, count}: GetReviewsParams) => {
  const _count = {count: count ?? 20};
  const {data} = await client.get<Pagination<Review>>(
    `/restaurant/${rid}/rating`,
    {
      params: after ? {after, ..._count} : _count,
    },
  );
  return data;
};
