import {StyleSheet, View, Platform, Pressable, Text} from 'react-native';
import React from 'react';
import {colors} from '@/common/constants/colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface FloatingActionButtonProps {
  onPress: () => void;
  count: number;
}

const FloatingActionButton = ({onPress, count}: FloatingActionButtonProps) => {
  return (
    <View style={styles.buttonWrapper}>
      <Pressable
        onPress={onPress}
        android_ripple={{color: colors.activePrimary}}
        style={({pressed}) => [
          styles.button,
          pressed && Platform.select({ios: styles.pressed}),
        ]}>
        <View>
          <MaterialIcons name="shopping-basket" color="#fff" size={24} />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{count}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default FloatingActionButton;

const styles = StyleSheet.create({
  buttonWrapper: {
    position: 'absolute',
    bottom: 16,
    right: 16,

    backgroundColor: colors.primary,
    borderRadius: 24,

    ...Platform.select({
      android: {
        overflow: 'hidden',
        elevation: 5,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
    }),
  },
  button: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  badge: {
    position: 'absolute',
    top: -3,
    right: -7,
    backgroundColor: '#fff',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '500',
  },
});
