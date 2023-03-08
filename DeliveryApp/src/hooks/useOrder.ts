import {Pagination} from '@/api/api.types';
import {createOrder, getOrders} from '@/api/order/order';
import {Order} from '@/api/order/order.types';
import {RootStackScreenProps} from '@/routes/routes.types';
import {useNavigation} from '@react-navigation/native';
import {
  useMutation,
  useInfiniteQuery,
  useQueryClient,
  InfiniteData,
} from '@tanstack/react-query';

const ordersKey = ['orders'];

export const useGetOrders = () => {
  return useInfiniteQuery(
    ordersKey,
    ({pageParam}) => getOrders({after: pageParam}),
    {
      getNextPageParam: lastPage => {
        if (!lastPage.meta.hasMore) {
          return undefined;
        }

        return lastPage.data[lastPage.data.length - 1].id;
      },
    },
  );
};

export const useRefreshOrders = () => {
  const queryClient = useQueryClient();
  return useMutation(() => getOrders(), {
    onSuccess: data => {
      queryClient.setQueryData<InfiniteData<Pagination<Order>>>(ordersKey, {
        pageParams: [data.data[0].id],
        pages: [data],
      });
    },
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const navigation =
    useNavigation<RootStackScreenProps<'Basket'>['navigation']>();

  return useMutation(createOrder, {
    onSuccess: data => {
      queryClient.setQueryData<InfiniteData<Pagination<Order>>>(
        ordersKey,
        prevData => {
          prevData?.pageParams;
          if (!prevData) {
            return {
              pageParams: [],
              pages: [
                {
                  meta: {count: 20, hasMore: true},
                  data: [data],
                },
              ],
            };
          }

          return {
            ...prevData,
            pages: [
              {
                meta: {count: 20, hasMore: true},
                data: [data],
              },
              ...prevData.pages,
            ],
          };
        },
      );

      navigation.push('OrderComplete');
    },
  });
};
