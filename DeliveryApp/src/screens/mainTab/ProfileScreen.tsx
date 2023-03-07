import {Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {colors} from '@/common/constants';
import {useLogout} from '@/hooks/useAuth';

const ProfileScreen = () => {
  const {mutate: logout} = useLogout();

  return (
    <View style={styles.layout}>
      <Pressable
        onPress={logout}
        android_ripple={{color: '#eee'}}
        style={({pressed}) => [
          styles.button,
          pressed && Platform.select({ios: styles.pressed}),
        ]}>
        <MaterialIcons name="logout" size={28} />
        <View style={styles.textContainer}>
          <Text style={[styles.text, styles.bold]}>로그아웃</Text>
          <Text style={[styles.text, styles.bold, styles.subText]}>
            계정을 로그아웃합니다.
          </Text>
        </View>
        <MaterialIcons
          name="keyboard-arrow-right"
          size={28}
          style={styles.marginLeft}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    paddingHorizontal: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  pressed: {
    backgroundColor: '#eee',
  },
  textContainer: {
    marginLeft: 12,
  },
  text: {
    fontSize: 14,
  },
  bold: {
    fontWeight: '600',
  },
  subText: {
    color: colors.bodyText,
  },
  marginLeft: {
    marginLeft: 'auto',
  },
});

export default ProfileScreen;
