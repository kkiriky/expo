import {Product} from '@/api/products/products.types';
import {getBaskets, patchBasket} from '@/api/user/user';
import {BasketItem} from '@/api/user/user.types';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useCallback} from 'react';

const basketsKey = ['baskets'];

export const useGetBaskets = () => {
  return useQuery(basketsKey, getBaskets, {
    placeholderData: [] as BasketItem[],
    staleTime: 1000 * 60 * 5,
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
    onMutate: async basketsPayload => {
      await queryClient.cancelQueries(basketsKey);

      const previousBaskets =
        queryClient.getQueryData<BasketItem[]>(basketsKey);
      if (!previousBaskets) {
        return {previousBaskets: []};
      }

      queryClient.setQueryData<BasketItem[]>(basketsKey, basketsPayload);

      return {previousBaskets};
    },
    onError: (_error, _data, context) => {
      queryClient.setQueryData(basketsKey, context?.previousBaskets);
    },
    // onSuccess: data => {
    //   queryClient.setQueryData<BasketItem[]>(basketsKey, data);
    // },
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

interface RemoveFromBasket {
  productId: string;
  isForce?: boolean;
}

export const useRemoveFromBasket = () => {
  const queryClient = useQueryClient();
  const {mutate} = usePatchBasket();

  const removeFromBasket = useCallback(
    ({productId, isForce}: RemoveFromBasket) => {
      const baskets = queryClient.getQueryData<BasketItem[]>(basketsKey);
      if (!baskets) {
        return;
      }
      let copiedBaskets = [...baskets];

      const targetIndex = baskets.findIndex(
        basketItem => basketItem.product.id === productId,
      );
      if (targetIndex === -1) {
        return;
      }

      if (isForce || copiedBaskets[targetIndex].count === 1) {
        copiedBaskets = copiedBaskets.filter(
          basketItem => basketItem.product.id !== productId,
        );
      } else {
        copiedBaskets[targetIndex] = {
          product: copiedBaskets[targetIndex].product,
          count: copiedBaskets[targetIndex].count - 1,
        };
      }

      mutate(copiedBaskets);
    },
    [mutate, queryClient],
  );

  return {removeFromBasket};
};
