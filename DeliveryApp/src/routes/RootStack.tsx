import LoginScreen from '@/screens/LoginScreen';
import RestaurantDetailScreen from '@/screens/RestaurantDetailScreen';
import OrderCompleteScreen from '@/screens/OrderCompleteScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTab from './MainTab';
import {RootStackParamList} from './routes.types';
import {useRecoilValue} from 'recoil';
import {userState} from '@/atoms/user';
import {useIntercept} from '@/hooks/useIntercept';
import {useInitialize} from '@/hooks/useInitialize';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  const user = useRecoilValue(userState);

  useInitialize();
  useIntercept();

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            name="MainTab"
            component={MainTab}
            options={{
              headerTitle: 'Delivery',
              headerShadowVisible: false,
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="RestaurantDetail"
            component={RestaurantDetailScreen}
            options={{
              headerShadowVisible: false,
              headerTitle: '',
              headerTitleStyle: {fontWeight: '600'},
            }}
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
