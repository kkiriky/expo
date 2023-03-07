import {StyleProp, StyleSheet, Text, TextStyle} from 'react-native';
import React from 'react';
import {fonts} from '@/common/constants/fonts';

interface AppTextProps {
  children: string | number;
  style?: StyleProp<TextStyle>;
}

const AppText = ({children, style}: AppTextProps) => {
  return <Text style={[styles.defaultStyle, style]}>{children}</Text>;
};

export default AppText;

const styles = StyleSheet.create({
  defaultStyle: {
    fontFamily: fonts.NotoSansKR_400Regular,
    lineHeight: 20,
  },
});
