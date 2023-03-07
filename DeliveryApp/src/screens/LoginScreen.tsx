import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {colors} from '@/common/constants/colors';
import BorderedInput from '@/components/BorderedInput';
import SignButton from '@/components/SignButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useLogin} from '@/hooks/useAuth';
import base64 from 'react-native-base64';
import {SafeAreaView} from 'react-native-safe-area-context';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef<TextInput>(null);

  const {mutate: login, isLoading} = useLogin();

  const onSubmitEditingEmail = useCallback(() => {
    passwordRef.current?.focus();
  }, []);

  const onLogin = useCallback(() => {
    login(base64.encode(`${email}:${password}`));
  }, [email, login, password]);

  const onSubmitEditingPassword = useCallback(() => {
    onLogin();
  }, [onLogin]);

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <SafeAreaView>
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
          <SignButton
            text="로그인"
            onPress={onLogin}
            hasMarginBottom
            isLoading={isLoading}
          />
          <SignButton
            text="회원가입"
            onPress={() => {}}
            isSecondary
            isLoading={false}
          />
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    marginBottom: 8,
    fontWeight: '600',
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
