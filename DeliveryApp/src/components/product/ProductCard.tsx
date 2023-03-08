import {Image, Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import globalStyles from '@/styles/globalStyles';
import {colors} from '@/common/constants/colors';
import {RestaurantProduct} from '@/api/restaurants/restaurants.types';
import {baseURL} from '@/api';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ProductCardControl from './ProductCardControl';

interface ProductCardProps {
  product: RestaurantProduct;
  hasMarginBottom?: boolean;
  isBasket?: boolean;
  count?: number;
  onAdd?: () => void;
  onRemove?: () => void;
  onRemoveForce?: () => void;
}

const ProductCard = ({
  product,
  hasMarginBottom,
  isBasket,
  count,
  onAdd,
  onRemove,
  onRemoveForce,
}: ProductCardProps) => {
  return (
    <>
      <View style={[styles.container, hasMarginBottom && styles.marginBottom]}>
        <Image
          source={{uri: `${baseURL}${product.imgUrl}`}}
          style={styles.image}
        />

        <View style={styles.textContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{product.name}</Text>
            {isBasket && (
              <Pressable
                onPress={onRemoveForce}
                android_ripple={{color: '#eee'}}
                style={({pressed}) =>
                  pressed && Platform.select({ios: {backgroundColor: '#eee'}})
                }>
                <MaterialIcons
                  name="delete-forever"
                  color={colors.primary}
                  size={18}
                />
              </Pressable>
            )}
          </View>
          <Text
            style={styles.description}
            numberOfLines={2}
            ellipsizeMode="tail">
            {product.detail}
          </Text>
          <Text style={styles.price}>₩{product.price}</Text>
        </View>
      </View>
      {isBasket && count && onRemove && onAdd && (
        <ProductCardControl
          price={product.price}
          count={count}
          onRemove={onRemove}
          onAdd={onAdd}
        />
      )}
    </>
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
  titleContainer: {
    ...globalStyles.row,
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
