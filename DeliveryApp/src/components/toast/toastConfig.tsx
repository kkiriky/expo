import globalStyles from '@/styles/globalStyles';
import {StyleSheet, Text, View} from 'react-native';
import {
  BaseToast,
  BaseToastProps,
  ErrorToast,
  SuccessToast,
  ToastShowParams,
} from 'react-native-toast-message';
import {colors} from '../../common/constants/colors';

const toastConfig = {
  success: CustomSuccessToast,
  error: CustomErrorToast,
  // info

  warn: WarnToast,
  my: MyToast,
};

export const toastShowOptions: ToastShowParams = {
  type: 'my',
  position: 'bottom',
  visibilityTime: 2000,
};

// interface CustomToastProps extends BaseToastProps{

// }

function CustomSuccessToast(props: BaseToastProps) {
  return (
    <SuccessToast
      {...props}
      style={styles.succesBorder}
      text1Style={styles.text1Style}
      text2Style={styles.text2Style}
    />
  );
}

function CustomErrorToast(props: BaseToastProps) {
  return (
    <ErrorToast
      {...props}
      style={styles.errorBorder}
      text1Style={styles.text1Style}
      text2Style={styles.text2Style}
    />
  );
}

function WarnToast(props: BaseToastProps) {
  return (
    <BaseToast
      {...props}
      style={styles.warnBorder}
      // contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={styles.text1Style}
      text2Style={styles.text2Style}
    />
  );
}

function MyToast({text1}: BaseToastProps) {
  return (
    <View style={styles.myToastContainer}>
      <Text style={styles.myToastText}>{text1}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  succesBorder: {
    borderLeftColor: colors.primary,
  },
  errorBorder: {
    borderLeftColor: 'red',
  },
  warnBorder: {
    borderLeftColor: 'orange',
  },
  text1Style: {
    fontSize: 14,
    fontWeight: '600',
  },
  text2Style: {
    fontSize: 12,
    fontWeight: '500',
  },
  //
  myToastContainer: {
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
    paddingVertical: 16,
    paddingHorizontal: 24,
    ...globalStyles.shadow,
  },
  myToastText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default toastConfig;
