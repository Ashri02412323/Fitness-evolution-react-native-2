import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeHeader from '../components/Home/HomeHeader';
import SchedulesCarousal from '../components/Home/SchedulesCarousal';
import Blogs from '../components/Home/Blogs';
import useCheckLoginStatus from '../useCheckLoginStatus';

function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { isLoggedIn, NotLoggedInComponent } = useCheckLoginStatus();

  if (isLoggedIn === null) {
    return NotLoggedInComponent;
  }
  return (
    <SafeAreaView className="bg-primary h-full" style={{ paddingTop: insets.top, flex: 1 }}>
        <HomeHeader />
        <ScrollView className=" pb-0">
        <SchedulesCarousal />
        <Blogs/>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen