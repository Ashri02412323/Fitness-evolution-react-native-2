import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import profile from '../../../assets/images/profilePic.png'
import { router } from 'expo-router'

const handleNavigate = (title, date, time, link, trainer, isCompleted, profileImg,descr) => {
    router.push({pathname: "/ScheduleDetail", params: {title, date, time, link, trainer, isCompleted,profileImg,descr}})
}
const ScheduleInstance = ({title,date,time,link,trainer,isCompleted,profileImg,descr }) => {
    const handlePress = () => {
      console.log("isCompleted in ScheduleInstance: ",typeof isCompleted)
        handleNavigate(title,date,time,link,trainer,isCompleted,profileImg??profile,descr)
    }
  return (  
    <Pressable onPress={handlePress} className="flex flex-row bg-secondary w-full items-center justify-start p-2 pl-0 rounded-lg mb-2">
         <View className="w-[30%] flex items-center justify-center">
            <Image source={profileImg ?? profile} className="h-16 w-16 rounded-full" />
         </View>
         <View className="flex flex-col gap-y-[4px] w-[70%]">
            <Text className="text-white_87 font-dm_Medium text-base capitalize" numberOfLines={1}>{title}</Text>
            <View className="flex flex-col gap-y-[2px]">
              <Text className="text-white_60 font-inter_Regular text-md">{date}, {time}</Text>
              {!isCompleted && <Text className=" text-blue-500 font-inter_Regular text-md" numberOfLines={1}
              style={{ flexShrink: 1 }}
              >{link}</Text>}
              <Text className="text-white_38 font-inter_Regular text-sm">Trainer: {trainer}</Text>
            </View>
        </View> 
    </Pressable>
  )
}

export default ScheduleInstance