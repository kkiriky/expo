import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import globalStyles from '@/styles/globalStyles';
import {colors} from '@/common/constants/colors';
import {RestaurantProduct} from '@/api/restaurants/restaurantsApi.types';
import {baseURL} from '@/api';

interface ProductCardProps {
  product: RestaurantProduct;
  hasMarginBottom?: boolean;
}

const ProductCard = ({product, hasMarginBottom}: ProductCardProps) => {
  return (
    <View style={[styles.container, hasMarginBottom && styles.marginBottom]}>
      <Image
        source={{uri: `${baseURL}${product.imgUrl}`}}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
          {product.detail}
        </Text>
        <Text style={styles.price}>₩{product.price}</Text>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    ...globalStyles.row,
    height: 96,
    gap: 12,
  },
  image: {
    width: 96,
    height: 96,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
  },
  description: {
    color: colors.bodyText,
    fontWeight: '500',
  },
  price: {
    color: colors.primary,
    fontWeight: '500',
    marginLeft: 'auto',
  },
  marginBottom: {
    marginBottom: 10,
  },
});
