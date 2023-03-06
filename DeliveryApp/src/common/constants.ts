import {Platform} from 'react-native';

export const colors = {
  primary: '#22a45d',
  activePrimary: '#0fba5d',
  bodyText: '#868686',
  inputBackground: '#fbfbfb',
  inputBorder: '#f3f2f2',
};

const localhost = Platform.OS === 'android' ? '10.0.2.2' : '127.0.0.1';
export const baseUrl = `http://${localhost}:3000`;

export const networkErrorMessage =
  '네크워크 문제로 인해 요청에 실패했습니다.\n잠시 후에 시도해주세요.';
