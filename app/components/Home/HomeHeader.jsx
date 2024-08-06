import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../../contexts/GlobalProvider'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';

const HomeHeader = () => {
  const {user,firstLetter} = useGlobalContext();
 
  return (
    <View className="flex flex-row items-center gap-2 justify-between h-20  px-0" style={{margin:0}}>
      <View className="flex flex-row items-center gap-4" style={{
        margin: 0,
      }}>
        <Pressable onPress={()=> router.push("/profile")} className="bg-lava h-12 w-12 flex-row justify-center items-center rounded-full"
        style={{ margin: 0 }}
        >
          <Text className="text-white font-pop_Medium text-2xl mt-0">{firstLetter ?? 'A'}</Text>
        </Pressable>
        <View className="flex flex-col" style={{margin:0}}>
          <Text className="text-white font-dm_Regular text-sm">Welcome Back</Text>
          <Text className="text-mint-87 font-pop_SemiBold  text-lg capitalize">{user?.fullName}</Text>
        </View>
      </View>
      <Pressable className="flex flex-row items-center justify-center p-4 gap-4 ml-auto" style={{margin: 0, gap: 10}} 
      onPress={()=>console.log("Pressed")}>
        <FontAwesome style={{margin:0}} name="edit" size={25} color="white" />
      </Pressable>
    </View>
  )
}

export default HomeHeader