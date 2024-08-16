import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView} from 'react-native-safe-area-context'
import ScheduleHeader from '../components/MySchedules/ScheduleHeader'
import { useGlobalSearchParams } from 'expo-router'
import AboutProfile from '../components/Profile/AboutProfile'

const UserAbout = () => {
const {name,gender,profile,index,age,role,email,id} = useGlobalSearchParams();

  return (
    <SafeAreaView className=" bg-mint-87 h-full relative">
      <ScheduleHeader title="User Details" textColor={'#fff'} isIconVisible={false}/>
      <ScrollView className="w-full px-0 mt-2 bg-primary">
        <View className=" h-[190px] w-full px-2 flex items-center justify-center">
          <View className="absolute top-0 left-0 right-0 h-[60%] bg-mint-87 rounded-b-3xl" />
          <AboutProfile sizeClass="h-[160px] w-[160px]" textStyle="text-[80px] -bottom-1" parentStyle="" name={name} profileImg={profile} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default UserAbout