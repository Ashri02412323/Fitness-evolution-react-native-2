import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import profile from '../../../assets/images/profilePic.png'
import { router } from 'expo-router'

const handleNavigate = (title, date, time, link, userName, noLink, profileImg,descr,isUser,isProfileLink,status,id) => {
    router.push({pathname: "/ScheduleDetail", params: {title, date, time, link, userName, noLink,profileImg,descr,isUser,isProfileLink,status,id}})
}
const ScheduleInstance = ({title,date,time,link,userName,noLink,profileImg,descr,isUser,status,id }) => {
    const handlePress = () => {
        handleNavigate(title,date,time,link,userName,noLink,profileImg??profile,descr,isUser,profileImg?true:false,status,id)
    }
  return (  
    <Pressable onPress={handlePress} className="flex flex-row bg-secondary w-full items-center justify-start p-2 pl-0 rounded-lg mb-2">
         <View className="w-[30%] flex items-center justify-center">
          {profileImg ? <Image source={{uri:profileImg}} className="h-16 w-16 rounded-full" />:
          <Image source={profile} className="h-16 w-16 rounded-full" />
          }
         </View>
         <View className="flex flex-col gap-y-[4px] w-[70%]">
            <Text className="text-white_87 font-dm_Medium text-base capitalize" numberOfLines={1}>{title}</Text>
            <View className="flex flex-col gap-y-[2px]">
              <Text className="text-white_60 font-inter_Regular text-md">{date}, {time}</Text>
              {!noLink && <Text className=" text-blue-500 font-inter_Regular text-md" numberOfLines={1}
              style={{ flexShrink: 1 }}
              >{link}</Text>}
              <Text className="text-white_38 font-inter_Regular text-sm">{isUser ?"Trainer: ": "User: "}{userName}</Text>
            </View>
        </View> 
    </Pressable>
  )
}

export default ScheduleInstance