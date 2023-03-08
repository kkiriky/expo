import {StyleSheet, Text, View, Pressable, Platform} from 'react-native';
import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import globalStyles from '@/styles/globalStyles';
import {colors} from '@/common/constants/colors';

interface ProductCardControlProps {
  price: number;
  count: number;
  onRemove: () => void;
  onAdd: () => void;
}

const ProductCardControl = ({
  price,
  count,
  onRemove,
  onAdd,
}: ProductCardControlProps) => {
  return (
    <View style={styles.priceContainer}>
      <Text style={[styles.priceText]}>총액 ₩{price * count}</Text>
      <View style={styles.countControlContainer}>
        <View style={styles.buttonWrapper}>
          <Pressable
            onPress={onRemove}
            android_ripple={{color: '#eee'}}
            style={({pressed}) =>
              pressed && Platform.select({ios: {backgroundColor: '#eee'}})
            }>
            <MaterialIcons name="remove" color={colors.primary} size={20} />
          </Pressable>
        </View>

        <Text style={styles.priceText}>{count}</Text>

        <View style={styles.buttonWrapper}>
          <Pressable
            onPress={onAdd}
            android_ripple={{color: '#eee'}}
            style={({pressed}) =>
              pressed && Platform.select({ios: {backgroundColor: '#eee'}})
            }>
            <MaterialIcons name="add" color={colors.primary} size={20} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ProductCardControl;

const styles = StyleSheet.create({
  priceContainer: {
    ...globalStyles.row,
    justifyContent: 'space-between',
    marginTop: 8,
  },
  countControlContainer: {
    ...globalStyles.row,
    gap: 6,
  },
  priceText: {
    color: colors.primary,
    fontWeight: '500',
  },
  buttonWrapper: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 6,
    overflow: 'hidden',
  },
});
