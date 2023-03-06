import {StyleSheet} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import RootStack from './routes/RootStack';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};

export default function App() {
  return (
    <>
      <StatusBar style="auto" />

      <NavigationContainer theme={theme}>
        <SafeAreaProvider>
          <SafeAreaView style={styles.fullscreen}>
            <RootStack />
          </SafeAreaView>
        </SafeAreaProvider>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
  },
});
