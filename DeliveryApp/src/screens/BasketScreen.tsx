import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import ProductCard from '@/components/product/ProductCard';
import globalStyles from '@/styles/globalStyles';
import {colors} from '@/common/constants/colors';
import CustomButton from '@/components/CustomButton';
import {
  useAddToBasket,
  useGetBaskets,
  useRemoveFromBasket,
} from '@/hooks/useBaskets';
import {Product} from '@/api/products/products.types';
import {BasketItem} from '@/api/user/user.types';
import {useCreateOrder} from '@/hooks/useOrder';
import {v4 as uuidV4} from 'uuid';

const BasketScreen = () => {
  const {data: baskets} = useGetBaskets();
  const {addToBasket} = useAddToBasket();
  const {removeFromBasket} = useRemoveFromBasket();

  const basketPrice = useMemo(() => {
    if (!baskets) {
      return 0;
    }
    return baskets.reduce((acc, basketItem) => {
      return acc + basketItem.count * basketItem.product.price;
    }, 0);
  }, [baskets]);

  const deliveryPrice = useMemo(() => {
    const deduplicatedBasket = baskets?.reduce((acc, cur) => {
      const item = acc.find(
        basketItem =>
          basketItem.product.restaurant.id === cur.product.restaurant.id,
      );

      if (!item) {
        acc.push(cur);
      }

      return acc;
    }, [] as BasketItem[]);

    if (!deduplicatedBasket) {
      return 0;
    }

    return deduplicatedBasket.reduce((acc, cur) => {
      return acc + cur.product.restaurant.deliveryFee;
    }, 0);
  }, [baskets]);
  const totalPrice = useMemo(
    () => basketPrice + deliveryPrice,
    [basketPrice, deliveryPrice],
  );

  const onAdd = useCallback(
    (product: Product) => () => {
      addToBasket(product);
    },
    [addToBasket],
  );
  const onRemove = useCallback(
    (productId: string) => () => {
      removeFromBasket({productId});
    },
    [removeFromBasket],
  );
  const onRemoveForce = useCallback(
    (productId: string) => () => {
      removeFromBasket({productId, isForce: true});
    },
    [removeFromBasket],
  );

  const {mutate: createOrder, isLoading: payLoading} = useCreateOrder();
  const onPay = useCallback(() => {
    if (!baskets) return;

    createOrder({
      id: uuidV4(),
      products: baskets.map(basketItem => ({
        productId: basketItem.product.id,
        count: basketItem.count,
      })),
      totalPrice,
      createdAt: new Date(),
    });
  }, [baskets, createOrder, totalPrice]);

  if (!baskets || baskets.length === 0) {
    return (
      <View style={[globalStyles.full, styles.center]}>
        <Text style={styles.emptyTitle}>텅!</Text>
        <Text style={styles.emptyText}>장바구니가 비었습니다.</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.full}>
      <FlatList
        data={baskets}
        ItemSeparatorComponent={Separtor}
        renderItem={({item}) => (
          <ProductCard
            product={item.product}
            isBasket
            count={item.count}
            onAdd={onAdd(item.product)}
            onRemove={onRemove(item.product.id)}
            onRemoveForce={onRemoveForce(item.product.id)}
          />
        )}
        contentContainerStyle={styles.contentContainer}
      />

      <View style={styles.paymentContainer}>
        <View style={styles.paymentRow}>
          <Text style={[styles.subText]}>장바구니 금액</Text>
          <Text style={[styles.subText]}>₩{basketPrice}</Text>
        </View>

        <View style={styles.paymentRow}>
          <Text style={[styles.subText]}>배달비</Text>
          <Text style={[styles.subText]}>₩{deliveryPrice}</Text>
        </View>

        <View style={styles.paymentRow}>
          <Text style={styles.bold}>총액</Text>
          <Text style={styles.bold}>₩{totalPrice}</Text>
        </View>

        <CustomButton
          text={`결제하기 (₩${totalPrice})`}
          onPress={onPay}
          isLoading={payLoading}
          height={36}
          fontSize={12}
        />
      </View>
    </View>
  );
};

const Separtor = () => <View style={styles.separtor} />;

export default BasketScreen;

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
  },
  separtor: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 12,
  },
  paymentContainer: {
    padding: 16,
    gap: 8,
  },
  paymentRow: {
    ...globalStyles.row,
    justifyContent: 'space-between',
  },
  subText: {
    fontSize: 12,
    color: colors.bodyText,
    fontWeight: '500',
  },
  bold: {
    fontSize: 12,
    fontWeight: '600',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 4,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.bodyText,
  },
});
