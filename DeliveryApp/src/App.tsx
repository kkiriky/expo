import {StatusBar} from 'expo-status-bar';
import RootStack from './routes/RootStack';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {RecoilRoot} from 'recoil';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import * as SplashScreen from 'expo-splash-screen';

// import {
//   useFonts,
//   NotoSansKR_100Thin,
//   NotoSansKR_300Light,
//   NotoSansKR_400Regular,
//   NotoSansKR_500Medium,
//   NotoSansKR_700Bold,
//   NotoSansKR_900Black,
// } from '@expo-google-fonts/noto-sans-kr';

SplashScreen.preventAutoHideAsync();

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
  // const [fontsLoaded] = useFonts({
  //   NotoSansKR_100Thin,
  //   NotoSansKR_300Light,
  //   NotoSansKR_400Regular,
  //   NotoSansKR_500Medium,
  //   NotoSansKR_700Bold,
  //   NotoSansKR_900Black,
  // });

  // if (!fontsLoaded) {
  //   return null;
  // }

  return (
    <>
      <StatusBar style="auto" />

      <RecoilRoot>
        <QueryClientProvider client={client}>
          <NavigationContainer theme={theme}>
            <RootStack />
          </NavigationContainer>
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}
