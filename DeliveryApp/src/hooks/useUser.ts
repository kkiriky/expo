import {Product} from '@/api/products/products.types';
import {getBaskets, getMe, patchBasket} from '@/api/user/user';
import {BasketItem} from '@/api/user/user.types';
import {userState} from '@/atoms/user';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useCallback} from 'react';
import {useSetRecoilState} from 'recoil';

export const useGetMe = () => {
  const setUser = useSetRecoilState(userState);

  return useMutation(getMe, {
    onSuccess(user) {
      setUser(user);
    },
  });
};

const basketsKey = ['baskets'];

export const useGetBaskets = () => {
  return useQuery(basketsKey, getBaskets, {
    initialData: [] as BasketItem[],
  });
};

export const usePatchBasket = () => {
  const queryClient = useQueryClient();

  return useMutation<
    BasketItem[],
    unknown,
    BasketItem[],
    {previousBaskets: BasketItem[]}
  >(patchBasket, {
    onMutate: async payload => {
      await queryClient.cancelQueries(basketsKey);

      const previousBaskets =
        queryClient.getQueryData<BasketItem[]>(basketsKey);
      if (!previousBaskets) {
        return {previousBaskets: []};
      }

      queryClient.setQueryData<BasketItem[]>(basketsKey, payload);

      return {previousBaskets};
    },
    onError: (_error, _data, context) => {
      queryClient.setQueryData(basketsKey, context?.previousBaskets);
    },
    onSuccess: data => {
      queryClient.setQueryData<BasketItem[]>(basketsKey, data);
    },
  });
};

export const useAddToBasket = () => {
  const queryClient = useQueryClient();
  const {mutate} = usePatchBasket();

  const addToBasket = useCallback(
    (product: Product) => {
      const baskets = queryClient.getQueryData<BasketItem[]>(basketsKey);
      if (!baskets) {
        return;
      }
      const copiedBaskets = [...baskets];

      const targetIndex = baskets.findIndex(
        basketItem => basketItem.product.id === product.id,
      );

      if (targetIndex === -1) {
        copiedBaskets.push({
          product,
          count: 1,
        });
      } else {
        copiedBaskets[targetIndex] = {
          product,
          count: copiedBaskets[targetIndex].count + 1,
        };
      }

      mutate(copiedBaskets);
    },
    [mutate, queryClient],
  );

  return {addToBasket};
};
