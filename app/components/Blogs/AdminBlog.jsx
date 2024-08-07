import { View, Text, ImageBackground, Pressable } from 'react-native'
import React from 'react'
import BlogsBg from '../../../assets/images/BlogsBg.png'
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';

const AdminBlog = () => {
  return (
    <View>
      <View className="flex flex-row items-center justify-between mb-6 mt-4">
        <Text className="text-white_87 text-xl font-inter_SemiBold">Your Blogs</Text>
      </View>
      <ImageBackground source={BlogsBg} className="w-full h-[200px] rounded-lg overflow-hidden">
        <View className="p-4 flex flex-col justify-between h-full">
            <View className="flex flex-row justify-between items-end">
                <View className="flex flex-col items-start w-[65%] ">
                    <View className="flex flex-row items-center mb-2">
                        <Text className="text-xl text-white_87 font-pop_SemiBold mr-2">Blogs Created</Text>
                        <MaterialIcons name="article" size={28} color="#DFE0E1" />
                    </View>
                    <Text className="text-base text-white_87 font-inter_Medium">These are the blogs created by you till now.</Text>
                </View>
                <Text className="text-[50px] font-cinzel_Bold text-white_87 w-[25%] text-center ">
                    14
                </Text>
            </View>
            <View className="w-full flex flex-row items-center justify-end ">
                <Pressable onPress={()=> router.push("/BlogDetails")}>
                    <View className="bg-white_87 self-end py-2 px-4 flex flex-row rounded-md items-center">
                        <Text className="text-mint-87 font-pop_SemiBold text-sm mr-2 ">See Your Blogs</Text>
                        <Entypo name="chevron-right" size={24} color="#01AFA8" />
                    </View>
                </Pressable>
            </View>
        </View>
      </ImageBackground>
    </View>
  )
}

export default AdminBlog