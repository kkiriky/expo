import OrdersScreen from '@/screens/mainTab/OrdersScreen';
import ProductsScreen from '@/screens/mainTab/ProductsScreen';
import ProfileScreen from '@/screens/mainTab/ProfileScreen';
import RestaurantsScreen from '@/screens/mainTab/RestaurantsScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainTabParamList} from './routes.types';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {colors} from '@/common/constants';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {paddingTop: 4, paddingBottom: 8, height: 50},
        tabBarActiveTintColor: colors.prmary,
        tabBarLabelStyle: {fontWeight: '600'},
        headerShown: false,
      }}>
      <Tab.Screen
        name="Restaurants"
        component={RestaurantsScreen}
        options={{
          tabBarIcon: HomeIcon,
          tabBarLabel: '홈',
        }}
      />
      <Tab.Screen
        name="Products"
        component={ProductsScreen}
        options={{
          tabBarIcon: ProductIcon,
          tabBarLabel: '음식',
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarIcon: OrderIcon,
          tabBarLabel: '주문',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ProfileIcon,
          tabBarLabel: '프로필',
        }}
      />
    </Tab.Navigator>
  );
};

interface IconProps {
  focused: boolean;
  color: string;
  size: number;
}

const HomeIcon = ({color}: IconProps) => (
  <MaterialCommunityIcons name="home-outline" color={color} size={24} />
);

const ProductIcon = ({color}: IconProps) => (
  <MaterialIcons name="fastfood" color={color} size={24} />
);

const OrderIcon = ({color}: IconProps) => (
  <MaterialIcons name="receipt-long" color={color} size={24} />
);

const ProfileIcon = ({color}: IconProps) => (
  <MaterialIcons name="person-outline" color={color} size={24} />
);

export default MainTab;
