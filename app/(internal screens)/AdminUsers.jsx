import { View, Text, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import React from 'react';
import ScheduleHeader from '../components/MySchedules/ScheduleHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import UserInstance from '../components/Admin/UserInstance';
import Profile from '../../assets/images/profilePic.png';
import UserDetails from '../components/Admin/UserDetails';
import { useScheduleContext } from '../../contexts/ScheduleProvider';

const AdminUsers = () => {
  const insets = useSafeAreaInsets();
  const { allUsers, userCountLoading } = useScheduleContext();

  return (
    <SafeAreaView className="bg-primary h-full relative" style={{ paddingTop: insets.top }}>
      <ScheduleHeader title="Your Users List" />
      {userCountLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#00ffbc" />
        </View>
      ) : (
        <ScrollView>
          <View className="flex flex-col px-2">
            {allUsers.map((user, index) => (
              <UserInstance key={index} index={index} gender={user.email} name={user.fullName} profile={Profile} />
            ))}
          </View>
        </ScrollView>
      )}
      <UserDetails />
    </SafeAreaView>
  );
};

export default AdminUsers;