import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useMemo} from 'react';
import {RootStackScreenProps} from '@/routes/routes.types';
import {RestaurantDetail, Review} from '@/api/restaurants/restaurants.types';
import RestaurantCard from '@/components/restaurant/RestaurantCard';
import {useGetRestaurantDetail, useGetReviews} from '@/hooks/useRestaurants';
import ProductCard from '@/components/ProductCard';
import ReviewCard from '@/components/ReviewCard';
import ListLoading from '@/components/ListLoading';
import FloatingActionButton from '@/components/FloatingActionButton';

const RestaurantDetailScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'RestaurantDetail'>) => {
  const {data} = useGetRestaurantDetail(route.params.restaurant.id);
  const {
    data: pagedReviews,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetReviews(route.params.restaurant.id);

  const restaurantDetail = useMemo(() => {
    if (!data) {
      return route.params.restaurant as RestaurantDetail;
    }
    return data;
  }, [data, route.params.restaurant]);

  const reviews = useMemo(() => {
    if (!pagedReviews) {
      return null;
    }
    const items = pagedReviews.pages.map(page => page.data);

    return ([] as Review[]).concat(...items);
  }, [pagedReviews]);

  useEffect(() => {
    navigation.setOptions({headerTitle: restaurantDetail.name});
  }, [navigation, restaurantDetail.name]);

  const onEndReached = useCallback(() => {
    if (isFetchingNextPage) {
      return;
    }

    fetchNextPage();
  }, [fetchNextPage, isFetchingNextPage]);

  return (
    <>
      <FlatList
        ListHeaderComponent={
          <>
            <RestaurantCard
              restaurant={restaurantDetail}
              isDetail
              detail={restaurantDetail.detail}
            />

            {restaurantDetail.products && (
              <View style={styles.menuContainer}>
                <Text style={styles.menu}>메뉴</Text>
                {restaurantDetail.products.map((product, i) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    hasMarginBottom={i !== restaurantDetail.products.length - 1}
                  />
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
      <FloatingActionButton onPress={() => {}} count={1} />
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
});

export default RestaurantDetailScreen;
