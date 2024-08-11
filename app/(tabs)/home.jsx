import { View, Text, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeHeader from '../components/Home/HomeHeader';
import SchedulesCarousal from '../components/Home/SchedulesCarousal';
import Blogs from '../components/Home/Blogs';
import useCheckLoginStatus from '../useCheckLoginStatus';
import { useScheduleContext } from '../../contexts/ScheduleProvider';

function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { isLoggedIn, NotLoggedInComponent } = useCheckLoginStatus();
  const { refreshing, setRefreshing  } = useScheduleContext();
  if (isLoggedIn === null) {
    return NotLoggedInComponent;
  }
  const onRefresh = () => {
    setRefreshing(true);
  };
  return (
    <SafeAreaView className="bg-primary h-full" style={{ paddingTop: insets.top, flex: 1 }}>
        <HomeHeader />
        <ScrollView className=" pb-0"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
        <SchedulesCarousal />
        <Blogs/>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen