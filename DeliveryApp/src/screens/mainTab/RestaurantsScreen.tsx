import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import * as SplashScreen from 'expo-splash-screen';

const RestaurantsScreen = () => {
  useEffect(() => {
    // 이후에 가게 목록 가져오기가 끝나면 스플래시 화면 숨기도록 변경
    SplashScreen.hideAsync();
  }, []);

  return (
    <View>
      <Text>RestaurantsScreen</Text>
    </View>
  );
};

export default RestaurantsScreen;
