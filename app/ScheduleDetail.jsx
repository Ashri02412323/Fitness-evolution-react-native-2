import { useGlobalSearchParams } from 'expo-router';
import { View, Text, Image, SafeAreaView, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ScheduleHeader from './components/MySchedules/ScheduleHeader';
import DetailInstance from './components/MySchedules/DetailInstance';
import CustomButton from './components/CustomButton';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const ScheduleDetail = () => {
  const { title, date, time, link, trainer, isCompleted, profileImg,descr } = useGlobalSearchParams();
  const insets = useSafeAreaInsets();
  useEffect(()=>{
    // console.log("profileImg: ",profileImg)
    console.log("isCompleted detail: ", typeof isCompleted)
  },[isCompleted])
  return (
    <SafeAreaView className="bg-primary h-full" style={{ paddingTop: insets.top }}>
      <ScrollView className="h-full"> 
        <ScheduleHeader isDetail title={"Schedule Details"} />
        <Image source={profileImg} className="h-32 w-32 rounded-full mx-auto mt-8" />
        <Text className="text-white_87 font-dm_Medium text-2xl capitalize text-center mt-4 px-4">{title}</Text>
        <View className="mt-6 px-4">
          <DetailInstance title="Date" value={date} />
          <DetailInstance title="Time" value={time} />
          { (!isCompleted || isCompleted === "false") &&
          <DetailInstance title="Link" value={link} isLink={true}/>
        }
          <DetailInstance title="Trainer" value={trainer}/>
          <DetailInstance title="Description" value={descr ?? "No Description Provided"} isLast={true}/>
        </View>
        <View className="flex flex-row items-center justify-center mt-8 mb-8">
          <CustomButton title="Request Reschedule" onPress={()=>{}} isDetail={true} 
          customStyle={"bg-mint-87"}
          endIcon={<MaterialIcons name="restart-alt" 
            size={24} color="#fff" />}
            />
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScheduleDetail;