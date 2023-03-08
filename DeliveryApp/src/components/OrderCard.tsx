import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import globalStyles from '@/styles/globalStyles';
import {colors} from '@/common/constants/colors';
import {Order} from '@/api/order/order.types';
import {baseURL} from '@/api';
import dayjs from 'dayjs';

interface OrderCardProps {
  order: Order;
}

const OrderCard = ({order}: OrderCardProps) => {
  const count = order.products.length;

  return (
    <>
      <Text style={styles.date}>
        {dayjs(order.createdAt).format('YYYY.MM.DD')} 주문완료
      </Text>
      <View style={globalStyles.row}>
        <Image
          source={{uri: `${baseURL}${order.restaurant.thumbUrl}`}}
          style={styles.image}
        />
        <View>
          <Text style={styles.food}>{order.restaurant.name}</Text>
          <Text style={styles.price}>
            {order.products[0].product.name}{' '}
            {count > 1 ? `외 ${count - 1}개` : `${order.products[0].count}개`}{' '}
            {order.totalPrice}원
          </Text>
        </View>
      </View>
    </>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  date: {
    fontSize: 12,
    color: colors.bodyText,
    marginBottom: 4,
  },
  image: {
    width: 48,
    height: 48,
    resizeMode: 'cover',
    borderRadius: 8,
    marginRight: 12,
  },
  food: {
    fontSize: 12,
    marginBottom: 2,
    fontWeight: '500',
  },
  price: {
    fontSize: 12,
    color: colors.bodyText,
  },
});
