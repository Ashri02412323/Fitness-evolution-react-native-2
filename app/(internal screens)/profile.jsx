import { View, Text, SafeAreaView, Pressable, ScrollView, RefreshControl } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ScheduleHeader from '../components/MySchedules/ScheduleHeader';
import { useGlobalContext } from '../../contexts/GlobalProvider';
import CustomButton from '../components/CustomButton';
import Feather from '@expo/vector-icons/Feather';
import InfoInstance from '../components/Profile/InfoInstance';
import ProfileDefault from '../components/Profile/ProfileDefault';

import { router } from 'expo-router';
import { useScheduleContext } from '@/contexts/ScheduleProvider';

const profile = () => {
    const insets = useSafeAreaInsets();
    const {userName,userEmail,userRole,userAge,userGender} = useGlobalContext();
    const {profileRefetch, setProfileRefetch} = useScheduleContext()
    const onRefresh = () => {
        setProfileRefetch(true);
      };
  return (
    <SafeAreaView className="bg-primary h-full" style={{ paddingTop: insets.top }}>
        <ScrollView className="h-full"
        refreshControl={
            <RefreshControl refreshing={profileRefetch} onRefresh={onRefresh} />
          }
        >
            
        <ScheduleHeader title={"My Profile"} isProfile isThreeDots />
        <View className="flex items-center justify-start flex-col mt-4">
            <ProfileDefault sizeClass={"h-40 w-40"} />
            <CustomButton title="Update Profile" handlePress={()=>{
                router.push("/UpdateProfile")
            }} isDetail={true}
            customStyle={"bg-primary border border-[#008FFF]"}
            textStyle={"text-[#008FFF]"}
            endIcon={<Feather name="edit" size={24} color="#008FFF" />}
                />

            <View className="flex flex-col items-center mx-auto border border-stroke_38 border-1 rounded-lg px-4 w-[90%] mt-4 py-2">
                <InfoInstance title="Full Name" value={userName ?? "No Name"} />
                <InfoInstance title="Email" value={userEmail ?? "No Email"} />
                <InfoInstance title="Role" value={userRole ?? "user"}  />
                <InfoInstance title="Gender" value={userGender ?? "--"}  />
                <InfoInstance title="Age" value={userAge ?? "--"} isLast={true} />
            </View>
        </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default profile