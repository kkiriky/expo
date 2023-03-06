import LoginScreen from '@/screens/LoginScreen';
import RestaurantDetailScreen from '@/screens/RestaurantDetailScreen';
import OrderCompleteScreen from '@/screens/OrderCompleteScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTab from './MainTab';
import {RootStackParamList} from './routes.types';
import {useRecoilValue} from 'recoil';
import {userState} from '@/atoms/user';
import {useEffect} from 'react';
import authStorage from '@/storages/authStorage';
import {applyToken} from '@/api';
import {useGetMe} from '@/hooks/useUser';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  const user = useRecoilValue(userState);
  const {mutate: getMe} = useGetMe();

  useEffect(() => {
    const init = async () => {
      const accessToken = await authStorage.getAccessToken();
      if (!accessToken) {
        return;
      }

      applyToken(accessToken);
      getMe();
    };
    init();
  }, [getMe]);

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            name="MainTab"
            component={MainTab}
            options={{title: 'Kkiri Delivery'}}
          />
          <Stack.Screen
            name="RestaurantDetail"
            component={RestaurantDetailScreen}
          />
          <Stack.Screen name="OrderComplete" component={OrderCompleteScreen} />
        </>
      ) : (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
      )}
    </Stack.Navigator>
  );
};

export default RootStack;
