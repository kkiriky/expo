import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import {useGetProducts, useRefreshProducts} from '@/hooks/useProduct';
import {Product} from '@/api/products/products.types';
import ProductCard from '@/components/ProductCard';
import ListLoading from '@/components/ListLoading';
import {colors} from '@/common/constants/colors';
import {MainTabScreenProps} from '@/routes/routes.types';

const ProductsScreen = ({navigation}: MainTabScreenProps<'Products'>) => {
  const {data, fetchNextPage, hasNextPage, isFetchingNextPage} =
    useGetProducts();
  const {mutate: refresh, isLoading: refreshing} = useRefreshProducts();

  const products = useMemo(() => {
    if (!data) {
      return null;
    }

    const items = data.pages.map(page => page.data);

    return ([] as Product[]).concat(...items);
  }, [data]);

  const onEndReached = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage) {
      return;
    }

    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const onRefresh = useCallback(() => {
    if (refreshing) {
      return;
    }

    refresh();
  }, [refresh, refreshing]);

  const onPress = useCallback(
    (product: Product) => () =>
      navigation.push('RestaurantDetail', {
        restaurant: product.restaurant,
      }),
    [navigation],
  );

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={Separator}
      renderItem={({item}) => (
        <Pressable onPress={onPress(item)}>
          <ProductCard product={item} />
        </Pressable>
      )}
      contentContainerStyle={styles.container}
      ListFooterComponent={<ListLoading isLoading={isFetchingNextPage} />}
      onEndReachedThreshold={0.9}
      onEndReached={onEndReached}
      refreshControl={
        <RefreshControl
          onRefresh={onRefresh}
          refreshing={refreshing}
          colors={[colors.primary]}
        />
      }
    />
  );
};

const Separator = () => <View style={styles.separator} />;

export default ProductsScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
  },
  separator: {
    height: 10,
  },
});
