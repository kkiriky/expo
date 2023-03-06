import {StyleSheet, Text, Pressable, View, Platform} from 'react-native';
import React from 'react';
import {colors} from '@/common/constants';

interface SignButtonProps {
  text: string;
  onPress: () => void;
  isSecondary?: boolean;
  hasMarginBottom?: boolean;
}

const SignButton = ({
  text,
  onPress,
  isSecondary,
  hasMarginBottom,
}: SignButtonProps) => {
  return (
    <View
      style={[
        styles.buttonWrapper,
        isSecondary && styles.whiteBackground,
        hasMarginBottom && styles.marginBottom,
      ]}>
      <Pressable
        onPress={onPress}
        android_ripple={{color: !isSecondary ? colors.activePrimary : '#eee'}}
        style={({pressed}) => [
          styles.button,
          pressed &&
            Platform.select({
              ios: {
                backgroundColor: !isSecondary ? colors.activePrimary : '#eee',
              },
            }),
        ]}>
        <Text style={[styles.text, isSecondary && styles.blackText]}>
          {text}
        </Text>
      </Pressable>
    </View>
  );
};

export default SignButton;

const styles = StyleSheet.create({
  buttonWrapper: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    ...Platform.select({
      android: {
        overflow: 'hidden',
        elevation: 3,
      },
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 10},
        shadowOpacity: 0.7,
        shadowRadius: 5,
      },
    }),
  },
  button: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  text: {
    color: '#fff',
    fontWeight: '600',
  },
  marginBottom: {
    marginBottom: 16,
  },
  whiteBackground: {
    backgroundColor: '#fff',
  },
  blackText: {
    color: '#000',
  },
});