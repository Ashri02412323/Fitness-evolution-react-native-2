import { View, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeHeader from '../components/Home/HomeHeader';
import ScheduleAttended from '../components/Admin/ScheduleAttended';
import TodaySchedule from '../components/Admin/TodaySchedule';
import DataAnalytics from '../components/Admin/DataAnalytics';
import AdminBlog from '../components/Blogs/AdminBlog';
import { useScheduleContext } from '../../contexts/ScheduleProvider';

const Admin = () => {
  const insets = useSafeAreaInsets();
  const { 
    upcomingLength, 
    completedLength, 
    requestedLength, 
    userCount, 
    upcomingLoading, 
    completedLoading, 
    requestedLoading, 
    userCountLoading, 
    refreshing, 
    setRefreshing 
  } = useScheduleContext();

  const onRefresh = () => {
    setRefreshing(true);
  };

  return (
    <SafeAreaView className="bg-primary h-full" style={{ paddingTop: insets.top }}>
      <HomeHeader />
      <ScrollView
        className="relative"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="px-4 mt-4 mb-4">
          <ScheduleAttended 
            upcomingLength={upcomingLength} 
            completedLength={completedLength} 
            upcomingLoad={upcomingLoading} 
            completedLoad={completedLoading} 
          />
          <TodaySchedule 
            upcomingLength={upcomingLength} 
            completedLength={completedLength} 
            requestedLength={requestedLength} 
            UserCount={userCount} 
            isUserLoading={userCountLoading} 
            upcomingLoad={upcomingLoading} 
            completedLoad={completedLoading} 
            requestedLoad={requestedLoading} 
          />
          <DataAnalytics 
            upcoming={upcomingLength} 
            completed={completedLength} 
            requested={requestedLength} 
          />
          <AdminBlog />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Admin;