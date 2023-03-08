import {Pagination} from '@/api/api.types';
import {getProducts} from '@/api/products/products';
import {Product} from '@/api/products/products.types';
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from 'react-query';

export const useGetProducts = () => {
  return useInfiniteQuery(
    'products',
    ({pageParam}) => getProducts({after: pageParam}),
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

export const useRefreshProducts = () => {
  const queryClient = useQueryClient();

  return useMutation(() => getProducts(), {
    onSuccess: data => {
      queryClient.setQueryData<InfiniteData<Pagination<Product>>>('products', {
        pageParams: [data.data[0].id],
        pages: [data],
      });
    },
  });
};
