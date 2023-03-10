import {Image, Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import globalStyles from '@/styles/globalStyles';
import {colors} from '@/common/constants/colors';
import {RestaurantProduct} from '@/api/restaurants/restaurants.types';
import {baseURL} from '@/api';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import ProductCardControl from './ProductCardControl';
import {modals} from '../modals/Modals';
import useModal from '@/hooks/useModal';
import {useActionSheet} from '@expo/react-native-action-sheet';

const {askDialog} = modals;

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
  const {openModal} = useModal();
  const {showActionSheetWithOptions} = useActionSheet();

  const onAskRemove = useCallback(() => {
    if (!onRemoveForce) return;

    if (Platform.OS === 'android') {
      openModal(askDialog, {
        title: '장바구니',
        message: `${product.name}를(을) 장바구니에서 삭제하겠습니까?`,
        confirmText: '삭제',
        isDestructive: true,
        onConfirm: onRemoveForce,
      });
    } else {
      showActionSheetWithOptions(
        {
          title: '장바구니',
          message: `${product.name}를(을) 장바구니에서 삭제하겠습니까?`,
          options: ['삭제', '취소'],
          destructiveButtonIndex: 0,
          cancelButtonIndex: 1,
          cancelButtonTintColor: '#000',
          // only android
          icons: [
            <MaterialIcons name="delete-forever" color="#d32f2f" size={20} />,
            <MaterialCommunityIcons name="close-circle-outline" size={20} />,
          ],
          containerStyle: {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          },
        },
        buttonIndex => {
          if (buttonIndex === 0) {
            onRemoveForce();
          }
        },
      );
    }
  }, [onRemoveForce, openModal, product.name, showActionSheetWithOptions]);

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
              <View style={styles.delteButtonWrapper}>
                <Pressable
                  onPress={onAskRemove}
                  hitSlop={8}
                  android_ripple={{color: '#eee'}}
                  style={({pressed}) => [
                    styles.deleteButton,
                    pressed &&
                      Platform.select({ios: {backgroundColor: '#eee'}}),
                  ]}>
                  <MaterialIcons
                    name="delete-forever"
                    color={colors.primary}
                    size={18}
                  />
                </Pressable>
              </View>
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
  delteButtonWrapper: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  deleteButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
