import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { logoutUser } from '../../lib/Users/User';
import HomeHeader from '../components/Home/HomeHeader';
import { useCheckLoginStatus } from '../useCheckLoginStatus'; 
import SchedulesCarousal from '../components/Home/SchedulesCarousal';
import Blogs from '../components/Home/Blogs';

export default function Home() {
  const insets = useSafeAreaInsets();
  const { isLoggedIn, delayCompleted, NotLoggedInComponent } = useCheckLoginStatus();

  if (isLoggedIn === null) {
    return NotLoggedInComponent;
  }
  return (
    <SafeAreaView className="bg-primary h-full" style={{ paddingTop: insets.top, flex: 1 }}>
      <ScrollView className=" pb-0">
        <HomeHeader />
        <SchedulesCarousal />
        <Blogs/>
      </ScrollView>
    </SafeAreaView>
  );
}