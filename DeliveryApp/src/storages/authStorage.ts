import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCESS_TOKEN = 'ACCESS_TOKEN';
const REFRESH_TOKEN = 'REFRESH_TOKEN';

const authStorage = {
  async getAccessToken() {
    try {
      const rawData = await AsyncStorage.getItem(ACCESS_TOKEN);

      if (!rawData) {
        return null;
      }

      return JSON.parse(rawData) as string;
    } catch (err) {
      throw new Error('Access Token 불러오기에 실패하였습니다.');
    }
  },

  async setAccessToken(accessToken: string) {
    try {
      await AsyncStorage.setItem(ACCESS_TOKEN, JSON.stringify(accessToken));
    } catch (err) {
      throw new Error('Access Token 저장에 실패하였습니다.');
    }
  },

  async getRefreshToken() {
    try {
      const rawData = await AsyncStorage.getItem(REFRESH_TOKEN);

      if (!rawData) {
        return null;
      }

      return JSON.parse(rawData) as string;
    } catch (err) {
      throw new Error('Refresh Token 불러오기에 실패하였습니다.');
    }
  },

  async setRefreshToken(refreshToken: string) {
    try {
      await AsyncStorage.setItem(REFRESH_TOKEN, JSON.stringify(refreshToken));
    } catch (err) {
      throw new Error('Refresh Token 저장에 실패하였습니다.');
    }
  },

  async clear() {
    await Promise.all([
      AsyncStorage.removeItem(ACCESS_TOKEN),
      AsyncStorage.removeItem(REFRESH_TOKEN),
    ]);
  },
};

export default authStorage;
