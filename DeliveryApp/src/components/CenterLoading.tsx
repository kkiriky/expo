import {StyleSheet, ActivityIndicator, View} from 'react-native';
import React from 'react';
import {colors} from '@/common/constants/colors';

const CenterLoading = () => {
  return (
    <View style={styles.layout}>
      <ActivityIndicator color={colors.primary} size="large" />
    </View>
  );
};

export default CenterLoading;

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
