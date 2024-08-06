import { View, Text,Image, Pressable } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const ChatInstance = ({user,lastMessage,profile,role,noOfMsg}) => {
    const handleNavigate = (user) => {
        router.push({pathname: "/ChatScreen", params: {user}})
    }
    return (
      <Pressable onPress={()=>{
        handleNavigate(user)
      }} className="flex flex-row items-center justify-between py-4 px-2 mb-2 relative">
        <View className="flex flex-row items-center gap-x-4">
          <View className="flex flex-col items-center justify-center">
            <Image source={profile} style={{width: 50, height: 50, borderRadius: 50}}/>
          </View>
          <View className="flex flex-col gap-y-1 justify-center relative bottom-1">
            <View className="flex flex-row gap-2 items-end justify-center ">
              <Text className="text-white_87 font-inter_Medium text-base">{user}</Text>
              <View className="relative rounded w-14 h-5 flex items-center justify-center">
                <View className={`absolute top-0 left-0 rounded w-full h-full ${role === 'Admin' ? 'bg-rose-500' : 'bg-blue-500'} opacity-20`} />
                <Text className={`${role === 'Admin' ? 'text-rose-500' : 'text-blue-500'} font-inter_Medium text-[12px]`}>{role}</Text>
              </View>
            </View>
            <Text className="text-white_60 font-inter_Regular text-sm">{lastMessage}</Text>
          </View>
        </View>
        <View className="flex flex-col items-center justify-center bg-white_87 w-6 h-6 rounded-full">
          <Text className="text-black font-inter_Regular text-xs">{noOfMsg}</Text>
        </View>
        {/* {A divider} */}
        <View className="h-px bg-white_38 w-full absolute bottom-0 left-2"></View>
      </Pressable>
    )
}

export default ChatInstance