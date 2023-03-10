import {
  StyleSheet,
  View,
  Platform,
  Pressable,
  Text,
  ViewStyle,
  Animated,
} from 'react-native';
import React, {useCallback, useEffect, useRef} from 'react';
import {colors} from '@/common/constants/colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import globalStyles from '@/styles/globalStyles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface FloatingActionButtonProps {
  onPress: () => void;
  count: number;
}

const FloatingActionButton = ({onPress, count}: FloatingActionButtonProps) => {
  const {bottom} = useSafeAreaInsets();
  const animation = useRef(new Animated.Value(0)).current;
  // const animation = useSharedValue(0);

  const animatedStyles: Animated.WithAnimatedObject<ViewStyle> = {
    transform: [
      {translateX: Animated.multiply(-2 / 3, animation)},
      {translateY: animation},
    ],
  };
  // const animatedStyles = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       {translateX: (animation.value * -2) / 3},
  //       {translateY: animation.value},
  //     ],
  //   };
  // });

  const changeAnimationValue = useCallback(() => {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 5,
        useNativeDriver: true,
        duration: 100,
      }),
      Animated.spring(animation, {
        toValue: 0,
        useNativeDriver: true,
        tension: 45,
        friction: 5,
        velocity: 100,
      }),
    ]).start();
    // animation.value = withSequence(withSpring(0, {velocity: 100})); // ?????
  }, [animation]);

  useEffect(() => {
    changeAnimationValue();
  }, [changeAnimationValue, count]);

  return (
    <View
      style={[
        styles.buttonWrapper,
        Platform.select({ios: {bottom: bottom === 0 ? 16 : bottom + 4}}),
      ]}>
      <Pressable
        onPress={onPress}
        android_ripple={{color: colors.activePrimary}}
        style={({pressed}) => [
          styles.button,
          pressed && Platform.select({ios: styles.pressed}),
        ]}>
        <MaterialIcons name="shopping-basket" color="#fff" size={24} />
        <Animated.View style={[styles.badge, animatedStyles]}>
          <Text style={styles.badgeText}>{count}</Text>
        </Animated.View>
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
    ...globalStyles.shadow,
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
    top: 8,
    right: 5,
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
