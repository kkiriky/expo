import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo} from 'react';
import {RootStackScreenProps} from '@/routes/routes.types';
import {RestaurantProduct, Review} from '@/api/restaurants/restaurants.types';
import RestaurantCard from '@/components/restaurant/RestaurantCard';
import {useGetRestaurantDetail, useGetReviews} from '@/hooks/useRestaurants';
import ProductCard from '@/components/product/ProductCard';
import ReviewCard from '@/components/ReviewCard';
import ListLoading from '@/components/ListLoading';
import FloatingActionButton from '@/components/FloatingActionButton';
import {useAddToBasket, useGetBaskets} from '@/hooks/useBaskets';

const RestaurantDetailScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'RestaurantDetail'>) => {
  // Restaurant Detail
  const {data: restaurantDetail, isFetching} = useGetRestaurantDetail(
    route.params.restaurant,
  );
  const isDetailLoading = useMemo(
    () => !restaurantDetail.detail && isFetching,
    [isFetching, restaurantDetail.detail],
  );

  // Reviews
  const {
    data: pagedReviews,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetReviews(route.params.restaurant.id);
  const reviews = useMemo(() => {
    if (!pagedReviews) {
      return null;
    }
    const items = pagedReviews.pages.map(page => page.data);
    return ([] as Review[]).concat(...items);
  }, [pagedReviews]);

  // Baskets
  const {data: baskets} = useGetBaskets();
  const {addToBasket} = useAddToBasket();

  // Set Header Title
  useEffect(() => {
    navigation.setOptions({headerTitle: restaurantDetail.name});
  }, [navigation, restaurantDetail.name]);

  // Callbacks
  const onEndReached = useCallback(() => {
    if (isFetchingNextPage) {
      return;
    }

    fetchNextPage();
  }, [fetchNextPage, isFetchingNextPage]);

  const onAddToBaseket = useCallback(
    (restaurantProduct: RestaurantProduct) => () => {
      addToBasket({...restaurantProduct, restaurant: restaurantDetail});
    },
    [addToBasket, restaurantDetail],
  );

  const goToBasketScreen = useCallback(
    () => navigation.push('Basket'),
    [navigation],
  );

  return (
    <>
      <FlatList
        ListHeaderComponent={
          <>
            <RestaurantCard
              restaurant={restaurantDetail}
              isDetail
              detail={restaurantDetail.detail}
              isDetailLoading={isDetailLoading}
            />

            {restaurantDetail.products && (
              <View style={styles.menuContainer}>
                <Text style={styles.menu}>메뉴</Text>
                {restaurantDetail.products.map((product, i) => (
                  <Pressable
                    key={product.id}
                    onPress={onAddToBaseket(product)}
                    android_ripple={{color: '#eee'}}
                    style={({pressed}) =>
                      pressed && Platform.select({ios: styles.pressed})
                    }>
                    <ProductCard
                      product={product}
                      hasMarginBottom={
                        i !== restaurantDetail.products.length - 1
                      }
                    />
                  </Pressable>
                ))}
              </View>
            )}
            {restaurantDetail.products && !!reviews?.length && (
              <Text style={styles.review}>리뷰</Text>
            )}
          </>
        }
        data={reviews}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={Separator}
        renderItem={({item}) => <ReviewCard review={item} />}
        contentContainerStyle={styles.container}
        onEndReachedThreshold={0.75}
        onEndReached={onEndReached}
        ListFooterComponent={<ListLoading isLoading={isFetchingNextPage} />}
      />

      {restaurantDetail?.detail && (
        <FloatingActionButton
          onPress={goToBasketScreen}
          count={baskets?.length ?? 0}
        />
      )}
    </>
  );
};

const Separator = () => <View style={styles.separaor} />;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
  },
  menuContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  menu: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  separaor: {
    height: 8,
  },
  review: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  productCardWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  pressed: {
    backgroundColor: '#eee',
  },
});

export default RestaurantDetailScreen;
