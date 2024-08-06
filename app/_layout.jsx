import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import NetInfo from '@react-native-community/netinfo';
import NoInternetConnection from './NoInternetConnection'; // Adjust the path as necessary
import GlobalProvider from '../contexts/GlobalProvider'; // Adjust the path as necessary
// Prevent the splash screen from auto-hiding before asset loading is complete.
import { NativeWindStyleSheet } from 'nativewind';
import FormProvider from '../contexts/FormProivder';

SplashScreen.preventAutoHideAsync();

NativeWindStyleSheet.setOutput({
    default: "native",
});
export default function RootLayout() {
  const [loaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Inter_28pt-Bold": require("../assets/fonts/Inter_28pt-Bold.ttf"),
    "Inter_28pt-Regular": require("../assets/fonts/Inter_28pt-Regular.ttf"),
    "Inter_28pt-Medium": require("../assets/fonts/Inter_28pt-Medium.ttf"),
    "Inter_28pt-SemiBold": require("../assets/fonts/Inter_28pt-SemiBold.ttf"),
    "Inter_28pt-Light": require("../assets/fonts/Inter_28pt-Light.ttf"),
    "DMSans-Bold": require("../assets/fonts/DMSans-Bold.ttf"),
    "DMSans-Regular": require("../assets/fonts/DMSans-Regular.ttf"),
    "DMSans-Medium": require("../assets/fonts/DMSans-Medium.ttf"),
    "DMSans-SemiBold": require("../assets/fonts/DMSans-SemiBold.ttf"),
    "DMSans-Light": require("../assets/fonts/DMSans-Light.ttf"),
    "Cinzel-Bold": require("../assets/fonts/Cinzel-Bold.ttf"),
  });

  const [isConnected, setIsConnected] = useState(true);
  const [delayCompleted, setDelayCompleted] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected ?? false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (loaded) {
      setTimeout(() => {
        setDelayCompleted(true);
        SplashScreen.hideAsync();
      }, 3000); // 3 seconds delay
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  if (!isConnected) {
    return <NoInternetConnection />;
  }

  return (
    <GlobalProvider>
      <FormProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name='NoInternetConnection' options={{
            headerShown: false,
          }} />
          <Stack.Screen name='ScheduleDetail' options={{
            headerShown: false,
          }} />
          <Stack.Screen name='profile' options={{
            headerShown: false,
          }} />
          <Stack.Screen name='ChatScreen' options={{
            headerShown: false,
          }} />
        </Stack>
    </FormProvider>
    </GlobalProvider>
  );
}