import { View, Text, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import React from 'react';
import ScheduleHeader from '../components/MySchedules/ScheduleHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import UserInstance from '../components/Admin/UserInstance';
import UserDetails from '../components/Admin/UserDetails';
import { useScheduleContext } from '../../contexts/ScheduleProvider';
import { useGlobalContext } from '../../contexts/GlobalProvider';

const AdminUsers = () => {
  const insets = useSafeAreaInsets();
  const { userCountLoading,chatsRefresh, setChatsRefresh } = useScheduleContext();
  const { allUsers } = useGlobalContext();
  const onRefresh = () => {
    setChatsRefresh(true);
  }
  return (
    <SafeAreaView className="bg-primary h-full relative" style={{ paddingTop: insets.top }}>
      <ScheduleHeader title="Your Users List" />
      {userCountLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#00ffbc" />
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={chatsRefresh} onRefresh={onRefresh} />
          }
        >
          <View className="flex flex-col px-2">
            {allUsers.length === 0 ? 
            <Text className="text-white text-lg text-center font-inter_Medium">No users to show</Text>
            :allUsers.map((user, index) => (
              <UserInstance key={index} index={index+1} gender={user.gender} name={user.fullName} profile={user.profileImage} age={user.age} email={user.email} role={user.role} id={user._id} />
            ))}
          </View>
        </ScrollView>
      )}
      <UserDetails />
    </SafeAreaView>
  );
};

export default AdminUsers;