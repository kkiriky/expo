import {StyleSheet} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import RootStack from './routes/RootStack';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {RecoilRoot} from 'recoil';
import {QueryClient, QueryClientProvider} from 'react-query';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

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

      <RecoilRoot>
        <QueryClientProvider client={client}>
          <NavigationContainer theme={theme}>
            <SafeAreaProvider>
              <SafeAreaView style={styles.fullscreen}>
                <RootStack />
              </SafeAreaView>
            </SafeAreaProvider>
          </NavigationContainer>
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
  },
});
