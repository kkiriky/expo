import {StatusBar} from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './routes/RootStack';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />

      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </>
  );
}
