import {StyleSheet, View, ActivityIndicator} from 'react-native';
import React from 'react';
import {colors} from '@/common/constants/colors';

interface ListLoadingProps {
  isLoading: boolean;
}

const ListLoading = ({isLoading}: ListLoadingProps) => {
  if (!isLoading) {
    return <View />;
  }

  return (
    <ActivityIndicator
      color={colors.primary}
      size="large"
      style={styles.loading}
    />
  );
};

export default ListLoading;

const styles = StyleSheet.create({
  loading: {
    paddingVertical: 28,
  },
});
