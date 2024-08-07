import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import ScheduleHeader from '../components/MySchedules/ScheduleHeader'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import UserInstance from '../components/Admin/UserInstance';
import Profile from '../../assets/images/profilePic.png';
import UserDetails from '../components/Admin/UserDetails';

const AdminUsers = () => {
    const insets = useSafeAreaInsets();
    const sampleUsers = [
        {
            name: "John Doe",
            profile: Profile,
            gender: "Male",
        },
        {
            name: "Emily Watson",
            profile: Profile,
            gender: "Female",
        },
        {
            name: "Gojo Satoru",
            profile: Profile,
            gender: "Male"
        }]

  return (
    <SafeAreaView className="bg-primary h-full relative" style={{ paddingTop: insets.top }}>
      <ScheduleHeader title="Your Users List" />
      <ScrollView>
        <View className="flex flex-col px-2">
          {sampleUsers.map((user,index) => (
            <UserInstance key={index} {...user} index={index} />
          ))}
        </View>
      </ScrollView>
        <UserDetails/>

    </SafeAreaView>
  )
}

export default AdminUsers