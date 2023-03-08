import {
  StyleSheet,
  Text,
  Pressable,
  View,
  Platform,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {colors} from '@/common/constants/colors';

interface SignButtonProps {
  text: string;
  onPress: () => void;
  isSecondary?: boolean;
  hasMarginBottom?: boolean;
  isLoading: boolean;
  height?: number;
  fontSize?: number;
}

const CustomButton = ({
  text,
  onPress,
  isSecondary,
  hasMarginBottom,
  isLoading,
  height,
  fontSize,
}: SignButtonProps) => {
  return (
    <View
      style={[
        styles.buttonWrapper,
        isSecondary && styles.whiteBackground,
        hasMarginBottom && styles.marginBottom,
        isLoading && styles.loadingBackground,
      ]}>
      <Pressable
        onPress={isLoading ? null : onPress}
        android_ripple={
          isLoading
            ? null
            : {color: !isSecondary ? colors.activePrimary : '#eee'}
        }
        style={({pressed}) => [
          styles.button,
          !!height && {height},
          !isLoading &&
            pressed &&
            Platform.select({
              ios: {
                backgroundColor: !isSecondary ? colors.activePrimary : '#eee',
              },
            }),
        ]}>
        {isLoading ? (
          <ActivityIndicator color="#fff" size={32} />
        ) : (
          <Text
            style={[
              styles.text,
              isSecondary && styles.blackText,
              !!fontSize && {fontSize},
            ]}>
            {text}
          </Text>
        )}
      </Pressable>
    </View>
  );
};

export default CustomButton;

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
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.2,
        shadowRadius: 3,
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
  loadingBackground: {
    backgroundColor: '#ccc',
  },
});
