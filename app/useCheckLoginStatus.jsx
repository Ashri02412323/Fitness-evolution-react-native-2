import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { checkIfLoggedIn, getToken } from '../lib/Users/User'; // Adjust the import path as needed
import { useGlobalContext } from '../contexts/GlobalProvider';
import { ActivityIndicator, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';

const useCheckLoginStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [delayCompleted, setDelayCompleted] = useState(false);
  const { setUser, setToken } = useGlobalContext();
  const [randomNum, setRandomNum] = useState(null);
  const [selected,setSelected] = useState(null)

  useEffect(() => {
    if (randomNum === null) return;
    setSelected(loadingInstances[randomNum]);
  }, [randomNum]);
  // Usage
  useEffect(() => {
    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    setRandomNum(getRandomInt(0, 4));
  }, []);

  const loadingInstances = [
    {
      id: 1,
      text: 'Loading your profile... Get warm up with some ball stretches!',
      lottie: require('../assets/Lotties/exercise2.json'),
      speed: 1,
    },
    {
      id: 2,
      text: "Preparing your profile... Now's a good time to stretch out those legs!",
      lottie: require('../assets/Lotties/exercise1.json'),
      speed: 1,
    },
    {
      id: 3,
      text: 'Hang tight... warm up yourself by doing some stretches',
      lottie: require('../assets/Lotties/exercise3.json'),
      speed: 0.75,
    },
    {
      id: 4,
      text: 'Preparing your profile... Drop down and power through some push-ups!',
      lottie: require('../assets/Lotties/exercise4.json'),
      speed: 1.5,
    },
    {
      id: 5,
      text: 'Almost there... Stay active with some energizing squat kicks!',
      lottie: require('../assets/Lotties/exercise5.json'),
      speed: 1,
    },
  ];


  useEffect(() => {
    SplashScreen.preventAutoHideAsync();

    const checkLoginStatus = async () => {
      const loggedIn = await checkIfLoggedIn(setUser);
      setIsLoggedIn(loggedIn);
      if (loggedIn) {
        const token = await getToken();
        setToken(token);
      }
    };

    checkLoginStatus();

    // Introduce a 3-second delay
    // setTimeout(() => {
    setDelayCompleted(true);
    SplashScreen.hideAsync();
    // }, 3000);
  }, []);

  const NotLoggedInComponent = (
    <View className="flex items-center justify-center h-full flex-col gap-2">
      <View className="bg-primary absolute top-0 left-0 w-full h-full z-0" />
      {
      selected &&
      <>
      <LottieView
        source={selected.lottie}
        autoPlay
        loop
        style={{ width: 250, height: 200 }}
        speed={selected.speed}
      />
      <Text className="text-white font-dm_Regular text-lg w-[75%] text-center">
        {selected.text}
      </Text>
      </>
      }
    </View>
  );

  return { isLoggedIn, delayCompleted, NotLoggedInComponent };
};

export default useCheckLoginStatus;