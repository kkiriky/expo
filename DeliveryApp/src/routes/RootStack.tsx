import LoginScreen from '@/screens/LoginScreen';
import RestaurantDetailScreen from '@/screens/RestaurantDetailScreen';
import OrderCompleteScreen from '@/screens/OrderCompleteScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTab from './MainTab';
import {RootStackParamList} from './routes.types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
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
      {/*  */}
    </Stack.Navigator>
  );
};

export default RootStack;
