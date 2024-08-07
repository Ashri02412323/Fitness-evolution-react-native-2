import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeHeader from '../components/Home/HomeHeader';
import ScheduleAttended from '../components/Admin/ScheduleAttended';
import TodaySchedule from '../components/Admin/TodaySchedule';
import DataAnalytics from '../components/Admin/DataAnalytics';
import UserDetails from '../components/Admin/UserDetails';
import AdminBlog from '../components/Blogs/AdminBlog';

const Admin = () => {
    const insets = useSafeAreaInsets();
    const upcoming = 5;
    const completed = 3;
    const total = upcoming + completed;
  return (
    <SafeAreaView className="bg-primary h-full" style={{ paddingTop: insets.top }}>
      <HomeHeader />
      <ScrollView className="relative">
        <View className="px-4 mt-4 mb-4">
          <ScheduleAttended/>
          <TodaySchedule/>
          <DataAnalytics/>
          <AdminBlog/>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Admin