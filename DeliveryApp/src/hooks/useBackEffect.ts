import {toastShowOptions} from '@/components/toast/toastConfig';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useRef} from 'react';
import {BackHandler} from 'react-native';
import Toast from 'react-native-toast-message';

const useBackEffect = () => {
  // const navigation =
  //   useNavigation<RootStackScreenProps<'MainTab' | 'Login'>['navigation']>();

  const canExit = useRef(false);
  const backAction = useCallback(() => {
    if (!canExit.current) {
      Toast.show({
        ...toastShowOptions,
        text1: '한 번 더 누르면 종료됩니다.',
      });
      canExit.current = true;
      return true;
    }

    // 앱을 종료시킬 때, 이전에 남아있던 스택 초기화
    // navigation.reset({index: 0, routes: [{name: 'MainTab'}]});
    // 토스트가 사라지기 전에, 앱을 종료시키면 앱을 다시 실행시켰을 때 토스트가 남아있기 때문에 확실히 없애기
    // Toast.hide();
    BackHandler.exitApp();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => {
        backHandler.remove();
        canExit.current = false;
      };
    }, [backAction]),
  );
};

export default useBackEffect;
