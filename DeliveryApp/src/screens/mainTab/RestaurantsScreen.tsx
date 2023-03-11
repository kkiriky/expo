import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  Pressable,
} from 'react-native';
import React, {useCallback, useEffect, useMemo} from 'react';
import * as SplashScreen from 'expo-splash-screen';
import {useGetRestaurants, useRefreshRestaurants} from '@/hooks/useRestaurants';
import {Restaurant} from '@/api/restaurants/restaurants.types';
import RestaurantCard from '@/components/restaurant/RestaurantCard';
import globalStyles from '@/styles/globalStyles';
import {colors} from '@/common/constants/colors';
import {MainTabScreenProps} from '@/routes/routes.types';
import ListLoading from '@/components/ListLoading';
import useBackEffect from '@/hooks/useBackEffect';

const RestaurantsScreen = ({navigation}: MainTabScreenProps<'Restaurants'>) => {
  const {data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage} =
    useGetRestaurants();
  const {mutate: refresh, isLoading: refreshing} = useRefreshRestaurants();

  const restaurants = useMemo(() => {
    if (!data) {
      return null;
    }

    const items = data.pages.map(page => page.data);

    return ([] as Restaurant[]).concat(...items);
  }, [data]);

  useEffect(() => {
    if (!isLoading) {
      (async () => {
        await SplashScreen.hideAsync();
      })();
    }
  }, [isLoading]);
  useBackEffect();

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
    (restaurant: Restaurant) => () =>
      navigation.push('RestaurantDetail', {restaurant}),
    [navigation],
  );

  return (
    <View style={globalStyles.full}>
      <FlatList
        data={restaurants}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={Separator}
        renderItem={({item}) => (
          <Pressable onPress={onPress(item)}>
            <RestaurantCard restaurant={item} />
          </Pressable>
        )}
        contentContainerStyle={styles.layout}
        onEndReachedThreshold={1}
        onEndReached={onEndReached}
        ListFooterComponent={<ListLoading isLoading={isFetchingNextPage} />}
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={refreshing}
            colors={[colors.primary]} // android
            tintColor={colors.primary} // ios
          />
        }
      />
    </View>
  );
};

const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  layout: {
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  separator: {
    height: 12,
  },
});

export default RestaurantsScreen;
