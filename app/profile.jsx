import { View, Text, SafeAreaView, Pressable, ScrollView } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ScheduleHeader from './components/MySchedules/ScheduleHeader';
import { useGlobalContext } from '../contexts/GlobalProvider';
import CustomButton from './components/CustomButton';
import Feather from '@expo/vector-icons/Feather';
import InfoInstance from './components/Profile/InfoInstance';

const profile = () => {
    const insets = useSafeAreaInsets();
    const {firstLetter,user} = useGlobalContext();
  return (
    <SafeAreaView className="bg-primary h-full" style={{ paddingTop: insets.top }}>
        <ScrollView className="h-full">
            
        <ScheduleHeader title={"My Profile"} isProfile />
        <View className="flex items-center justify-start flex-col mt-4">
            <View className={`bg-lava h-40 w-40 flex-row justify-center items-center rounded-full mb-4`}
                // style={{ margin: 0 }}
                >
                <Text className="text-white font-pop_Medium text-[120px] relative bottom-2 mt-0">{firstLetter ?? 'A'}</Text>
            </View>
            <CustomButton title="Update Profile" onPress={()=>{}} isDetail={true}
            customStyle={"bg-primary border border-[#008FFF]"}
            textStyle={"text-[#008FFF]"}
            endIcon={<Feather name="edit" size={24} color="#008FFF" />}
                />

            <View className="flex flex-col items-center mx-auto border border-stroke_38 border-1 rounded-lg px-4 w-[90%] mt-6 py-2">
                <InfoInstance title="Full Name" value={user?.fullName ?? "No Name"} />
                <InfoInstance title="Email" value={user?.email ?? "No Email"} />
                <InfoInstance title="Role" value={user?.role ?? "user"}  />
                <InfoInstance title="Gender" value={user?.gender ?? "--"}  />
                <InfoInstance title="Age" value={user?.age ?? "--"} isLast={true} />
            </View>
        </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default profile