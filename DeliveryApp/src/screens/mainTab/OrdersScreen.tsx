import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import {useGetOrders, useRefreshOrders} from '@/hooks/useOrder';
import {Order} from '@/api/order/order.types';
import OrderCard from '@/components/OrderCard';
import {colors} from '@/common/constants/colors';
import ListLoading from '@/components/ListLoading';
import CenterLoading from '@/components/CenterLoading';

const OrdersScreen = () => {
  const {data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage} =
    useGetOrders();
  const {mutate: refresh, isLoading: refreshing} = useRefreshOrders();
  const orders = useMemo(() => {
    if (!data) {
      return [];
    }

    const items = data.pages.map(page => page.data);
    return ([] as Order[]).concat(...items);
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

  if (isLoading) {
    return <CenterLoading />;
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={Separator}
      renderItem={({item}) => <OrderCard order={item} />}
      contentContainerStyle={[
        styles.contentContainer,
        orders.length === 0 && styles.emptyScreen,
      ]}
      ListEmptyComponent={
        <Text style={styles.emptyText}>주문내역이 존재하지 않습니다.</Text>
      }
      onEndReachedThreshold={0.9}
      onEndReached={onEndReached}
      ListFooterComponent={<ListLoading isLoading={isFetchingNextPage} />}
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

export default OrdersScreen;

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 8,
  },
  separator: {
    height: 8,
  },
  emptyScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.bodyText,
  },
});
