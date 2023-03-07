import {Pagination} from '@/api/api.types';
import {getRestaurants} from '@/api/restaurants/restaurantsApi';
import {Restaurant} from '@/api/restaurants/restaurantsApi.types';
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from 'react-query';

type InfiniteRestaurants = InfiniteData<Pagination<Restaurant>>;

export const useGetRestaurants = (count?: number) => {
  return useInfiniteQuery(
    'restaurants',
    ({pageParam}) => getRestaurants({after: pageParam, count}),
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

export const useRestaurantsRefresh = () => {
  const queryClient = useQueryClient();

  return useMutation(getRestaurants, {
    onSuccess: data => {
      const pagedRestaurants =
        queryClient.getQueryData<InfiniteRestaurants>('restaurants');
      if (!pagedRestaurants) {
        return;
      }
      queryClient.setQueryData<InfiniteRestaurants>('restaurants', {
        pageParams: [data.data[0].id],
        pages: [data],
      });
    },
  });
};
