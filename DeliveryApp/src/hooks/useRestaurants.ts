import {Pagination} from '@/api/api.types';
import {
  getRestaurantDetail,
  getRestaurants,
  getReviews,
} from '@/api/restaurants/restaurants';
import {
  Restaurant,
  RestaurantDetail,
} from '@/api/restaurants/restaurants.types';
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

type InfiniteRestaurants = InfiniteData<Pagination<Restaurant>>;

export const useGetRestaurants = (count?: number) => {
  return useInfiniteQuery(
    ['restaurants'],
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

export const useRefreshRestaurants = () => {
  const queryClient = useQueryClient();

  return useMutation(() => getRestaurants(), {
    onSuccess: data => {
      queryClient.setQueryData<InfiniteRestaurants>(['restaurants'], {
        pageParams: [data.data[0].id],
        pages: [data],
      });
    },
  });
};

export const useGetRestaurantDetail = (restaurant: Restaurant) => {
  return useQuery(
    ['restaurant', restaurant.id],
    () => getRestaurantDetail(restaurant.id),
    {
      enabled: !!restaurant.id,
      initialData: restaurant as RestaurantDetail,
      // placeholderData: restaurant,
    },
  );
};

export const useGetReviews = (rid: string) => {
  return useInfiniteQuery(
    ['reviews', rid],
    ({pageParam}) => getReviews({rid, after: pageParam}),
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
