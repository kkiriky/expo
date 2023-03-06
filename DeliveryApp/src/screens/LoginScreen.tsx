import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {colors} from '@/common/constants';
import BorderedInput from '@/components/BorderedInput';
import SignButton from '@/components/SignButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef<TextInput>(null);

  const onSubmitEditingEmail = useCallback(() => {
    passwordRef.current?.focus();
  }, []);

  const onLogin = useCallback(() => {
    console.log({email, password});
  }, [email, password]);

  const onSubmitEditingPassword = useCallback(() => {
    onLogin();
  }, [onLogin]);

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>환영합니다!</Text>
      <Text style={styles.subText}>
        {
          '이메일과 비밀번호를 입력해서 로그인 해주세요!\n오늘도 성공적인 주문이 되길 :)'
        }
      </Text>

      <View style={styles.imageWrapper}>
        <Image
          source={require('@/assets/img/misc/logo.png')}
          style={styles.image}
          resizeMode={'cover'}
        />
      </View>

      <BorderedInput
        placeholder="이메일을 입력해주세요."
        keyboardType="email-address"
        returnKeyType="next"
        hasMarginBottom
        value={email}
        onChangeText={setEmail}
        onSubmitEditing={onSubmitEditingEmail}
      />
      <BorderedInput
        placeholder="비밀번호를 입력해주세요."
        returnKeyType="join"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        onSubmitEditing={onSubmitEditingPassword}
        ref={passwordRef}
      />

      <View style={styles.buttonGroups}>
        <SignButton text="로그인" onPress={onLogin} hasMarginBottom />
        <SignButton text="회원가입" onPress={() => {}} isSecondary />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 16,
    // paddingTop: 16,
    // paddingBottom: 16,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 8,
  },
  subText: {
    color: colors.bodyText,
    fontWeight: '600',
  },
  imageWrapper: {
    width: '80%',
    aspectRatio: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  buttonGroups: {
    marginTop: 16,
  },
});

export default LoginScreen;
