import LoginScreen from '@/screens/LoginScreen';
import RestaurantDetailScreen from '@/screens/RestaurantDetailScreen';
import OrderCompleteScreen from '@/screens/OrderCompleteScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTab from './MainTab';
import {RootStackParamList} from './routes.types';
import {useRecoilValue} from 'recoil';
import {userState} from '@/atoms/user';
import MainTabHeader from '@/components/MainTabHeader';
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
              header: Header,
            }}
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

const Header = () => <MainTabHeader />;

export default RootStack;
