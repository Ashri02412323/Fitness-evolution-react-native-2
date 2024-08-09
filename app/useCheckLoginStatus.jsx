import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { checkIfLoggedIn, getToken } from '../lib/Users/User'; // Adjust the import path as needed
import { useGlobalContext } from '../contexts/GlobalProvider';
import { ActivityIndicator, Text, View } from 'react-native';

export const useCheckLoginStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [delayCompleted, setDelayCompleted] = useState(false);
  const { setUser,setToken } = useGlobalContext();

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();

    const checkLoginStatus = async () => {
      const loggedIn = await checkIfLoggedIn(setUser);
      setIsLoggedIn(loggedIn);
      if(loggedIn){
        const token = await getToken();
        setToken(token);
      }
    };

    checkLoginStatus();

    // Introduce a 3-second delay
    setTimeout(() => {
      setDelayCompleted(true);
      SplashScreen.hideAsync();
    }, 3000);
  }, []);

  const NotLoggedInComponent = (
    <View className="flex items-center justify-center h-full flex-col gap-2">
      <View className="bg-primary absolute top-0 left-0 w-full h-full z-0" />
      <ActivityIndicator size="large" className="text-mint-100" />
      <Text className="text-white font-dm_Regular text-lg">Fetching Your Profile...</Text>
    </View>
  );

  return { isLoggedIn, delayCompleted, NotLoggedInComponent };
};