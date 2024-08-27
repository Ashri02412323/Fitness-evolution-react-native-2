import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../../contexts/GlobalProvider'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';
import ProfileDefault from '../Profile/ProfileDefault';

const HomeHeader = () => {
  const {user,hasSignedUp} = useGlobalContext();
 
  return (
    <View className="flex flex-row items-center gap-2 justify-between h-20  px-0" style={{margin:0}}>
      <View className="flex flex-row items-center" style={{
        margin: 0,
      }}>
      <Pressable onPress={()=> router.push("/profile")} >
        <ProfileDefault sizeClass={"h-12 w-12"} textStyle={"text-2xl bottom-0"} parentStyle={"mb-0 mt-3 mr-0 ml-3"} />
      </Pressable>
        <View className="flex flex-col justify-center h-full ml-3" style={{margin:0}}>
          <Text className="text-white font-dm_Regular text-sm">{hasSignedUp?"Welcome":"Welcome Back"}</Text>
          <Text className="text-mint-87 font-pop_SemiBold  text-lg capitalize">{user?.fullName}</Text>
        </View>
      </View>
      <Pressable className="flex flex-row items-center justify-center p-4 gap-4 ml-auto" style={{margin: 0, gap: 10}} 
      onPress={()=>router.push("/UpdateProfile")}>
        <FontAwesome style={{margin:0}} name="edit" size={25} color="white" />
      </Pressable>
    </View>
  )
}

export default HomeHeader