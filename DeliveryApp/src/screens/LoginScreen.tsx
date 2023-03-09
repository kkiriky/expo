import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useCallback, useRef} from 'react';
import {colors} from '@/common/constants/colors';
import BorderedInput from '@/components/BorderedInput';
import CustomButton from '@/components/CustomButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useLogin} from '@/hooks/useAuth';
import base64 from 'react-native-base64';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Controller, useForm, SubmitHandler} from 'react-hook-form';
import globalStyles from '@/styles/globalStyles';

interface LoginForm {
  email: string;
  password: string;
}

const LoginScreen = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginForm>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const passwordRef = useRef<TextInput>(null);

  const {mutate: login, isLoading} = useLogin();

  const onSubmitEditingEmail = useCallback(() => {
    passwordRef.current?.focus();
  }, []);

  const onSubmit: SubmitHandler<LoginForm> = useCallback(
    value => {
      login(base64.encode(`${value.email}:${value.password}`));
    },
    [login],
  );

  const onSubmitEditingPassword = useCallback(() => {
    handleSubmit(onSubmit)();
  }, [handleSubmit, onSubmit]);

  return (
    <SafeAreaView>
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

        <Controller
          control={control}
          name="email"
          rules={{required: true}}
          render={({field: {value, onChange}}) => (
            <BorderedInput
              placeholder="이메일을 입력해주세요."
              keyboardType="email-address"
              returnKeyType="next"
              hasMarginBottom={!errors.email}
              value={value}
              onChangeText={onChange}
              onSubmitEditing={onSubmitEditingEmail}
              isError={!!errors.email}
            />
          )}
        />
        {errors.email && (
          <Text style={globalStyles.errorMessage}>이메일을 입력해주세요.</Text>
        )}

        <Controller
          control={control}
          name="password"
          rules={{required: true}}
          render={({field: {value, onChange}}) => (
            <BorderedInput
              placeholder="비밀번호를 입력해주세요."
              returnKeyType="join"
              secureTextEntry
              value={value}
              onChangeText={onChange}
              onSubmitEditing={onSubmitEditingPassword}
              ref={passwordRef}
              isError={!!errors.password}
            />
          )}
        />
        {errors.password && (
          <Text style={globalStyles.errorMessage}>
            비밀번호를 입력해주세요.
          </Text>
        )}

        <View style={styles.buttonGroups}>
          <CustomButton
            text="로그인"
            onPress={handleSubmit(onSubmit)}
            hasMarginBottom
            isLoading={isLoading}
          />
          <CustomButton
            text="회원가입"
            onPress={() => {}}
            isSecondary
            isLoading={false}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
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
