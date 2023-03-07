import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useCallback, useEffect, useMemo} from 'react';
import * as SplashScreen from 'expo-splash-screen';
import {useGetRestaurants, useRestaurantsRefresh} from '@/hooks/useRestaurants';
import {Restaurant} from '@/api/restaurants/restaurantsApi.types';
import RestaurantCard from '@/components/restaurant/RestaurantCard';
import globalStyles from '@/styles/globalStyles';
import {colors} from '@/common/constants/colors';

const RestaurantsScreen = () => {
  const {data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage} =
    useGetRestaurants();
  const {mutate: refresh, isLoading: refreshing} = useRestaurantsRefresh();

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

    refresh(undefined);
  }, [refresh, refreshing]);

  return (
    <View style={[globalStyles.full, styles.layout]}>
      <FlatList
        data={restaurants}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={Separator}
        renderItem={({item}) => <RestaurantCard restaurant={item} />}
        onEndReachedThreshold={0.9}
        onEndReached={onEndReached}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator
              color={colors.primary}
              size="large"
              style={styles.loading}
            />
          ) : (
            <View />
          )
        }
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={refreshing}
            colors={[colors.primary]}
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
  loading: {
    paddingVertical: 28,
  },
});

export default RestaurantsScreen;
