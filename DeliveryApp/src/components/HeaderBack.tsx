import {Platform, Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {RootStackScreenProps} from '@/routes/routes.types';
import Icon from '@expo/vector-icons/Feather';

const HeaderBack = () => {
  const navigation =
    useNavigation<RootStackScreenProps<'MainTab'>['navigation']>();

  if (Platform.OS === 'android') {
    return null;
  }

  return (
    <Pressable
      onPress={navigation.goBack}
      style={({pressed}) => [styles.button, pressed && {opacity: 0.3}]}>
      <Icon name="chevron-left" size={32} />
      <Text style={styles.backTitle}>뒤로가기</Text>
    </Pressable>
  );
};

export default HeaderBack;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -10,
  },
  backTitle: {
    fontWeight: '600',
  },
});
