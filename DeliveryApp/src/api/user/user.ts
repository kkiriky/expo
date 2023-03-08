import {AxiosResponse} from 'axios';
import {client} from '..';
import {BasketItem, PatchBasketPayload, User} from './user.types';

export const getMe = async () => {
  const {data} = await client.get<User>('/user/me');
  return data;
};

export const getBaskets = async () => {
  const {data} = await client.get<BasketItem[]>('/user/me/basket');
  return data;
};

export const patchBasket = async (baskets: BasketItem[]) => {
  const {data} = await client.patch<
    BasketItem[],
    AxiosResponse<BasketItem[]>,
    PatchBasketPayload
  >('/user/me/basket', {
    basket: baskets.map(basketItem => ({
      productId: basketItem.product.id,
      count: basketItem.count,
    })),
  });
  return data;
};
