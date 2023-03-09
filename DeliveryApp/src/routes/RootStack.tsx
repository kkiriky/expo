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
import BasketScreen from '@/screens/BasketScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  const user = useRecoilValue(userState);

  useInitialize();
  useIntercept();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerTitleStyle: {fontWeight: '600'},
        headerTitleAlign: 'center',
        headerTintColor: '#000',

        headerBackTitleVisible: false,
      }}>
      {user ? (
        <>
          <Stack.Screen
            name="MainTab"
            component={MainTab}
            options={{
              headerTitle: 'Delivery',
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name="RestaurantDetail"
            component={RestaurantDetailScreen}
            options={{
              headerTitle: '',
              // headerLeft: HeaderBack
            }}
          />
          <Stack.Screen
            name="Basket"
            component={BasketScreen}
            options={{
              headerTitle: '장바구니',
              // headerLeft: HeaderBack
            }}
          />
          <Stack.Screen
            name="OrderComplete"
            component={OrderCompleteScreen}
            options={{headerShown: false}}
          />
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
