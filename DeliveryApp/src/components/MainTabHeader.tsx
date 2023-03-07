import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const MainTabHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delivery</Text>
    </View>
  );
};

export default MainTabHeader;

const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
});
